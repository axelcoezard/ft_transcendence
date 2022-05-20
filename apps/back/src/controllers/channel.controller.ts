import {  Get, Inject } from '@nestjs/common';
import {
	Controller,
	Param,
	ParseIntPipe
  } from '@nestjs/common';
import ChannelService from '../services/channel.service';
import Channel from '../entities/channel.entity';

@Controller('channels')
export default class ChannelController {
	@Inject(ChannelService)
	private readonly service: ChannelService;

	@Get("/")
	async getAllChannels(): Promise<Channel[]> {
		return await this.service.getAll();
	}

	@Get('/id/:id')
	async getById(
		@Param('id', ParseIntPipe) id: number
	) {
		return await this.service.getById(id);
	}

	@Get('/slug/:slug')
	async getBySlug(
		@Param('slug') slug: string
	) {
		return await this.service.getBySlug(slug);
	}
}

