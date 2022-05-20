import { Module, Logger, Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import ChannelBuilder from './builder/channel.builder';
import MessageBuilder from './builder/message.builder';
import Message from './entities/message.entity';
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

	@SubscribeMessage("channel_join")
	async onJoinChannel(client: Socket, info) {
		console.log("joined channel")
		if (await this.service.channels.getBySlug(info.channel_slug))
			return;

		console.error(`Channel ${info.channel_slug} does not exist: creating...`)
		await this.service.channels.create(
			ChannelBuilder.new("default")
			.setCreator(info.sender_id)
			.setDescription("")
			.setSlug(info.channel_slug)
		)
	}

	@SubscribeMessage("channel_msg")
	async onPrivmsg(client: Socket, msg) {
		let channel = await this.service.channels.getBySlug(msg.channel_slug);
		let message = MessageBuilder.new(msg.value)
			.setSender(msg.sender_id)
			.setChannel(channel.id)
			.setType(msg.type);

		this.server.emit("channel_msg", msg);
		this.service.messages.addMessage(message);
	}

	@SubscribeMessage("paddleMove")
	onPaddleMove(client: Socket, {sender, y}) {
		this.server.emit("paddleMove", {
			sender,
			y
		});
	}
}
