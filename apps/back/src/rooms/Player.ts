import { Socket } from "socket.io";

export default class Player {
	public socket: Socket;
	public id: string;
	public type: string;

	public constructor(socket: Socket) {
		this.socket = socket;
		this.id = socket.id;
		this.type = "player";
	}

	public emit(type: string, data: any) {
		this.socket.emit(type, data);
	}
}
