import { Socket } from "socket.io";
import MessageBuilder from "src/builder/message.builder";
import { FindAndModifyWriteOpResultObject, getManager } from "typeorm";
import Player from "./Player";
import Room from "./Room";

export default class ChatRoom extends Room {

	private msgs: any[];

	constructor(id: number, slug: string) {
		super(id, slug);

		this.getMessages().then((messages: any[]) => {
			this.msgs = messages;
		});
	}

	public onCreate() {
		this.onMessage("msg", async (player: Player, data: any) => {
			this.cacheMessage(data, player)

			this.users.forEach((p: Player) => {
				p.socket.emit("chat.msg", this.msgs);
			});

			this.addMessage(data, player);
		})
	}

	public onJoin(player: Player) {
		this.users.push(player);
		player.socket.emit("chat.msg", this.msgs);
		console.log(`${player.username} joined ${this.slug} chat`);
	}

	public onLeave(player: Player) {
		this.users = this.users.filter((e: Player) => e.id !== player.id);
		console.log(`${player.username} leaved ${this.slug} chat`);
	}

	public async cacheMessage(data: any, player: Player) {
		this.msgs.unshift({
			id: -1,
			sender_id: player.id,
			sender_username: player.username,
			channel_id: this.id,
			channel_slug: this.slug,
			type: "text",
			value: data.value,
			created_at: new Date(),
			updated_at: new Date()
		})
	}

	public async addMessage(data: any, player: Player) {
		this.service.messages.addMessage(MessageBuilder
			.new(data.value)
			.setChannel(this.id)
			.setSender(player.id)
			.setType("chat")
		)
	}

	public async getMessages() {
		let messages = await getManager().query(
			`SELECT
				m.id,
				m.sender_id,
				u.username as sender_username,
				c.id as channel_id,
				c.slug as channel_slug,
				m.type,
				m.value,
				m.created_at,
				m.updated_at
			FROM "message" as m
				INNER JOIN "channel" as c ON c.id = m.channel_id
				INNER JOIN "user" as u ON u.id = m.sender_id
			WHERE c.slug = $1
			ORDER BY m.created_at DESC;`,
			[this.slug]
		);
		return messages;
	}
}

