import { Injectable } from '@nestjs/common';
import { PongGame } from './game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GameBuilder from './game.builder';

@Injectable()
export class PongGameService {
	constructor(
		@InjectRepository(PongGame)
		public repository: Repository<PongGame>,
	) {}

	async getAll(): Promise<PongGame[]>
	{
		return await this.repository.find();
	}

	async create(builder: GameBuilder): Promise<PongGame>
	{
		const res = this.repository.create(builder.build());
		await this.repository.save(res);
		return res;
	}

	async update(builder: GameBuilder): Promise<PongGame>
	{
		const res = await this.repository.preload({
			...builder.build()
		})
		return await this.repository.save(res);
	}
}
