import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Blocked from './blocked.entity';

@Injectable()
export default class BlockedService {
	constructor(
		@InjectRepository(Blocked)
		public repository: Repository<Blocked>,
	) {}

	async getAll(): Promise<Blocked[]> {
		return await this.repository.find();
	}

	async getOneBlocked(id: number): Promise<Blocked> {
		return await this.repository.findOne({id});
	}

	async addBlocked(avatar: Blocked): Promise<Blocked> {
		const newBlocked = this.repository.create(avatar);
		await this.repository.save(newBlocked);
		return newBlocked;
	}
}
