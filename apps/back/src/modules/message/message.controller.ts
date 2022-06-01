import {  Get, Inject } from '@nestjs/common';
import {
	Controller,
	Param,
	ParseIntPipe
  } from '@nestjs/common';
import MessageService from './message.service';
import Message from './message.entity';

@Controller('messages')
export default class MessageController {
	@Inject(MessageService)
	private readonly service: MessageService;

	@Get("/")
	async getAllMessages(): Promise<Message[]> {
		return await this.service.getMessages();
	}
}

