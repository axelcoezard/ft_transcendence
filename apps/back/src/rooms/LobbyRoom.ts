import { Socket } from "socket.io";
import GameRoom from "./GameRoom";
import Player from "./Player";
import Room from "./Room";

export default class LobbyRoom extends Room {
	constructor() {
		super(0, "lobby")
	}

	public onCreate() {
		let i = 0;
		setInterval(() => {
			if (this.users.length < 2)
				return;
			let min_player = this.users[i + 1 < this.users.length ? i + 1 : i - 1];
			let min_dist = Player.distance(this.users[i], min_player)

			for (let j = 0; j < this.users.length; j++)
			{
				if (this.users[i].id === this.users[j].id)
					continue;

				let distance = Player.distance(this.users[i], this.users[j]);
				if (distance < min_dist)
					min_dist = distance, min_player = this.users[j];
			}

			this.createGame(this.users[i], min_player);

			if (++i >= this.users.length) i = 0;
		}, 1000);
	}



	private async createGame(A: Player, B: Player) {
		let slug: string = Math.random().toString(16).substring(2,16);
		let [pA, pB] = Player.probabilities(A.elo, B.elo);
		this.gateway.createGameRoom(slug, A, B).then(room => {
			[A, B].forEach((player: Player) => {
				player.emit("lobby.match", {
					slug: room.slug,
					pA,
					pB
				})
				this.onLeave(player);
			});
		})
		console.log(`${A.username} vs ${B.username}`);
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
