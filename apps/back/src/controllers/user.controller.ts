import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { Reflector } from '@nestjs/core';
import {  Get, Inject } from '@nestjs/common';
import {
	Body,
	Controller,
	Delete,
	Param,
	ParseIntPipe,
	Patch,
  } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update.user.dto';

@Controller('users')
export class UserController {
	@Inject(UserService)
	private readonly service: UserService;

	@Get("/")
	async getAllUrs(): Promise<User[]> {
		return await this.service.getUsers();
	}

	@Patch('/:id')
	async updateUser(
		@Body() UpdateUserDto: UpdateUserDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<User> {
		return await this.service.updateUser(id, UpdateUserDto);
	}
}

