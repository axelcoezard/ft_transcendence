import { Injectable } from '@nestjs/common';
import { PongGame } from './game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GameBuilder from './game.builder';

@Injectable()
export class PongGameService {
	constructor(
		@InjectRepository(PongGame)
		public pongGameRepository: Repository<PongGame>,
	) {}

	async getAll(): Promise<PongGame[]> {
		return await this.pongGameRepository.find();
	}

	async create(pongGame: GameBuilder): Promise<PongGame> {
		const newPongGame: PongGame = this.pongGameRepository.create(pongGame.build());
		await this.pongGameRepository.save(newPongGame);
		return newPongGame;
	}

	async update(pongGame: GameBuilder): Promise<PongGame> {
		const newPongGame = await this.pongGameRepository.preload({
			...pongGame.build()
		})
		return await this.pongGameRepository.save(newPongGame);
	}
}
