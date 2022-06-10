import Player from "src/rooms/Player";
import Channel from "../chats/channel.entity";
import Game from "./game.entity";

export default class GameBuilder {

	private game: Game;

	public static GAME_WAITING: string = "waiting";
	public static GAME_STARTING: string = "starting";
	public static GAME_STARTED: string = "started";
	public static GAME_ENDED: string = "ended";

	constructor()
	{
		this.game = new Game();
		this.game.status = GameBuilder.GAME_WAITING;
		this.game.slug = Math
			.random()
			.toString(16)
			.substring(2,16);
	}

	public setId(id: number): GameBuilder
	{
		this.game.id = id;
		return this;
	}

	public setPlayer1(id: number): GameBuilder
	{
		this.game.user1_id = id;
		return this;
	}

	public setPlayer2(id: number): GameBuilder
	{
		this.game.user2_id = id;
		return this;
	}

	public setPlayers(user1: Player, user2: Player) : GameBuilder
	{
		this.game.user1_id = user1.id;
		this.game.user2_id = user2.id;
		return this;
	}

	public setScores(left: number, right: number) : GameBuilder
	{
		this.game.user1_score = left;
		this.game.user2_score = right;
		return this;
	}

	public setSlug(slug: string): GameBuilder
	{
		this.game.slug = slug;
		return this;
	}

	public setStatus(status: string): GameBuilder
	{
		this.game.status = status;
		return this;
	}

	public build() : Game
	{
		return this.game;
	}

	public static new()
	{
		return new GameBuilder();
	}
}
