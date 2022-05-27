import { Socket } from "socket.io";
import { AppGateway } from "src/app.gateway";
import AppService from "src/services/app.service";
import Player from "./Player";



export default abstract class Room {
	public state: number;
	public id: string;

	protected service: AppService;
	protected gateway: AppGateway;
	protected users: Array<Player>;

	protected messages: Map<string, (player: Player, data: any) => any>;

	constructor(id: string)
	{
		this.id = id;
		this.state = 0;
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
			return this.onJoin(player)
		if (type == "leave")
			return this.onLeave(player)

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
	public abstract onJoin(client: Player);
	public abstract onLeave(client: Player);
}

