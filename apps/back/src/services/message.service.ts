import { Injectable } from '@nestjs/common';
import Message from 'src/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import MessageBuilder from '../builder/message.builder';

@Injectable()
export default class MessageService {
	constructor(
		@InjectRepository(Message)
		public messageRepository: Repository<Message>,
	) {}

	async getMessages(): Promise<Message[]> {
		return await this.messageRepository.find();
	}

	async addMessage(message: MessageBuilder): Promise<Message> {
		const newMessage = this.messageRepository.create(message.build());
		await this.messageRepository.save(newMessage);
		return newMessage;
	}
}
