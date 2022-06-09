import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Friend from './friend.entity';

@Injectable()
export default class FriendService {
	constructor(
		@InjectRepository(Friend)
		public repository: Repository<Friend>,
	) {}

	async getAll(): Promise<Friend[]> {
		return await this.repository.find();
	}

	async getOneFriend(id: number): Promise<Friend> {
		return await this.repository.findOne({id});
	}

	async addFriend(avatar: Friend): Promise<Friend> {
		const newFriend = this.repository.create(avatar);
		await this.repository.save(newFriend);
		return newFriend;
	}
}
