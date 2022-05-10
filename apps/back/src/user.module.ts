import { Module, Controller, Get, Injectable, Param } from '@nestjs/common';
import 'dotenv/config'
import fetch from 'node-fetch';

@Injectable()
class UserService
{
	getUniqueID(): string { return process.env.API_UID; }
	getSecret(): string { return process.env.API_SECRET; }
	getRedirectURI(): string { return process.env.API_REDIRECT_URI; }
}

@Controller()
class UserController {
	constructor(private readonly service: UserService) {}

	@Get("/:token")
	async login(@Param("token") token: string): Promise<string> {
		let request = await fetch("https://api.intra.42.fr/v2/me", {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify({
				client_id: this.service.getUniqueID(),
				client_secret: this.service.getSecret()
			})
		})
		let response = await request.json();
		return JSON.stringify(response);
	}
}

@Module({
	imports: [],
	controllers: [UserController],
	providers: [UserService],
})
export default class UserModule {}
