import MessageBuilder from "../modules/message/message.builder";
import Player from "./Player";
import Room from "./Room";

export default class ChatRoom extends Room {

	msgs: any[] = [];

	constructor(id: number, slug: string) {
		super(id, slug);
	}

	public onCreate() {
		this.onMessage("msg", async (player: Player, data: any) => {
			this.users.forEach((p: Player) => {
				p.socket.emit("chat.msg", data);
			});
			this.addMessage(data, player);
		})
	}

	public async onJoin(player: Player) {
		this.users.push(player);
		console.log(`${player.username} joined ${this.slug} chat`);
	}

	public onLeave(player: Player) {
		this.users = this.users.filter((e: Player) => e.id !== player.id);
		console.log(`${player.username} leaved ${this.slug} chat`);
	}

	public async addMessage(data: any, player: Player) {
		this.service.messages.addMessage(MessageBuilder
			.new(data.value)
			.setChannel(this.id)
			.setSender(data.sender_id)
			.setType(data.type)
		)
	}
}

