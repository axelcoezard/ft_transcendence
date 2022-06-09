import {  Get, Header, Inject, Param, ParseIntPipe, Res, StreamableFile } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import FriendService from './friend.service';
import { getManager } from 'typeorm';

@Controller('friends')
export default class FriendController
{
	@Inject(FriendService)
	private readonly service: FriendService;
}
