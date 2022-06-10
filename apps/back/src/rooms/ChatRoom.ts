import { callbackify } from "util";
import MessageBuilder from "../modules/message/message.builder";
import Player from "./Player";
import Room from "./Room";

export default class ChatRoom extends Room {

	public status: string;

	constructor(id: number, slug: string) {
		super(id, slug);
	}

	public onCreate() {
		this.onMessage("msg", async (player: Player, data: any) => {
			this.addMessage(data, player, () => {
				this.users.forEach((p: Player) => {
					p.socket.emit("chat.msg", data);
				});
			});
		})
	}

	public async onJoin(player: Player) {
		this.users.push(player);
		if (this.status === "public"
			&& !(await this.service.channels.hasUser(this.slug, player.id)))
			this.service.channels.addUsers(this.id, [{
				id: player.id,
				rank: "member"
			}])
		console.log(`${player.username} joined ${this.slug} chat`);
	}

	public onLeave(player: Player) {
		this.users = this.users.filter((e: Player) => e.id !== player.id);
		console.log(`${player.username} leaved ${this.slug} chat`);
	}

	public async addMessage(data: any, player: Player, callback: Function) {
		this.service.messages.addMessage(MessageBuilder
			.new(data.value)
			.setChannel(this.id)
			.setSender(data.sender_id)
			.setType(data.type)
		).then((msg: any) => callback())
	}
}

