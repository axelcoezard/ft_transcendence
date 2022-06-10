import { Logger, Inject } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import ChannelBuilder from './modules/chats/channel.builder';
import GameBuilder from './modules/game/game.builder';
import ChatRoom from './rooms/ChatRoom';
import GameRoom from './rooms/GameRoom';
import LobbyRoom from './rooms/LobbyRoom';
import Player from './rooms/Player';
import Room from './rooms/Room';
import AppService from './app.service';

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
		this.lobby.setGateway(this)
		this.lobby.setService(this.service);

		this.users = new Map();
		this.games = new Map();
		this.chats = new Map();

		this.service.games.cleanUp();

		this.service.channels.getAll().then((channels: any) => {
			channels.forEach((channel: any) => {
				let room = new ChatRoom(channel.id, channel.slug);
				room.setService(this.service);
				room.setGateway(this);
				room.status = channel.status;
				this.chats.set(room.slug, room);
				this.logger.log(`Added ${room.slug} to avalaible chats`)
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
		this.service.users.setStatus(msg.id, 'online');
		this.logger.log(`Client connected: ${msg.username}`);
	}
	public handleConnection(client: Socket, ...args: any[]) {}

	public async createGameRoom(room_id: string, A: Player, B: Player): Promise<GameRoom>
	{
		let game = new GameRoom(0, room_id);
		game.setService(this.service);
		game.setGateway(this);
		game.leftPlayer = A;
		game.rightPlayer = B;
		game.id = (await this.service.games.create(
			GameBuilder.new()
			.setSlug(game.slug)
			.setPlayers(A, B)
		)).id;
		this.games.set(room_id, game);
		return game;
	}

	public async broadcast(type: string, data: any)
	{
		this.users.forEach((user: Player) => {
			if (user.socket)
				user.socket.emit(type, data);
		})
	}

	@SubscribeMessage('message')
	public async onMessage(client: Socket, msg: any) {
		let player = this.users.get(msg.sender.username);
		if (msg.room === "broadcast")
			return this.broadcast(msg.type, msg.value)
		let room = await this.getRoom(msg.room, msg.room_id);
		if (player && room)
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
				this.service.users.setStatus(value.id, 'offline');
				this.users.delete(key);
			}
		})
	}

	private hasPlayer(id: number)
	{
		return this.users
			&& Array.from(this.users.values()).filter((p: Player) => p.id === id).length > 0;
	}

	private async getPlayer(id: number) : Promise<Player>
	{
		let res = await this.service.users.getUser(id);
		if (this.hasPlayer(id))
			return Array.from(this.users.values()).filter((p: Player) => p.id === id)[0];
		let player = new Player(null, res.id, res.username, res.ELO_score);
		this.users.set(res.username, player);
		return player;
	}

	private async getGame(id: string)
	{
		if (this.games.has(id)) return this.games.get(id);
		let game = await this.service.games.getBySlug(id);
		if (game) {
			let room = new GameRoom(game.id, game.slug);
			room.setService(this.service);
			room.setGateway(this);
			if (game.user1_id) room.leftPlayer = await this.getPlayer(game.user1_id);
			if (game.user2_id) room.rightPlayer = await this.getPlayer(game.user2_id);
			this.games.set(room.slug, room);
			return room;
		}
		return null
	}

	private async getChannel(id: string)
	{
		if (this.chats.has(id)) return this.chats.get(id);
		let channel = await this.service.channels.getBySlug(id);
		if (channel) {
			let room = new ChatRoom(channel.id, channel.slug);
			room.setService(this.service);
			room.setGateway(this);
			room.status = channel.status;
			this.chats.set(room.slug, room);
			return room;
		}
		return null
	}

	private async getRoom(type: string, id: string): Promise<Room> {
		if (type === "lobby")
			return this.lobby;
		if (type === "game")
			return this.getGame(id);
		if (type === "chat")
			return this.getChannel(id);
		return null;
	}
}
