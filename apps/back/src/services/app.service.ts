import { Inject, Injectable } from "@nestjs/common";
import ChannelService from "./channel.service";
import MessageService from "./message.service";
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
}

export default AppService
