import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Message } from 'src/entities/Message';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { UpdateUserDto } from './dto/update.user.dto';

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

	/*async updateUser(id: number, user: UpdateUserDto): Promise<User> {
		const newUser = await this.userRepository.preload({
			id,
			...user
		})
		return await this.userRepository.save(newUser);
	}*/
}