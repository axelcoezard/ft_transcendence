import {  Body, Delete, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
	Controller,
	Param,
	ParseIntPipe
  } from '@nestjs/common';
import	{ createHash } from 'crypto'
import ChannelService from './channel.service';
import Channel from './channel.entity';
import { getManager, getMongoManager } from 'typeorm';
import ChannelBuilder from './channel.builder';
import { JwtAuthGuard } from '../auth/jwt.authguard';

@Controller('channels')
export default class ChannelController {
	@Inject(ChannelService)
	private readonly service: ChannelService;

	@UseGuards(JwtAuthGuard)
	@Get('/:slug')
	async getChannel(
		@Param('slug') slug: string
	){
		return await this.service.getBySlug(slug);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:slug')
	async deleteChannel(
		@Param('slug') slug: string,
		@Body() data: any
	){
		if (!data)			return { error: "No data provided" };
		if (!data.id)		return { error: "No user id provided" };
		return await this.service.deleteBySlug(slug, data.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get("/:slug/messages")
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
		if (!data.status)	return { error: "No visibility provided" };
		if (data.name.length == 0)	return { error: "Veuillez entrer un nom de tchat" };
		if (data.name.length > 16) return { error: "Le nom de tchat est trop long" };
		if (!/^[a-zA-Z\s]+$/.test(data.name))
			return { error: "Le nom de tchat doit contenir que des lettres et espaces." };
		if (data.status !== "public" && data.status !== "private")
			return { error: "Veuillez entrer une visibilite valide" };
		if (data.status === 'private' && data.users.length < 2)
			return { error: "Veuillez ajouter au moins 2 utilisateurs" };

		if (data.receiver_id != 0)
		{
			let res = await this.service.channelRepository.findOne({
				where: {
					creator_id: data.creator_id,
					receiver_id: data.receiver_id
				}
			})
			if (res) return res;
		}

		let builder = ChannelBuilder.new()
			.setName(data.name)
			.setStatus(data.status)
			.setCreator(data.creator_id);
		if (data.password)
			builder.setPassword(createHash('sha256')
				.update(data.password)
				.digest('hex'));
		if (data.receiver_id)
			builder.setReceiver(data.receiver_id);

		let channel = await this.service.create(builder);
		if (!channel || !channel.id)
			return { error: "Error creating channel" };

		let res = await this.service.addUsers(channel.id, data.users);
		if (!res)
			return { error: "Error adding users to channel" };
		return channel;
	}

	@UseGuards(JwtAuthGuard)
	@Post("/:slug/update")
	async updateChannel(
		@Param('slug') slug: string,
		@Body() data: any
	){
		if (!data)			return { error: "No data provided" };
		if (!data.name)		return { error: "No name provided" };
		if (!data.users)	return { error: "No users provided" };
		if (!data.status)	return { error: "No visibility provided" };
		if (data.name.length == 0)	return { error: "Veuillez entrer un nom de tchat" };
		if (data.name.length > 16) return { error: "Le nom de tchat est trop long" };
		if (!/^[a-zA-Z\s]+$/.test(data.name)) return { error: "Le nom de tchat doit contenir que des lettres et espaces." };
		if (data.status !== "public" && data.status !== "private")
			return { error: "Veuillez entrer une visibilite valide" };
		if (data.status === 'private' && data.users.length < 1) return { error: "Veuillez garder au moins 1 utilisateurs" };
		let password = data.password ? createHash('sha256').update(data.password).digest('hex') : null;
		let channel = await getManager().query(
			`UPDATE "channel"
			SET name = $1,
				status = $2,
				password = $3,
				updated_at = NOW()
			WHERE slug = $4 RETURNING *;`,
			[data.name, data.status, password, slug]
		);
		if (!channel || !channel.length)
			return { error: "Error creating channel" };
		let channel_id = channel[0][0].id;
		let currentUsers = await this.service.getUsersFromChannel(slug);
		let usersNew = data.users.filter(user => !currentUsers.find(u => u.id == user.id))
		let usersDrop = currentUsers.filter(user => !data.users.find(u => u.id == user.id))
		if (usersNew.length > 0)
		{
			let res = await this.service.addUsers(channel_id, usersNew);
			if (!res)
				return { error: "Error adding users to channel" };
		}
		if (usersDrop.length > 0)
		{
			let res = await this.service.removeUser(channel_id, usersDrop);
			if (!res)
				return { error: "Error removing users from channel" };
		}
		return channel;
	}

	@UseGuards(JwtAuthGuard)
	@Get("/:slug/users")
	async getAllUsersFromChannel(
		@Param('slug') slug: string
	){
		return await getManager().query(
			`SELECT
				u.id,
				u.username,
				uic.rank as rank,
				uic.status as status,
				uic.created_at as created_at,
				uic.updated_at as updated_at
			FROM "channel" as c
				INNER JOIN "user_in_channel" as uic ON uic.channel_id = c.id
				INNER JOIN "user" as u ON u.id = uic.user_id
			WHERE c.slug = $1;`,
			[slug]
		);
	};

	@UseGuards(JwtAuthGuard)
	@Get("/:slug/users/:user_id/rank")
	async getUserRankBySlug(
		@Param('slug') slug: string,
		@Param('user_id', ParseIntPipe) user_id: number
	){
		if (!slug)
			return { error: "No channel id provided" };
		if (!user_id)
			return { error: "No user id provided" };
		return await getManager().query(
			`SELECT
				uic.rank
			FROM "channel" as c
				INNER JOIN "user_in_channel" as uic ON uic.channel_id = c.id
			WHERE c.id = (SELECT id FROM "channel" WHERE slug = $1) AND uic.user_id = $2;`,
			[slug, user_id]
		);
	}

	@UseGuards(JwtAuthGuard)
	@Post("/:slug/users/:user_id/rank")
	async setUserRank(
		@Param('slug') slug: string,
		@Param('user_id', ParseIntPipe) user_id: number,
		@Body() data: any
	){
		if (!slug)
			return { error: "No channel slug provided" };
		if (!user_id)
			return { error: "No user id provided" };
		if (!data)
			return { error: "No data provided" };
		if (!data.rank)
			return { error: "No rank provided" };
		if (data.rank !== "owner" && data.rank !== "admin" && data.rank !== "member")
			return { error: "Invalid rank" };
		return await getManager().query(
			`UPDATE "user_in_channel"
			SET rank = $1, updated_at = NOW()
			WHERE channel_id = (SELECT id FROM "channel" WHERE slug = $2) AND user_id = $3;`,
			[data.rank, slug, user_id]
		);
	}

	@UseGuards(JwtAuthGuard)
	@Post("/:slug/users/:user_id/status")
	async updateStatus(
		@Param('slug') slug: string,
		@Param('user_id', ParseIntPipe) user_id: number,
		@Body() data: any
	){
		if (!slug)			return { error: "No channel slug provided" };
		if (!user_id)		return { error: "No user id provided" };
		if (!data)			return { error: "No data provided" };
		if (data.status !== "banned" && data.status !== "mute" && data.status !== "active")
			return { error: "Invalid status" };
		console.log("query")
		return await getManager().query(
			`UPDATE "user_in_channel"
			SET status = $3, updated_at = NOW()
			WHERE channel_id = (SELECT id FROM "channel" WHERE slug = $1) AND user_id = $2;`,
			[slug, user_id, data.status]
		);
	}

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

	@UseGuards(JwtAuthGuard)
	@Post("/:slug/join")
	async joinChannel(
		@Param('slug') slug: string,
		@Body() data: any
	){
		if (!data)			return { error: "No data provided" };
		if (!data.user_id)	return { error: "No user id provided" };
		if (!data.password)	return { error: "No password provided" };

		let digest = createHash('sha256').update(data.password).digest('hex');
		let channel = await this.service.getBySlug(slug);
		if (!channel)		return { error: "Channel not found" };
		if (channel.password !== digest)	return { error: "Invalid password" };
		return channel;
	}

	@UseGuards(JwtAuthGuard)
	@Delete("/:slug/leave")
	async leaveChannel(
		@Param('slug') slug: string,
		@Body() data: any
	){
		if (!slug)		return { error: "No channel slug provided" };
		if (!data)		return { error: "No data provided" };
		if (!data.id)	return { error: "No user id provided" };

		let res = await getManager().query(
			`DELETE FROM "user_in_channel"
			WHERE user_id = $1 AND channel_id = (SELECT id FROM "channel" WHERE slug = $2);`,
			[data.id, slug]
		)
		if (!res) return { error: "Error leaving channel" };
		return res;
	}

}

