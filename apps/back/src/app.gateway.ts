import { Logger, Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import ChannelBuilder from './builder/channel.builder';
import MessageBuilder from './builder/message.builder';
import ChatRoom from './rooms/ChatRoom';
import GameRoom from './rooms/GameRoom';
import LobbyRoom from './rooms/LobbyRoom';
import Player from './rooms/Player';
import Room from './rooms/Room';
import AppService from './services/app.service';

@WebSocketGateway({
	cors: { origin: '*',}
})
export class AppGateway
{
	@Inject(AppService)
	private readonly service: AppService;

	@WebSocketServer()
	public server: Server;
	public logger: Logger = new Logger('AppGateway');

	private users: Map<string, Player>;

	private lobby: LobbyRoom;
	private games: Map<string, GameRoom>;
	private chats: Map<string, ChatRoom>;

	public afterInit(server: Server) {
		this.logger.log('Init');

		this.users = new Map();
		this.games = new Map();
		this.chats = new Map();

		let game1 = new GameRoom("ewsdg");
		game1.setService(this.service);
		game1.setGateway(this);
		this.games.set(game1.id, game1);

		let chat1 = new ChatRoom("ewsdg");
		chat1.setService(this.service);
		chat1.setGateway(this);
		this.chats.set(chat1.id, chat1);
	}


	@SubscribeMessage('connect_message')
	public async onConnectMessage(client: Socket, msg: any) {
		if (this.users.has(msg.id))
		{
			let current = this.users.get(msg.id);
			current.id = msg.id;
			current.username = msg.username;
			current.socket = client;
			this.users.set(msg.id, current);
		}
		else this.users.set(msg.id, new Player(
			client, msg.id, msg.username
		))

		this.logger.log(`Client connected: ${msg.username}`);
	}
	public handleConnection(client: Socket, ...args: any[]) {}

	@SubscribeMessage('message')
	public async onMessage(client: Socket, msg: any) {
		let player = this.users.get(msg.value.id);
		let room = this.getRoom(msg.room, msg.room_id);
		if (room)
			room.callMessage(msg.type, player, msg.value);
	}

	public handleDisconnect(client: Socket) {
		this.users.forEach((value: Player, key: string) => {
			if (value.socket.id === client.id)
			{
				this.logger.log(`Client disconnected: ${value.username}`);
				this.users.delete(key);
			}
		})
	}

	private getRoom(type: string, id: string): Room {
		if (type === "game")
			return this.games.get(id);
		if (type === "chat")
			return this.chats.get(id)
		if (type === "lobby")
			return this.lobby;
		return null;
	}
}
