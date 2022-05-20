import { Module, Logger, Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { Message } from './entities/message.entity';
import AppService from './services/app.service';

@WebSocketGateway({
	cors: { origin: '*',}
})
export class AppGateway
{
	@Inject(AppService)
	private readonly service: AppService;

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
		let message = new Message()
		message.sender_id = msg.sender_id;
		message.recipient_id = msg.recipient_id;
		message.recipient_table = msg.recipient_table;
		message.type = "text";
		message.value = msg.value;

		this.server.emit("privmsg", msg);
		this.service.messageService.addMessage(message);
	}

	@SubscribeMessage("paddleMove")
	onPaddleMove(client: Socket, {sender, y}) {
		this.server.emit("paddleMove", {
			sender,
			y
		});
	}
}
