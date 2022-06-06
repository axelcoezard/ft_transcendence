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

	async getUser(id: number): Promise<User> {
		return await this.userRepository.findOne({id});
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

	async updateUsername(id: number, username: string): Promise<any> {
		if (!username)
			return {error: "Veuillez entrer un pseudo"}
		if (username.length < 5)
			return {error: "Le pseudo doit contenir au moins 5 caractères"}
		if (!/^[a-zA-Z]+$/.test(username))
			return {error: "Le pseudo ne peut contenir que des lettres"}

		return await this.userRepository.query(
			`UPDATE "user" SET "username" = $1 WHERE id = $2;`,
			[username, id]
		);
	}

	async getElo(id: number): Promise<User> {
		return await this.userRepository.query(
			`SELECT "ELO_score" FROM "user" WHERE id = $1;`,
			[id]
		);
	}

	async updateElo(id: number, elo: number): Promise<User> {
		return await this.userRepository.query(
			`UPDATE "user" SET "ELO_score" = $1 WHERE id = $2;`,
			[elo, id]
		);
	}
}
