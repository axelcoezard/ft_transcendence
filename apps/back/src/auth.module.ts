import { Module, Controller, Get, Injectable, Param, Inject, UseInterceptors } from '@nestjs/common';
import 'dotenv/config'
import fetch from 'node-fetch';
import { User } from './entities/user.entity';
import UserModule from './modules/user.module';
import { UserService } from './services/user.service';

@Injectable()
class AuthService
{
	@Inject(UserService)
	public readonly userService: UserService;

	getUniqueID(): string { return process.env.API_UID; }
	getSecret(): string { return process.env.API_SECRET; }
	getRedirectURI(): string { return process.env.API_REDIRECT_URI; }

	async getUser(username: string): Promise<User> {
		return await this.userService.userRepository.findOne({
			where: {username}
		})
	}

	async addUser(user: User) {
		this.userService.userRepository.save(user);
	}
}

const getUserAccessToken = async (uid: string, secret: string, code: string): Promise<any> => {
	let request = await fetch("https://api.intra.42.fr/oauth/token", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			grant_type: "authorization_code",
			client_id: uid,
			client_secret: secret,
			code: code,
			redirect_uri: "http://localhost:3000"
		})
	})
	return await request.json();
}

const getUserInformations = async (access_token: string): Promise<any> => {
	let request = await fetch("https://api.intra.42.fr/v2/me", {
		method: "GET",
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json'
		}
	})
	return await request.json();
}

@Controller('auth')
class AuthController {

	@Inject(AuthService)
	private readonly service: AuthService;

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
		let api = await getUserAccessToken(
			this.service.getUniqueID(),
			this.service.getSecret(), code
		);
		let infos = await getUserInformations(api.access_token);
		let user = await this.service.getUser(infos.login);
		if (!user)
		{
			user = new User();
			user.username = infos.login;
			user.email = infos.email;
			this.service.addUser(user);
		}

		return JSON.stringify({
			id: user.id,
			username: user.username,
			email: user.email,
			"2FA_status": user["2FA_status"],
			"2FA_secret": user["2FA_secret"],
			ELO_score: user.ELO_score,
			rank: user.rank,
			access_token: api.access_token,
			refresh_token: api.refresh_token
		});
	}
}

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export default class AuthModule {}
