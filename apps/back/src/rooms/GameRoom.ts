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

	constructor(id: number, slug: string) {
		super(id, slug)

		this.leftPaddle = new Vector(20, 50);
		this.rightPaddle = new Vector(PONG_WIDTH - PADDLE_WIDTH - 20, 50);
	}

	public onCreate() {
		this.onMessage("paddleMove", (player: Player, data: any) => {
			if(data.sender_position === "left")
				this.leftPaddle = new Vector(data.x, data.y);
			if(data.sender_position === "right")
				this.rightPaddle = new Vector(data.x, data.y);
			this.users.forEach(p => p.emit("game.updatePaddle", data))
		})
	}

	public onJoin(player: Player, data: any) {
		let position = "spectator";
		if (this.leftPlayer == null) {
			position = "left";
			this.leftPlayer = player;
		} else if (this.rightPlayer == null) {
			position = "right";
			this.rightPlayer = player;
		}
		player.position = position;
		player.score = 0;
		player.emit("game.join", {position})

		this.users.push(player);
		console.log(`player ${player.username} joined ${this.id} as ${player.position}`)

		if (this.leftPlayer && this.rightPlayer)
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
			this.users.forEach(player => player.emit("game.updateScore", {
				id: this.id,
				player1: {
					name: this.leftPlayer.username,
					score: this.leftPlayer.score
				},
				player2: {
					name: this.rightPlayer.username,
					score: this.rightPlayer.score
				}
			}))

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
		this.resetBall();
		this.state = 1;
		this.users.forEach(player => player.emit("game.start", {
			id: this.id,
			player1: {
				name: this.leftPlayer.username,
				score: this.leftPlayer.score
			},
			player2: {
				name: this.rightPlayer.username,
				score: this.rightPlayer.score
			}
		}))
		this.update(0);
		console.log(`${this.id} started`)
	}

	private stop() {
		this.state = 0;
		this.users.forEach(player => player.emit("game.stop", {
			id: this.id
		}))
		console.log(`${this.id} stopped`)
	}

	public onLeave(player: Player) {
		let tmp = player.position;

		if (player.position === "left") {
			this.leftPlayer = null;
		} else if (player.position === "right") {
			this.rightPlayer = null;
		}
		player.position = null;

		console.log(`player ${player.username} leaved ${this.id} as ${tmp}`)
		this.users = this.users.filter((e: Player) => e.id !== player.id);

		if (!this.leftPlayer || !this.rightPlayer)
			this.stop();
	}

	private getPlayerInPositions(positions: string[]): Player[] {
		return this.users.filter((p: Player) => p.position in positions);
	}

	private getPlayerCountInPositions(positions: string[]): number {
		return this.getPlayerInPositions(positions).length;
	}
}

