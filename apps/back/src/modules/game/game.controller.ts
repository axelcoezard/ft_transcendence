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

	/*@UseGuards(JwtAuthGuard)
	@Post('/create')
	async create(
		@Body() body: any
	): Promise<any> {
		if (!body.creator_id)
			return { error: "creator_id is required" };
		// Generation d'une partie a moitié vide
		let game = GameBuilder.new()
			.setPlayer1(body.creator_id);
		let resGame = await this.service.create(game);
		if (!resGame) return { error: "Game not created" };
		// Generation d'une invitation avec le slug de la partie
		let invitation = InvitationBuilder.new()
			.setGame(resGame)
			.setCreator(body.creator_id);
		let resInvitation = await this.service.invitations.create(invitation);
		if (!resInvitation) return { error: "Invitation not created" };
		return {
			game: resGame,
			invitation: resInvitation
		};
	}*/
}

