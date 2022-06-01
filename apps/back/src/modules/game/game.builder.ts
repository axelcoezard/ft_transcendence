import Channel from "../channel/channel.entity";
import { PongGame } from "./game.entity";

export default class GameBuilder {

	private game: PongGame;

	constructor()
	{
		this.game = new PongGame();
		this.game.status = "waiting";
		this.game.slug = Math
			.random()
			.toString(16)
			.substring(2,16);
	}

	public setLeftPlayer(user_id: number) : GameBuilder
	{
		this.game.user1_id = user_id;
		return this;
	}

	public setRightPlayer(user_id: number) : GameBuilder
	{
		this.game.user2_id = user_id;
		return this;
	}

	public setSlug(slug: string)
	{
		this.game.slug = slug;
		return this;
	}

	public build() : PongGame
	{
		return this.game;
	}

	public static new()
	{
		return new GameBuilder();
	}
}
