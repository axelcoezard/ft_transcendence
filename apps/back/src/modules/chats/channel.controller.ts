import {  Body, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
	Controller,
	Param,
	ParseIntPipe
  } from '@nestjs/common';
import	{ createHash } from 'crypto'
import ChannelService from './channel.service';
import Channel from './channel.entity';
import { getManager } from 'typeorm';
import ChannelBuilder from './channel.builder';
import { JwtAuthGuard } from '../auth/jwt.authguard';

@Controller('channels')
export default class ChannelController {
	@Inject(ChannelService)
	private readonly service: ChannelService;

	@UseGuards(JwtAuthGuard)
	@Get("/:slug")
	async getAllFromChannel(
		@Param('slug') slug: string
	){
		return await getManager().query(
			`SELECT
				m.id,
				m.sender_id,
				u.username as sender_username,
				c.id as channel_id,
				c.slug as channel_slug,
				m.type,
				m.value,
				m.created_at,
				m.updated_at
			FROM "message" as m
				INNER JOIN "channel" as c ON c.id = m.channel_id
				INNER JOIN "user" as u ON u.id = m.sender_id
			WHERE c.slug = $1
			ORDER BY m.created_at DESC;`,
			[slug]
		)
	}

	@UseGuards(JwtAuthGuard)
	@Post("/create")
	async createChannel(
		@Body() data: any
	){
		if (!data)			return { error: "No data provided" };
		if (!data.name)		return { error: "No name provided" };
		if (!data.users)	return { error: "No users provided" };
		if (!data.creator_id) return { error: "No creator provided" };
		if (data.name.length == 0)	return { error: "Veuillez entrer un nom de tchat" };
		if (data.name.length > 16) return { error: "Le nom de tchat est trop long" };
		if (!/^[a-zA-Z\s]+$/.test(data.name)) return { error: "Le nom de tchat doit contenir que des lettres et espaces." };
		if (data.users.length < 2) return { error: "Veuillez ajouter au moins 2 utilisateurs" };

		let builder = ChannelBuilder.new()
			.setName(data.name)
			.setCreator(data.creator_id);
		if (data.password)
			builder.setPassword(createHash('sha256')
				.update(data.password)
				.digest('hex'));

		let channel = await this.service.create(builder);
		if (!channel || !channel.id)
			return { error: "Error creating channel" };

		let res = await this.service.addUsers(channel.id, data.users);
		if (!res)
			return { error: "Error adding users to channel" };
		return channel;
	}

	@UseGuards(JwtAuthGuard)
	@Get("/:id/users")
	async getAllUsersFromChannel(
		@Param('id', ParseIntPipe) id: number
	){
		return await getManager().query(
			`SELECT
				u.id,
				u.username
			FROM "channel" as c
				INNER JOIN "user_in_channel" as uic ON uic.channel_id = c.id
				INNER JOIN "user" as u ON u.id = uic.user_id
			WHERE c.id = $1;`,
			[id]
		);
	};

	@UseGuards(JwtAuthGuard)
	@Post("/:id/users")
	async addUsersToChannel(
		@Param('id', ParseIntPipe) id: number,
		@Body() data: any
	){
		if (!data || !data.users)
			return { error: "No users provided" };
		return await this.service.addUsers(id, data.users);
	}
}

