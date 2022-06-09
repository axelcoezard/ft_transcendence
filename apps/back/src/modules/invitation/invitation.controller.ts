import { Get, Inject, Controller, Param, Res, Header, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.authguard';
import InvitationBuilder from '../invitation/invitation.builder';
import GameBuilder from '../game/game.builder';

import Game from '../game/game.entity';
import GameService from '../game/game.service';
import InvitationService from './invitation.service';

@Controller('invitations')
export default class InvitationController {

	@Inject(InvitationService)
	private readonly service: InvitationService;

	@UseGuards(JwtAuthGuard)
	@Post('/create')
	async create(
		@Body() body: any
	): Promise<any> {
		if (!body.creator_id)
			return { error: "creator_id is required" };
		//if (!body.opponent_id)
		//	return { error: "opponent_id is required" };
		// Generation d'une partie a moitié vide
		let game = GameBuilder.new()
			.setPlayer1(body.creator_id)
		//	.setPlayer2(body.opponent_id);
		let resGame = await this.service.games.create(game);
		if (!resGame) return { error: "Game not created" };
		// Generation d'une invitation avec le slug de la partie
		let invitation = InvitationBuilder.new()
			.setGame(resGame)
			.setCreator(body.creator_id);
		let resInvitation = await this.service.create(invitation);
		if (!resInvitation) return { error: "Invitation not created" };
		return {
			game: resGame,
			invitation: resInvitation
		};
	}
}

