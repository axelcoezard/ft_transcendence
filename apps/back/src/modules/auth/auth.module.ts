import { Module } from "@nestjs/common";
import AvatarModule from "../avatar/avatar.module";
import UserModule from "../user/user.module";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	imports: [
		UserModule,
		AvatarModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '60s' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export default class AuthModule {}
