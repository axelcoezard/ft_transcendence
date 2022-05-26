import { Socket } from "socket.io";
import { AppGateway } from "src/app.gateway";
import AppService from "src/services/app.service";



export default abstract class Room {
	public state: number;
	public name: string;

	public service: AppService;
	public gateway: AppGateway;
	public users: Array<Socket>;

	public messages: Map<string, (client: Socket, data: any) => any>;

	constructor(name: string)
	{
		this.state = 0;
		this.name = name;
		this.users = new Array();
	}

	protected onMessage(title: string, callback: (client: Socket, data: any) => any)
	{
		this.messages.set(title, callback);
	}

	public callMessage(title: string, client: Socket, data: any)
	{
		if (this.messages.has(title))
			this.messages.get(title)(client, data);
	}

	public setService(service: AppService)
	{
		this.service = service;
	}

	public abstract onCreate();
	public abstract onJoin(client: Socket);
	public abstract onLeave(client: Socket);
	public abstract onDispose();
}

