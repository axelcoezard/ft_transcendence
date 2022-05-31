import { IsNumberOptions } from "class-validator";
import { Socket } from "socket.io";
import ChatRoom from "./ChatRoom";
import GameRoom from "./GameRoom";
import LobbyRoom from "./LobbyRoom";

export default class Player {
	public socket: Socket;
	public id: number;
	public username: string;
	public position: string;
	public score: number;
	public elo: number;

	public rooms: Array<string>;

	public constructor(
		socket: Socket,
		id: number,
		username: string,
		elo: number
	) {
		this.socket = socket;
		this.id = id;
		this.username = username;
		this.elo = elo;
		this.rooms = new Array();
	}

	public emit(type: string, data: any) {
		this.socket.emit(type, data);
	}
}
