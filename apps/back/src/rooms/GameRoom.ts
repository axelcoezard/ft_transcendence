import GameBuilder from "src/modules/game/game.builder";
import Player from "./Player";
import Room from "./Room";

export const POINT_TO_WIN: number = 6;
export const PONG_WIDTH: number = 600;
export const PONG_HEIGHT: number = 400;
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
	public state: string;

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
		this.state = GameBuilder.GAME_WAITING;
	}

	public onCreate() {
		this.onMessage("paddleMove", (player: Player, data: any) => {
			let vec = new Vector(data.x * PONG_WIDTH, data.y * PONG_HEIGHT);
			if(data.id === this.leftPlayer.id)			this.leftPaddle = vec;
			else if(data.id === this.rightPlayer.id)	this.rightPaddle = vec;
			this.users.forEach(p => {
				if (p.id !== data.id) p.emit("game.updatePaddle", data)
			})
		})
	}

	public onJoin(player: Player, data: any) {
		let position = "spectator";
		if (this.leftPlayer && this.leftPlayer.id == player.id)
			this.leftPlayerJoined = true, position = "left";
		else if (this.rightPlayer && this.rightPlayer.id == player.id)
			this.rightPlayerJoined = true, position = "right";
		else if (!this.leftPlayer && !this.leftPlayerJoined)
		{
			this.leftPlayer = player;
			this.leftPlayerJoined = true;
			position = "left";
		}
		else if (!this.rightPlayer && !this.rightPlayerJoined)
		{
			this.rightPlayer = player;
			this.rightPlayerJoined = true;
			position = "right";
		}
		player.position = position;
		player.score = 0;
		player.color = data.color;
		player.emit("game.join", {position})

		this.users.push(player);
		console.log(`player ${player.username} joined ${this.id} as ${player.position}`)

		if (this.state == GameBuilder.GAME_WAITING
			&& this.leftPlayerJoined && this.rightPlayerJoined)
			this.starting();
	}

	private starting() {
		if (this.state !== GameBuilder.GAME_WAITING)
			return;
		this.state = GameBuilder.GAME_STARTING;

		this.service.games.update(
			GameBuilder.new()
			.setId(this.id)
			.setSlug(this.slug)
			.setPlayers(this.leftPlayer, this.rightPlayer)
			.setStatus(GameBuilder.GAME_STARTING)
		)

		this.users.forEach(p => p.emit("game.starting", this.getGamePlayersStatus()))
		let countdown = 3;
		let interval = setInterval(() => {
			this.users.forEach(p => p.emit("game.countdown", {countdown}))
			console.log(`${this.id} starting in ${countdown}`)
			countdown--;
			if (countdown < 0) {
				clearInterval(interval);
				this.start();
			}
		}, 1000);
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
		let RADIUS = BALL_DIAMETER / 2;

		let point = false;
		if (this.ball_d.x === -1 && this.ball_pos.x - RADIUS <= 0)
			this.rightPlayer.score++, point = true;
		else if (this.ball_d.x === 1 && this.ball_pos.x + RADIUS >= PONG_WIDTH)
			this.leftPlayer.score++, point = true;

		if (point)
			this.users.forEach(player => player.emit("game.updateScore",
				this.getGamePlayersStatus()
			))

		if (this.leftPlayer.score >= POINT_TO_WIN || this.rightPlayer.score >= POINT_TO_WIN)
			this.stop();

		if (this.ball_pos.x - RADIUS <= 0 || this.ball_pos.x + RADIUS >= PONG_WIDTH)
			this.resetBall();

		if ((this.ball_d.y === -1 && this.ball_pos.y - RADIUS <= 0)
			|| (this.ball_d.y === 1 && this.ball_pos.y + RADIUS >= PONG_HEIGHT))
			this.ball_d.y = -this.ball_d.y;

		let calculateInter = (x: number, pos: Vector, dir: Vector) => {
			let a = dir.y;
			let b = dir.x * pos.y - dir.y * pos.x;
			return (a * x + b) / dir.x;
		}

		if (this.ball_d.x === -1
			&& this.ball_pos.x - RADIUS <= this.leftPaddle.x + PADDLE_WIDTH
			&& this.ball_pos.y + RADIUS >= this.leftPaddle.y
	 		&& this.ball_pos.y - RADIUS <= this.leftPaddle.y + PADDLE_HEIGHT)
		{
			this.ball_speed *= 1.1;
			this.ball_d.x = -this.ball_d.x;
		}

		if (this.ball_d.x === 1
			&& this.ball_pos.x + RADIUS >= this.rightPaddle.x
			&& this.ball_pos.y + RADIUS >= this.rightPaddle.y
			&& this.ball_pos.y - RADIUS <= this.rightPaddle.y + PADDLE_HEIGHT)
		{
			this.ball_speed *= 1.1;
			this.ball_d.x = -this.ball_d.x;
		}

		this.ball_pos.x += this.ball_d.x * this.ball_speed;
		this.ball_pos.y += this.ball_d.y * this.ball_speed;

		this.users.forEach(player => player.emit("game.updateBall", {
			id: this.id,
			x: this.ball_pos.x / PONG_WIDTH,
			y: this.ball_pos.y / PONG_HEIGHT,
		}))

		if (this.state == GameBuilder.GAME_STARTED)
			setTimeout(() => this.update(updates + 1), 1000 / 50)
	}

	private start() {
		if (this.state !== GameBuilder.GAME_STARTING)
			return;
		this.state = GameBuilder.GAME_STARTED;
		this.resetBall();

		this.service.games.update(
			GameBuilder.new()
			.setId(this.id)
			.setSlug(this.slug)
			.setPlayers(this.leftPlayer, this.rightPlayer)
			.setStatus(GameBuilder.GAME_STARTED)
		)

		this.users.forEach(player => player.emit("game.start",
			this.getGamePlayersStatus()
		))
		this.update(0);
		console.log(`${this.id} started`)
	}

	private async stop() {
		if (this.state !== GameBuilder.GAME_STARTED)
			return;
		this.state = GameBuilder.GAME_ENDED;

		let winner = null;
		let loser = null;
		if (this.leftPlayer.score >= this.rightPlayer.score)
			winner = this.leftPlayer, loser = this.rightPlayer;
		else
			winner = this.rightPlayer, loser = this.leftPlayer;

		let elos = await Player.updateElo(winner, loser, this.service);
		winner.elo = elos[0];
		loser.elo = elos[1];

		this.users.forEach(player => player.emit("game.stop", {
			id: this.id, winner: winner.toObject(), loser: loser.toObject()
		}))

		this.service.games.update(
			GameBuilder.new()
			.setId(this.id)
			.setSlug(this.slug)
			.setPlayers(this.leftPlayer, this.rightPlayer)
			.setScores(this.leftPlayer.score, this.rightPlayer.score)
			.setStatus(GameBuilder.GAME_ENDED)
		)
		this.service.users.updateElo(winner.id, elos[0]);
		this.service.users.updateElo(loser.id, elos[1]);
		console.log(`${this.id} stopped`)
	}

	public onLeave(player: Player) {
		if (this.leftPlayer && player.id === this.leftPlayer.id)
			this.leftPlayerJoined = false;
		else if (this.rightPlayer && player.id === this.rightPlayer.id)
			this.rightPlayerJoined = false;

		console.log(`player ${player.username} leaved ${this.id}`)
		this.users = this.users.filter((e: Player) => e.id !== player.id);

		if (this.state == GameBuilder.GAME_STARTED
			&& (!this.leftPlayerJoined || !this.rightPlayerJoined))
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
}

