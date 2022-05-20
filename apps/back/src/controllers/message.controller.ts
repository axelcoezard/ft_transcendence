import {  Get, Inject } from '@nestjs/common';
import {
	Controller,
	Param,
	ParseIntPipe
  } from '@nestjs/common';
import MessageService from '../services/message.service';
import Message from '../entities/message.entity';

@Controller('messages')
export default class MessageController {
	@Inject(MessageService)
	private readonly service: MessageService;

	@Get("/")
	async getAllMessages(): Promise<Message[]> {
		return await this.service.getMessages();
	}

	@Get("/channel/:slug")
	async getAllFromChannel(
		@Param('slug') id: number
	) {
		// TODO: Update a message by id
	}

	@Get('/:id')
	async getMessgage(
		@Param('id', ParseIntPipe) id: number
	) {
		// TODO: Update a message by id
	}
}

