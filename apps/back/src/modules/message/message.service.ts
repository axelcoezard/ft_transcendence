import { Injectable } from '@nestjs/common';
import Message from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import MessageBuilder from './message.builder';

@Injectable()
export default class MessageService {
	constructor(
		@InjectRepository(Message)
		public messageRepository: Repository<Message>,
	) {}

	async getMessages(): Promise<Message[]> {
		return await this.messageRepository.find();
	}

	async getByChannel(slug: string): Promise<any[]> {
		return await getManager().query(
			`SELECT
				m.id,
				m.sender_id,
				u.username as sender_username,
				c.id as channel_id,
				c.slug as channel_slug,
				m.type,
				m.value,
				m.created_at,
				m.updated_at
			FROM "message" as m
				INNER JOIN "channel" as c ON c.id = m.channel_id
				INNER JOIN "user" as u ON u.id = m.sender_id
			WHERE c.slug = $1
			ORDER BY m.created_at DESC;`,
			[slug]
		)
	}

	async addMessage(message: MessageBuilder): Promise<Message> {
		const newMessage = this.messageRepository.create(message.build());
		await this.messageRepository.save(newMessage);
		return newMessage;
	}
}
