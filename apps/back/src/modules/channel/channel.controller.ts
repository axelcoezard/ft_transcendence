import {  Get, Inject, Post } from '@nestjs/common';
import {
	Controller,
	Param,
	ParseIntPipe
  } from '@nestjs/common';
import ChannelService from './channel.service';
import Channel from './channel.entity';
import { getManager } from 'typeorm';

@Controller('channels')
export default class ChannelController {
	@Inject(ChannelService)
	private readonly service: ChannelService;

	@Get("/")
	async getAllChannels(): Promise<Channel[]> {
		return await this.service.getAll();
	}

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

}
