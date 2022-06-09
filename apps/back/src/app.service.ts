import { Inject, Injectable } from "@nestjs/common";
import AvatarService from "./modules/avatar/avatar.service";
import ChannelService from "./modules/chats/channel.service";
import MessageService from "./modules/message/message.service";
import GameService from "./modules/game/game.service";
import UserService from "./modules/user/user.service";
import InvitationService from "./modules/invitation/invitation.service";
import BlockedService from "./modules/blocked/blocked.service";
import FriendService from "./modules/friend/friend.service";

@Injectable()
export class AppService
{
	@Inject(UserService)
	public readonly users: UserService;

	@Inject(MessageService)
	public readonly messages: MessageService;

	@Inject(ChannelService)
	public readonly channels: ChannelService;

	@Inject(GameService)
	public readonly games: GameService;

	@Inject(AvatarService)
	public readonly avatars: AvatarService;

	@Inject(InvitationService)
	public readonly invitations: InvitationService;

	@Inject(FriendService)
	public readonly friends: FriendService;

	@Inject(BlockedService)
	public readonly blocked: BlockedService;
}

export default AppService
