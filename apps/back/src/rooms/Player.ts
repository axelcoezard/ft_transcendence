import { Socket } from "socket.io";

export default class Player {
	public socket: Socket;
	public id: string;
	public username: string;
	public position: string;
	public score: number;

	public constructor(socket: Socket, id: string, username: string) {
		this.socket = socket;
		this.id = socket.id;
		this.username = username;
		this.position = "player";
	}

	public emit(type: string, data: any) {
		this.socket.emit(type, data);
	}
}
