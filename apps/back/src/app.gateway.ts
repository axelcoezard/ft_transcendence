import { Module, Logger, Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { MessageService } from './services/message.service';

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
	onPrivmsg(client: Socket, msg) {
		this.server.emit("privmsg", {
			sender: client.id,
			...msg
		});
	}

	@SubscribeMessage("paddleMove")
	onPaddleMove(client: Socket, {sender, y}) {
		this.server.emit("paddleMove", {
			sender,
			y
		});
	}
}
