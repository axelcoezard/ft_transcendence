import { Socket } from "socket.io";

export default class Player {
	public socket: Socket;
	public id: string;

	public constructor(socket: Socket) {
		this.socket = socket;
		this.id = socket.id;
	}

	public emit(type: string, data: any) {
		this.socket.emit(type, data);
	}
}
