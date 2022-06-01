import Message from "./message.entity";

export default class MessageBuilder {

	private message: Message;

	constructor(value: string)
	{
		this.message = new Message();
		this.message.value = value;
	}

	public setSender(id: number) : MessageBuilder
	{
		this.message.sender_id = id;
		return this;
	}

	public setChannel(id: number) : MessageBuilder
	{
		this.message.channel_id = id;
		return this;
	}

	public setType(type: string) : MessageBuilder
	{
		this.message.type = type;
		return this;
	}

	public build() : Message
	{
		return this.message;
	}

	public static new(title: string)
	{
		return new MessageBuilder(title);
	}
}
