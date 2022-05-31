import { Socket } from "socket.io";
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
				for (let j = i + 1; j < this.users.length; j++)
				{
					if (this.users[i].username === this.users[j].username)
						continue;

					let [pA, pB] = this.probabilities(this.users[i], this.users[j]);
				}
			}
		}, 1000);
	}

	public probabilities(A: Player, B: Player): [number, number] {
		let p = (x) => 1 / (1 + Math.pow(10, x / 400));
		let diff = A.elo - B.elo;

		let pA: number = p(-diff);
		let pB: number = p(diff);

		return [pA, pB]
	}

	public onJoin(player: Player) {
		this.users.push(player);
		console.log(`${player.username} joined lobby`);
	}

	public onLeave(player: Player) {
		this.users = this.users.filter((e: Player) => e.id !== player.id);
		console.log(`${player.username} leaved lobby`);
	}
}
