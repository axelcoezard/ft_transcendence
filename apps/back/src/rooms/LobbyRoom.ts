import { Socket } from "socket.io";
import Player from "./Player";
import Room from "./Room";

export default class LobbyRoom extends Room {
	constructor() {
		super(0, "lobby")
	}

	public onCreate() {

	}

	public onJoin(player: Player) {
		this.users.push(player);
		console.log(`${player.username} joined lobby`);
	}

	public onLeave(player: Player) {
		this.users = this.users.filter((e: Player) => e.id !== player.id);
	}
}
