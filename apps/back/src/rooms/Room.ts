import { Socket } from "socket.io";
import { AppGateway } from "src/app.gateway";
import AppService from "src/app.service";
import Player from "./Player";



export default abstract class Room {
	public id: number;
	public slug: string;

	protected service: AppService;
	protected gateway: AppGateway;
	protected users: Array<Player>;

	protected messages: Map<string, (player: Player, data: any) => any>;

	constructor(id: number, slug: string)
	{
		this.id = id;
		this.slug = slug;
		this.users = new Array();
		this.messages = new Map();

		this.onCreate();
	}

	protected onMessage(type: string, callback: (player: Player, data: any) => any)
	{
		this.messages.set(type, callback);
	}

	public callMessage(type: string, player: Player, data: any)
	{
		if (type == "join")
		{
			player.rooms.push(this.slug);
			return this.onJoin(player, data)
		}
		if (type == "leave")
		{
			if (player.rooms)
				player.rooms = player.rooms.filter((room: string) => room != this.slug);
			return this.onLeave(player)
		}
		if (this.messages.has(type))
			this.messages.get(type)(player, data);
	}

	public setGateway(gateway: AppGateway)
	{
		this.gateway = gateway;
	}

	public setService(service: AppService)
	{
		this.service = service;
	}

	public abstract onCreate();
	public abstract onJoin(client: Player, data: any);
	public abstract onLeave(client: Player);
}

