import { Socket } from "socket.io";
import Room from "./Room";

export default class ChatRoom extends Room {
	constructor(id: string) {
		super(id)
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

