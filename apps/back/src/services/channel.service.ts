import { Injectable } from '@nestjs/common';
import Channel from 'src/entities/channel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ChannelBuilder from 'src/builder/channel.builder';

@Injectable()
export default class ChannelService {
	constructor(
		@InjectRepository(Channel)
		public channelRepository: Repository<Channel>
	) {}

	async getAll(): Promise<Channel[]> {
		return await this.channelRepository.find();
	}

	async getById(id: number): Promise<Channel> {
		return await this.channelRepository.findOne({
			where: {id}
		})
	}

	async getBySlug(slug: string): Promise<Channel> {
		return await this.channelRepository.findOne({
			where: {slug}
		})
	}

	async create(channel: ChannelBuilder): Promise<Channel> {
		const newChannel = this.channelRepository.create(channel.build());
		await this.channelRepository.save(newChannel);
		return newChannel;
	}
}

