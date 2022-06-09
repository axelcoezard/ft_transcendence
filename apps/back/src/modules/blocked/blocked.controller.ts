import {  Get, Header, Inject, Param, ParseIntPipe, Res, StreamableFile } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import BlockedService from './blocked.service';
import { getManager } from 'typeorm';

@Controller('blockeds')
export default class BlockedController
{
	@Inject(BlockedService)
	private readonly service: BlockedService;
}
