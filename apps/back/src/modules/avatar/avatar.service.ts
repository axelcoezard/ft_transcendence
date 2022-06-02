import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Avatar from './avatar.entity';

@Injectable()
export default class AvatarService {
	constructor(
		@InjectRepository(Avatar)
		public avatarRepository: Repository<Avatar>,
	) {}

	async getAll(): Promise<Avatar[]> {
		return await this.avatarRepository.find();
	}

	async getOneAvatar(id: number): Promise<Avatar> {
		return await this.avatarRepository.findOne({id});
	}

	async addAvatar(avatar: Avatar): Promise<Avatar> {
		const newAvatar = this.avatarRepository.create(avatar);
		await this.avatarRepository.save(newAvatar);
		return newAvatar;
	}

	async updateAvatar(id: number, avatar: any): Promise<Avatar> {
		const newAvatar = await this.avatarRepository.preload({
			id,
			...avatar
		})
		return await this.avatarRepository.save(newAvatar);
	}
}
