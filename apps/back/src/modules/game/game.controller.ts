import { Get, Inject, Controller, Param, Res, Header } from '@nestjs/common';

import Game from './game.entity';
import GameService from './game.service';

@Controller('games')
export default class GameController {

	@Inject(GameService)
	private readonly service: GameService;

	@Get('/:status')
	async getByStatus(
		@Param('status') status: string
	): Promise<Game> {
		const req = `SELECT * FROM "game" as g WHERE g.status = $1;`
		return await this.service.repository.query(req, [status])
	}
}

