import { IsNumberOptions } from "class-validator";
import { Socket } from "socket.io";
import AppService from "src/app.service";
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
	public color: string;

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

	public toSave(): any {
		return {
			id: this.id,
			username: this.username,
			elo: this.elo,
			color: this.color
		}
	}

	public toObject(): any {
		return {
			...this.toSave(),
			position: this.position,
			score: this.score
		}
	}

	public static distance(A: Player, B: Player): number
	{
		let [pA, pB] = Player.probabilities(A.elo, B.elo);
		return Math.abs(pA - pB);
	}

	public static probabilities(A_elo: number, B_elo: number): [number, number] {
		let p = (x) => 1 / (1 + Math.pow(10, -x / 400));
		let diff = A_elo - B_elo;

		let pA: number = p(diff);
		let pB: number = p(-diff);

		return [pA, pB]
	}

	public static async updateElo(A: Player, B: Player, service: AppService)
		: Promise<[number, number]>
	{
		let ELO_A = (await service.users.getElo(A.id))[0].ELO_score;
		let ELO_B = (await service.users.getElo(B.id))[0].ELO_score;
		let [pA, pB] = Player.probabilities(ELO_A, ELO_B);
		let newElo = (elo, w, p) => {
			let K = 32;
			if (elo >= 2100 && elo <= 2400) K = 24;
			if (elo >= 2400 ) K = 16;
			return Math.round(elo + K * (w - p))
		}
		return [newElo(ELO_A, 1, pA), newElo(ELO_B, 0, pB)];
	}
}
