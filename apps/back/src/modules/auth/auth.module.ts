import { Module } from "@nestjs/common";
import AvatarModule from "../avatar/avatar.module";
import UserModule from "../user/user.module";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";

@Module({
	imports: [
		UserModule,
		AvatarModule
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export default class AuthModule {}
