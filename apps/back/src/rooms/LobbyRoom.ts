import { Socket } from "socket.io";
import GameRoom from "./GameRoom";
import Player from "./Player";
import Room from "./Room";

export default class LobbyRoom extends Room {
	constructor() {
		super(0, "lobby")
	}

	public onCreate() {
		setInterval(() => {
			for (let i = 0; i < this.users.length; i++)
			{
				if (this.users.length < 2)
					break;
				let min_player = this.users[1];
				let min_dist = this.distance(this.users[i], min_player)

				for (let j = i + 1; j < this.users.length; j++)
				{
					if (this.users[i].username === this.users[j].username)
						continue;

					let distance = this.distance(this.users[i], this.users[j]);
					if (distance < min_dist)
						min_dist = distance, min_player = this.users[j];
				}

				this.createGame(this.users[i], min_player);
			}
		}, 1000);
	}

	private distance(A: Player, B: Player): number
	{
		let [pA, pB] = this.probabilities(A, B);
		return Math.abs(pA - pB);
	}

	private probabilities(A: Player, B: Player): [number, number] {
		let p = (x) => 1 / (1 + Math.pow(10, x / 400));
		let diff = A.elo - B.elo;

		let pA: number = p(-diff);
		let pB: number = p(diff);

		return [pA, pB]
	}

	private async createGame(A: Player, B: Player) {
		let slug: string = Math.random().toString(16).substring(2,16);
		let room: GameRoom = await this.gateway.createGameRoom(slug);
		let [pA, pB] = this.probabilities(A, B);

		console.log(`${A.username} vs ${B.username}`);

		[A, B].forEach((player: Player) => {
			player.emit("lobby.match", {
				slug: room.slug,
				pA,
				pB
			})
			this.onLeave(player);
		});
	}

	public onJoin(player: Player, data: any) {
		player.elo = data.elo
		this.users.push(player);
		console.log(`${player.username} joined lobby`);
	}

	public onLeave(player: Player) {
		this.users = this.users.filter((e: Player) => e.id !== player.id);
		console.log(`${player.username} leaved lobby`);
	}
}
