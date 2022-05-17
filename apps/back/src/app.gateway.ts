import { Module, Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
	cors: { origin: '*',}
})
export class AppGateway {

	@WebSocketServer()
	private server: Server;
	private logger: Logger = new Logger('AppGateway');
	private users: any;

	afterInit(server: Server) {
		this.logger.log('Init');
		this.users = new Map();
	}

	handleDisconnect(client: Socket) {
		this.users.delete(client.id);
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.users.set(client.id, client)
		client.emit("id", {id: client.id});
		this.logger.log(`Client connected: ${client.id}`);
	}

	@SubscribeMessage("privmsg")
	onPrivmsg(client: Socket, {value}) {
		this.server.emit("privmsg", {
			sender: client.id,
			value
		});
		console.log(`${client.id}: ${value}`);
	}

	@SubscribeMessage("paddleMove")
	onPaddleMove(client: Socket, {sender, y}) {
		this.server.emit("paddleMove", {
			sender,
			y
		});
	}
}