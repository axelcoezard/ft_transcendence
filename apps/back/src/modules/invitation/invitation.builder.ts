import Player from "src/rooms/Player";
import Game from "../game/game.entity";
import Invitation from "./invitation.entity";

export default class InvitationBuilder {

	private invitation: Invitation

	constructor()
	{
		this.invitation = new Invitation();
		this.invitation.slug = Math.random()
			.toString(16)
			.substring(2,16);
	}


	public setCreator(id: number): InvitationBuilder
	{
		this.invitation.creator_id = id;
		return this;
	}

	public setGame(game: Game): InvitationBuilder
	{
		this.invitation.game_id = game.id;
		this.invitation.game_slug = game.slug;
		return this;
	}

	public setSlug(slug: string): InvitationBuilder
	{
		this.invitation.slug = slug;
		return this;
	}

	public build() : Invitation
	{
		return this.invitation;
	}

	public static new()
	{
		return new InvitationBuilder();
	}
}
