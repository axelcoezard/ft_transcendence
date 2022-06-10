import { Get, Inject, Controller, Param, Res, Header, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.authguard';
import InvitationBuilder from '../invitation/invitation.builder';
import GameBuilder from './game.builder';

import Game from './game.entity';
import GameService from './game.service';

@Controller('games')
export default class GameController {

	@Inject(GameService)
	private readonly service: GameService;

	@UseGuards(JwtAuthGuard)
	@Get('/:status')
	async getByStatus(
		@Param('status') status: string
	): Promise<Game> {
		const req = `SELECT * FROM "game" as g WHERE g.status = $1;`
		return await this.service.repository.query(req, [status])
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:slug/status')
	async getStatus(
		@Param('slug') slug: string
	): Promise<Game> {
		const req = `SELECT status FROM "game" as g WHERE g.slug = $1;`
		return (await this.service.repository.query(req, [slug]))[0]
	}
}

