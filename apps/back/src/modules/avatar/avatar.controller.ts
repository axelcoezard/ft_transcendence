import {  Get, Inject } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import AvatarService from './avatar.service';
import Avatar from './avatar.entity';

@Controller('avatars')
export default class AvatarController
{
	@Inject(AvatarService)
	private readonly service: AvatarService;
}
