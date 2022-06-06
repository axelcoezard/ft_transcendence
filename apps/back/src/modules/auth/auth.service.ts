import { Module, Controller, Get, Injectable, Param, Inject, UseInterceptors, Body, Post } from '@nestjs/common';
import 'dotenv/config'
import User from '../user/user.entity';
import UserService from '../user/user.service';
import Avatar from '../avatar/avatar.entity';
import AvatarService from '../avatar/avatar.service';

@Injectable()
export default class AuthService
{
	@Inject(UserService)
	public readonly users: UserService;

	@Inject(AvatarService)
	public readonly avatars: AvatarService;

	getUniqueID(): string { return process.env.API_UID; }
	getSecret(): string { return process.env.API_SECRET; }
	getRedirectURI(): string { return process.env.API_REDIRECT_URI; }

	async getUserBy42Username(username: string): Promise<User>
	{
		return await this.users.userRepository.findOne({
			where: {"42_username": username}
		})
	}

	async getUserByUsername(username: string): Promise<User>
	{
		return await this.users.userRepository.findOne({
			where: {"username": username}
		})
	}

	async addUser(user: User)
	{
		return await this.users.userRepository.save(user);
	}

	async getAvatar(id: number): Promise<Avatar>
	{
		return await this.avatars.avatarRepository.findOne({
			where: {id}
		})
	}

	async addAvatar(avatar: Avatar)
	{
		return await this.avatars.avatarRepository.save(avatar);
	}
}
