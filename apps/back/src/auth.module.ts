import { Module, Controller, Get, Injectable } from '@nestjs/common';
import 'dotenv/config'

@Injectable()
class AuthService
{
	getUniqueID(): string { return process.env.API_UID; }
	getSecret(): string { return process.env.API_SECRET; }
}

@Controller()
class AuthController {
	constructor(private readonly service: AuthService) {}

	@Get()
	getHello(): string {
		return JSON.stringify({
			uid: this.service.getUniqueID(),
		});
	}
}

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [AuthService],
})
export default class AuthModule {}
