import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { Reflector } from '@nestjs/core';
import {  Get } from '@nestjs/common';
import {
	Body, CacheInterceptor, CacheKey, CacheTTL,
	Controller,
	Delete,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards, UseInterceptors,
  } from '@nestjs/common'; 
import { AddUserDto } from './dto/Add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private reflector: Reflector
  ) {}

  @Get()
  async getAllUrs(): Promise<UserEntity[]> {
    return await this.userService.getUrs();
  }

  @Post()
  async addUser(
    @Body() addUserDto: AddUserDto,
  ): Promise<UserEntity> {
	console.log(addUserDto);
	return await this.userService.addUrs(addUserDto);
  }


  @Patch(':id')
  async updateUser(
	@Body() UpdateUserDto: UpdateUserDto,
	@Param('id', ParseIntPipe) id: number
  ): Promise<UserEntity> {
	  return await this.userService.updateUser(id, UpdateUserDto);
  }

}

