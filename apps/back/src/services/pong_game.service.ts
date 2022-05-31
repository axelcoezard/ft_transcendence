import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PongGame } from 'src/entities/pong_game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GameBuilder from 'src/builder/game.builder';

@Injectable()
export class PongGameService {
	constructor(
		@InjectRepository(PongGame)
		public pongGameRepository: Repository<PongGame>,
	) {}

	async getAll(): Promise<PongGame[]> {
		return await this.pongGameRepository.find();
	}

	async getOnePongGame(id: number): Promise<PongGame> {
		return await this.pongGameRepository.findOne({id});
	}

	async create(pongGame: GameBuilder): Promise<PongGame> {
		const newPongGame: PongGame = this.pongGameRepository.create(pongGame.build());
		//await this.pongGameRepository.save(newPongGame);
		newPongGame.id = (await this.pongGameRepository.query(
			"INSERT INTO pong_game (slug, status) VALUES ($1, $2) ON CONFLICT DO NOTHING",
			[newPongGame.slug, newPongGame.status]
		)).id;
		return newPongGame;
	}

	async updatePongGame(id: number, pongGame: any): Promise<PongGame> {
		const newPongGame = await this.pongGameRepository.preload({
			id,
			...pongGame
		})
		return await this.pongGameRepository.save(newPongGame);
	}
}
