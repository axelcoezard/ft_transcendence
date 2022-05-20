import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Avatar } from 'src/entities/avatar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AvatarService {
	constructor(
		@InjectRepository(Avatar)
		public avatarRepository: Repository<Avatar>,
	) {}

	async getAvatars(): Promise<Avatar[]> {
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
