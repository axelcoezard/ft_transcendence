import {Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from './user.entity';

@Injectable()
export default class UserService {
	constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
	) {}

	async getUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async addUser(user: User): Promise<User> {
		const newUser = this.userRepository.create(user);
		await this.userRepository.save(newUser);
		return newUser;
	}

	async updateUser(id: number, user: any): Promise<User> {
		const newUser = await this.userRepository.preload({
			id,
			...user
		})
		return await this.userRepository.save(newUser);
	}
}
