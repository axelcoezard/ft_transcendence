import Channel from "src/entities/channel.entity";

export default class ChannelBuilder {

	private channel: Channel;

	constructor()
	{
		this.channel = new Channel();
		this.channel.status = "public";
		this.channel.slug = Math
			.random()
			.toString(16)
			.substring(2,16);
	}

	public setCreator(user_id: number) : ChannelBuilder
	{
		this.channel.creator_id = user_id;
		return this;
	}

	public setSlug(slug: string)
	{
		this.channel.slug = slug;
		return this;
	}

	public setPassword(pass: string) : ChannelBuilder
	{
		this.channel.password = pass;
		this.channel.status = "private";
		return this;
	}

	public build() : Channel
	{
		return this.channel;
	}

	public static new()
	{
		return new ChannelBuilder();
	}
}
