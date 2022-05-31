import { Logger, Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { RoomInternalState } from 'colyseus';
import { Socket, Server } from 'socket.io';
import ChannelBuilder from './builder/channel.builder';
import GameBuilder from './builder/game.builder';
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

		this.lobby = new LobbyRoom();
		this.users = new Map();
		this.games = new Map();
		this.chats = new Map();

		this.service.channels.getAll().then((channels: any) => {
			channels.forEach((channel: any) => {
				let room = new ChatRoom(channel.id, channel.slug);
				room.setService(this.service);
				room.setGateway(this);
				this.chats.set(room.slug, room);
				this.logger.log(`Added ${room.slug} to avalaible chats`)
			})
		});

		this.service.games.getAll().then((games: any) => {
			games.forEach((game: any) => {
				let room = new GameRoom(game.id, game.slug);
				room.setService(this.service);
				room.setGateway(this);
				room.state = game.state;
				this.games.set(room.slug, room);
				this.logger.log(`Added ${room.slug} to avalaible games`)
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
			current.elo = msg.ELO_score;
			this.users.set(msg.username, current);
		}
		else this.users.set(msg.username, new Player(
			client, parseInt(msg.id), msg.username, msg.ELO_score
		))

		this.logger.log(`Client connected: ${msg.username}`);
	}
	public handleConnection(client: Socket, ...args: any[]) {}

	private async createGameRoom(room_id: string): Promise<GameRoom>
	{
		let game = new GameRoom(0, room_id);
		game.setService(this.service);
		game.setGateway(this);
		game.id = (await this.service.games.create(
			GameBuilder.new()
			.setSlug(game.slug)
		)).id;
		this.games.set(room_id, game);
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
		)).id
		this.chats.set(room_id, room);
		return room;
	}

	private async createRoom(msg: any, player: Player): Promise<Room> {
		let room = null;
		if (msg.room === "game")
			room = await this.createGameRoom(msg.room_id);
		else if (msg.room === "chat")
			room = await this.createChatRoom(msg.room_id, player);
		else throw new Error("Invalid room type");
		return room;
	}

	@SubscribeMessage('message')
	public async onMessage(client: Socket, msg: any) {
		let player = this.users.get(msg.value.username);
		let room = this.getRoom(msg.room, msg.room_id);
		if (!room)
			this.createRoom(msg, player).then((room: Room) => {
				room.callMessage(msg.type, player, msg.value);
			});
		else
			room.callMessage(msg.type, player, msg.value);
	}

	public handleDisconnect(client: Socket) {
		this.users.forEach((value: Player, key: string) => {
			if (value.socket.id === client.id)
			{
				this.logger.log(`Client disconnected: ${value.username}`);
				value.rooms.forEach((name: string) => {
					let room;
					if (name == "lobby") room = this.lobby;
					else if (this.games.has(name)) room = this.games.get(name);
					else if (this.chats.has(name)) room = this.chats.get(name);
					else throw new Error("Invalid room");
					room.onLeave(value)
				});
				this.users.delete(key);
			}
		})
	}

	private getRoom(type: string, id: string): Room {
		if (type === "lobby")
			return this.lobby;
		if (type === "game")
			return this.games.get(id);
		if (type === "chat")
			return this.chats.get(id)
		return null;
	}
}
