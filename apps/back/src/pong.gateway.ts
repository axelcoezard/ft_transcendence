import { Module, Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
	cors: { origin: '*',},
	namespace: 'pong'
})
export class PongGateway {

	@WebSocketServer()
	private server: Server;
	private logger: Logger = new Logger('PongGateway');
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

	@SubscribeMessage("paddleMove")
	onPaddleMove(client: Socket, {y}) {
		this.server.emit("paddleMove", {
			sender: client.id, y
		});
	}
}
