import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Message } from 'src/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Message)
		public messageRepository: Repository<Message>,
	) {}

	async getMessages(): Promise<Message[]> {
		return await this.messageRepository.find();
	}

	async addMessage(message: Message): Promise<Message> {
		const newMessage = this.messageRepository.create(message);
		await this.messageRepository.save(newMessage);
		return newMessage;
	}
}
