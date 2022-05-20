import { Inject, Injectable } from "@nestjs/common";
import { MessageService } from "./message.service";
import { UserService } from "./user.service";

@Injectable()
export class AppService
{
	@Inject(UserService)
	public readonly userService: UserService;

	@Inject(MessageService)
	public readonly messageService: MessageService;
}

export default AppService
