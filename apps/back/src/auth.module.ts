import { Module, Controller, Get, Injectable, Param } from '@nestjs/common';
import 'dotenv/config'
import fetch from 'node-fetch';

@Injectable()
class AuthService
{
	getUniqueID(): string { return process.env.API_UID; }
	getSecret(): string { return process.env.API_SECRET; }
	getRedirectURI(): string { return process.env.API_REDIRECT_URI; }
}

@Controller()
class AuthController {
	constructor(private readonly service: AuthService) {}

	@Get("/authorize")
	authorize(req: any): string {
		let url: URL = new URL("https://api.intra.42.fr/oauth/authorize");
			url.searchParams.append("client_id", this.service.getUniqueID());
			url.searchParams.append("redirect_uri", this.service.getRedirectURI());
			url.searchParams.append("response_type", "code");
		return JSON.stringify({url: url.toString()});
	}

	@Get("/token/:code")
	async login(@Param("code") code: string): Promise<string> {
		let request = await fetch("https://api.intra.42.fr/oauth/token", {
			method: "POST",
			body: JSON.stringify({
				grant_type: "authorization_code",
				client_id: this.service.getUniqueID(),
				client_secret: this.service.getSecret(),
				code: code,
				redirect_uri: this.service.getRedirectURI()
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
		let response = await request.json();
		return JSON.stringify(response);
	}
}

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [AuthService],
})
export default class AuthModule {}
