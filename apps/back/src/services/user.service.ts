import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../user/dto/update.user.dto';

@Injectable()
export class UserService {
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

	async updateUser(id: number, user: UpdateUserDto): Promise<User> {
		const newUser = await this.userRepository.preload({
			id,
			...user
		})
		return await this.userRepository.save(newUser);
	}
}
