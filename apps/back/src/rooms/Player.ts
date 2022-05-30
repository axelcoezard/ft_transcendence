import { Socket } from "socket.io";

export default class Player {
	public socket: Socket;
	public id: number;
	public username: string;
	public position: string;
	public score: number;

	public constructor(socket: Socket, id: number, username: string) {
		this.socket = socket;
		this.id = id;
		this.username = username;
	}

	public emit(type: string, data: any) {
		this.socket.emit(type, data);
	}
}
