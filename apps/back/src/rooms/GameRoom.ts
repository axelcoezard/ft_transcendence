import GameBuilder from "src/modules/game/game.builder";
import Player from "./Player";
import Room from "./Room";

export const PONG_HEIGHT: number = 400;
export const PONG_WIDTH: number = 600;
export const BALL_DIAMETER = 20;
export const BALL_SPEED = 5;
export const PADDLE_HEIGHT = 100;
export const PADDLE_WIDTH = 20;

class Vector {
	x: number = 0;
	y: number = 0;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export default class GameRoom extends Room {
	ball_pos: Vector;
	ball_d: Vector;
	ball_speed: number = BALL_SPEED;

	leftPaddle: Vector
	rightPaddle: Vector;

	leftPlayer: Player = null;
	rightPlayer: Player = null;
	leftPlayerJoined: boolean = false
	rightPlayerJoined: boolean = false

	constructor(id: number, slug: string) {
		super(id, slug)

		this.leftPaddle = new Vector(20, 50);
		this.rightPaddle = new Vector(PONG_WIDTH - PADDLE_WIDTH - 20, 50);
	}

	public onCreate() {
		this.onMessage("paddleMove", (player: Player, data: any) => {
			if(data.id === this.leftPlayer.id)
				this.leftPaddle = new Vector(data.x, data.y);
			else if(data.id === this.rightPlayer.id)
				this.rightPaddle = new Vector(data.x, data.y);
			this.users.forEach(p => {
				if (p.id !== data.id)
					p.emit("game.updatePaddle", data)
			})
		})
	}

	public onJoin(player: Player, data: any) {
		let position = "spectator";
		if (this.leftPlayer.id == player.id)
			this.leftPlayerJoined = true, position = "left";
		else if (this.rightPlayer.id == player.id)
			this.rightPlayerJoined = true, position = "right";
		player.position = position;
		player.score = 0;
		player.emit("game.join", {position})

		this.users.push(player);
		console.log(`player ${player.username} joined ${this.id} as ${player.position}`)

		if (this.leftPlayerJoined && this.rightPlayerJoined)
			this.start();
	}

	private resetBall() {
		this.ball_pos = new Vector(
			Math.floor((PONG_WIDTH - BALL_DIAMETER) / 2),
			Math.floor((PONG_HEIGHT - BALL_DIAMETER) / 2)
		);
		this.ball_d = new Vector(
			Math.round(Math.random()) * 2 - 1,
			Math.round(Math.random()) * 2 - 1
		);
		this.ball_speed = BALL_SPEED;
	}

	private async update(updates: number) {
		if ((this.ball_d.x === -1 && this.ball_pos.x <= 0)
			||(this.ball_d.x === 1 && this.ball_pos.x >= PONG_WIDTH - BALL_DIAMETER))
			this.ball_d.x = -this.ball_d.x;

		if ((this.ball_d.y === -1 && this.ball_pos.y <= 0)
			|| (this.ball_d.y === 1 && this.ball_pos.y >= PONG_HEIGHT - BALL_DIAMETER))
			this.ball_d.y = -this.ball_d.y;

		let collision = false;
		if (this.ball_d.x === -1
			&& this.ball_pos.x <= this.leftPaddle.x + PADDLE_WIDTH
			&& this.ball_pos.y + BALL_DIAMETER > this.leftPaddle.y
			&& this.ball_pos.y <= this.leftPaddle.y + PADDLE_HEIGHT)
			collision = true;
		if (this.ball_d.x === 1
			&& this.ball_pos.x + BALL_DIAMETER >= this.rightPaddle.x
			&& this.ball_pos.y + BALL_DIAMETER >= this.rightPaddle.y
			&& this.ball_pos.y <= this.rightPaddle.y + PADDLE_HEIGHT)
			collision = true;

		if (collision)
		{
			this.ball_speed *= 1.1;
			this.ball_d.x = -this.ball_d.x;
		}

		let point = false;
		if (this.ball_pos.x <= 0)
			this.rightPlayer.score++, point = true;
		else if (this.ball_pos.x >= PONG_WIDTH - BALL_DIAMETER)
			this.leftPlayer.score++, point = true;
		if (point)
			this.users.forEach(player => player.emit("game.updateScore",
				this.getGamePlayersStatus()
			))

		if (this.leftPlayer.score >= 10 || this.rightPlayer.score >= 10)
			this.stop();

		if (this.ball_pos.x <= 0 || this.ball_pos.x >= PONG_WIDTH - BALL_DIAMETER)
			this.resetBall();

		this.ball_pos.x += this.ball_d.x * this.ball_speed;
		this.ball_pos.y += this.ball_d.y * this.ball_speed;

		this.users.forEach(player => player.emit("game.updateBall", {
			id: this.id,
			x: this.ball_pos.x,
			y: this.ball_pos.y
		}))

		if (this.state !== 0)
			setTimeout(() => this.update(updates + 1), 1000 / 50)
	}

	private start() {
		if (this.state !== 0)
			return;
		this.state = 1;
		this.resetBall();

		this.service.games.update(
			GameBuilder.new()
			.setId(this.id)
			.setSlug(this.slug)
			.setPlayers(this.leftPlayer, this.rightPlayer)
			.setStatus(GameBuilder.GAME_STARTED)
		)

		setTimeout(() => {
			this.users.forEach(player => player.emit("game.start",
				this.getGamePlayersStatus()
			))
			this.update(0);
			console.log(`${this.id} started`)
		}, 1000);
	}

	private stop() {
		this.state = 0;

		let winner = null;
		let loser = null;
		if (this.leftPlayer.score >= this.rightPlayer.score)
			winner = this.leftPlayer, loser = this.rightPlayer;
		else
			winner = this.rightPlayer, loser = this.leftPlayer;

		this.users.forEach(player => player.emit("game.stop", {
			id: this.id,
			winner: winner.toObject(),
			loser: loser.toObject()
		}))

		this.service.games.update(
			GameBuilder.new()
			.setId(this.id)
			.setSlug(this.slug)
			.setPlayers(this.leftPlayer, this.rightPlayer)
			.setScores(this.leftPlayer.score, this.rightPlayer.score)
			.setStatus(GameBuilder.GAME_ENDED)
		)

		console.log(`${this.id} stopped`)
	}

	public onLeave(player: Player) {
		if (player.id === this.leftPlayer.id)
			this.leftPlayerJoined = false;
		else if (player.id === this.rightPlayer.id)
			this.rightPlayerJoined = false;

		console.log(`player ${player.username} leaved ${this.id}`)
		this.users = this.users.filter((e: Player) => e.id !== player.id);

		if (!this.leftPlayerJoined || !this.rightPlayerJoined)
			this.stop();
	}

	private getGamePlayersStatus(): any {
		return {
			id: this.id,
			player1: this.leftPlayer.toObject(),
			player2: this.rightPlayer.toObject()
		}
	}

	private getPlayerInPositions(positions: string[]): Player[] {
		return this.users.filter((p: Player) => p.position in positions);
	}

	private getPlayerCountInPositions(positions: string[]): number {
		return this.getPlayerInPositions(positions).length;
	}
}

