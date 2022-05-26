import { Socket } from "socket.io";
import Player from "./Player";
import Room from "./Room";

export default class ChatRoom extends Room {
	constructor(id: string) {
		super(id)
	}

	public onCreate() {
		this.onMessage("msg", (player: Player, data: any) => {
			this.users.forEach((p: Player) => {
				p.socket.emit("chat.msg", data);
			});
			console.log(data)
		})
	}

	public onJoin(player: Player) {
		this.users.push(player);
		console.log(`${player.id} joined ${this.id}`);
	}

	public onLeave(player: Player) {
		this.users = this.users.filter((e: Player) => e.id !== player.id);
		console.log(`${player.id} leaved ${this.id}`);
	}

	/*

	public async sendTchatInformations(client: Socket, slug: string) {
		client.emit("channel_set_list", await this.service.channels.getAll());
		if (slug)
			client.emit("channel_set_msg", await this.service.messages.getByChannel(slug));
	}
	@SubscribeMessage("channel_join")
	public async onJoinChannel(client: Socket, info) {
		console.log("joined channel")
		if (await this.service.channels.getBySlug(info.channel_slug))
			return this.sendTchatInformations(client, info.channel_slug);

		console.error(`Channel ${info.channel_slug} does not exist: creating...`)
		this.service.channels.create(
			ChannelBuilder.new()
			.setCreator(info.sender_id)
			.setSlug(info.channel_slug)
		).then(res => this.sendTchatInformations(client, info.channel_slug));
	}

	@SubscribeMessage("channel_msg")
	public async onPrivmsg(client: Socket, msg) {
		let channel = await this.service.channels.getBySlug(msg.channel_slug);
		let message = MessageBuilder.new(msg.value)
			.setSender(msg.sender_id)
			.setChannel(channel.id)
			.setType(msg.type);

		this.server.emit("channel_msg", {...msg, channel_id: channel.id});
		this.service.messages.addMessage(message);
	}*/
}

