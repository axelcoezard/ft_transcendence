import { Socket } from "socket.io";
import MessageBuilder from "src/builder/message.builder";
import Room from "./Room";

export default class GameRoom extends Room {
	constructor(id: string) {
		super(id)
	}

	public onCreate() {
		this.onMessage("paddleMove", (client: Socket, data: any) => {

		})
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

