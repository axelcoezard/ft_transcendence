import { Socket } from "socket.io";
import Room from "./Room";

export default class LobbyRoom extends Room {
	constructor() {
		super("lobby")
	}

	public onCreate() {

	}

	public onJoin(client: Socket) {
		this.users.push(client);
	}

	public onLeave(client: Socket) {
		this.users = this.users.filter((e: Socket) => e.id !== client.id);
	}

	public onDispose() {

	}
}
