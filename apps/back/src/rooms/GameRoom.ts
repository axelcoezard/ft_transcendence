import { VariableDeclarator } from "@babel/types";
import { Socket } from "socket.io";
import MessageBuilder from "src/builder/message.builder";
import Player from "./Player";
import Room from "./Room";

export const PONG_HEIGHT: number = 400;
export const PONG_WIDTH: number = 600;
export const BALL_DIAMETER = 20;
export const BALL_SPEED = 1;
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

	leftPaddle: Vector
	rightPaddle: Vector;

	constructor(id: string) {
		super(id)

		this.leftPaddle = new Vector(20, 50);
		this.rightPaddle = new Vector(PONG_WIDTH - PADDLE_WIDTH - 20, 50);
	}

	public onCreate() {
		this.onMessage("paddleMove", (player: Player, data: any) => {
			if(data.sender_position === "left")
				this.leftPaddle = new Vector(data.x, data.y);
			if(data.sender_position === "right")
				this.rightPaddle = new Vector(data.x, data.y);
			this.users.forEach(player => player.emit("playerMove", data))
		})
	}

	public onJoin(player: Player) {
		this.users.push(player);

		if (this.users.length == 1)
			player.emit("joinGame", {position: "left"})
		if (this.users.length == 2)
			player.emit("joinGame", {position: "right"})
		if (this.users.length > 2)
			player.emit("joinGame", {position: "spectator"})

		console.log(`player ${player.id} joined ${this.id}`)

		if (this.users.length >= 2)
			this.start();
	}

	public start() {
		this.state = 1;
		this.users.forEach(player => player.emit("startGame", {
			id: this.id
		}))

		this.ball_pos = new Vector(200, 300);
		this.ball_d = new Vector(
			Math.round(Math.random()) * 2 - 1,
			Math.round(Math.random()) * 2 - 1
		);

		console.log("start")

		let i: number = 0;
		while (this.state)
		{
			if(i++ % 100 != 0)
				continue;

			if ((this.ball_d.x === -1 && this.ball_pos.x <= 0)
				||(this.ball_d.x === 1 && this.ball_pos.x >= PONG_WIDTH - BALL_DIAMETER))
				this.ball_d.x = -this.ball_d.x;

			if ((this.ball_d.y === -1 && this.ball_pos.y <= 0)
				|| (this.ball_d.y === 1 && this.ball_pos.y >= PONG_HEIGHT - BALL_DIAMETER))
				this.ball_d.y = -this.ball_d.y;

			if (this.ball_d.x === -1 && this.ball_pos.x <= this.leftPaddle.x + PADDLE_WIDTH
				&& this.ball_pos.y + BALL_DIAMETER > this.leftPaddle.y
				&& this.ball_pos.y <= this.leftPaddle.y + PADDLE_HEIGHT)
				this.ball_d.x = -this.ball_d.x;

			if (this.ball_d.x === 1 && this.ball_pos.x + BALL_DIAMETER >= this.rightPaddle.x
				&& this.ball_pos.y + BALL_DIAMETER >= this.rightPaddle.y
				&& this.ball_pos.y <= this.rightPaddle.y + PADDLE_HEIGHT)
				this.ball_d.x = -this.ball_d.x;

			if (this.ball_pos.x <= 0 || this.ball_pos.x >= PONG_WIDTH - BALL_DIAMETER)
			{
				this.ball_pos.x = 200;
				this.ball_pos.y = 300;
			}

			this.ball_pos.x += this.ball_d.x * BALL_SPEED
			this.ball_pos.y += this.ball_d.y * BALL_SPEED

			this.users.forEach(player => player.emit("ballMove", {
				id: this.id,
				x: this.ball_pos.x,
				y: this.ball_pos.y
			}))
		}
	}

	public stop() {
		this.state = 0;
		this.users.forEach(player => player.emit("stopGame", {
			id: this.id
		}))
	}

	public onLeave(player: Player) {
		this.users = this.users.filter((e: Player) => e.id !== player.id);
		console.log(`player ${player.id} leaved ${this.id}`)
	}
}

