import { Inject, Injectable } from "@nestjs/common";
import { AvatarService } from "./avatar.service";
import ChannelService from "./channel.service";
import MessageService from "./message.service";
import { PongGameService } from "./pong_game.service";
import { UserService } from "./user.service";

@Injectable()
export class AppService
{
	@Inject(UserService)
	public readonly users: UserService;

	@Inject(MessageService)
	public readonly messages: MessageService;

	@Inject(ChannelService)
	public readonly channels: ChannelService;

	@Inject(PongGameService)
	public readonly games: PongGameService;

	@Inject(AvatarService)
	public readonly avatars: AvatarService;
}

export default AppService
