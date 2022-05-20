import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PongGame } from 'src/entities/pong_game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PongGameService {
	constructor(
		@InjectRepository(PongGame)
		public pongGameRepository: Repository<PongGame>,
	) {}

	async getPongGames(): Promise<PongGame[]> {
		return await this.pongGameRepository.find();
	}

	async getOnePongGame(id: number): Promise<PongGame> {
		return await this.pongGameRepository.findOne({id});
	}

	async addPongGame(pongGame: PongGame): Promise<PongGame> {
		const newPongGame = this.pongGameRepository.create(pongGame);
		await this.pongGameRepository.save(newPongGame);
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
