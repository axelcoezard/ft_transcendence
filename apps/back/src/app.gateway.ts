import { Logger, Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import ChannelBuilder from './builder/channel.builder';
import Channel from './entities/channel.entity';
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

		this.service.channels.getAll().then((channels: any) => {
			channels.forEach((channel: any) => {
				let chat = new ChatRoom(channel.id, channel.slug);
				chat.setService(this.service);
				chat.setGateway(this);
				this.chats.set(chat.slug, chat);
				this.logger.log(`Added ${chat.slug} to avalaible chats`)
			})
		});

	}

	@SubscribeMessage('connect_message')
	public async onConnectMessage(client: Socket, msg: any) {
		if (this.users.has(msg.username))
		{
			let current = this.users.get(msg.username);
			current.id = parseInt(msg.id);
			current.username = msg.username;
			current.socket = client;
			this.users.set(msg.username, current);
		}
		else this.users.set(msg.username, new Player(
			client, parseInt(msg.id), msg.username
		))

		this.logger.log(`Client connected: ${msg.username}`);
	}
	public handleConnection(client: Socket, ...args: any[]) {}

	private async createGameRoom(room_id: string)
	{
		let game = new GameRoom(0, room_id);
		game.setService(this.service);
		game.setGateway(this);
		// ajouter la game dans la db et recup l'id
		this.games.set(game.slug, game);
		return game;
	}

	private async createChatRoom(room_id: string, player: Player): Promise<ChatRoom> {
		let room = new ChatRoom(0, room_id);
		room.setService(this.service);
		room.setGateway(this);
		room.id = (await this.service.channels.create(
			ChannelBuilder.new()
			.setCreator(player.id)
			.setSlug(room.slug)
		)).id;
		return room;
	}

	private async createRoom(msg: any, player: Player): Promise<Room> {
		let room = null;
		if (msg.room === "game")
			room = await this.createGameRoom(msg);
		if (msg.room === "chat")
			room = await this.createChatRoom(msg.room_id, player);
		return room;
	}

	@SubscribeMessage('message')
	public async onMessage(client: Socket, msg: any) {
		let player = this.users.get(msg.value.username);
		let room = this.getRoom(msg.room, msg.room_id);
		if (!room)
			room = await this.createRoom(msg, player);
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
