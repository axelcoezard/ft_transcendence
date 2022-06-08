import { Inject } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import MessageService from './message.service';

@Controller('messages')
export default class MessageController {
	@Inject(MessageService)
	private readonly service: MessageService;
}

