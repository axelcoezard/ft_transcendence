import { Module, Controller, Get, Injectable, Param, Inject, UseInterceptors, Body, Post } from '@nestjs/common';
import 'dotenv/config'
import fetch from 'node-fetch';
import { User } from '../user/user.entity';
import UserModule from '../user/user.module';
import { UserService } from '../user/user.service';
import { Avatar } from '../avatar/avatar.entity';
import { AvatarService } from '../avatar/avatar.service';
import AvatarModule from '../avatar/avatar.module';

@Injectable()
class AuthService
{
	@Inject(UserService)
	public readonly userService: UserService;

	@Inject(AvatarService)
	public readonly avatarService: AvatarService;

	getUniqueID(): string { return process.env.API_UID; }
	getSecret(): string { return process.env.API_SECRET; }
	getRedirectURI(): string { return process.env.API_REDIRECT_URI; }

	async getUser(username: string): Promise<User> {
		return await this.userService.userRepository.findOne({
			where: {username}
		})
	}

	async addUser(user: User) {
		return await this.userService.userRepository.save(user);
	}

	async getAvatar(id: number): Promise<Avatar> {
		return await this.avatarService.avatarRepository.findOne({
			where: {id}
		})
	}

	async addAvatar(avatar: Avatar)
	{
		return await this.avatarService.avatarRepository.save(avatar);
	}
}

const getUserAccessToken = async (uid: string, secret: string, code: string, redirect_uri: string): Promise<any> => {
	let request = await fetch("https://api.intra.42.fr/oauth/token", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			grant_type: "authorization_code",
			client_id: uid,
			client_secret: secret,
			code: code,
			redirect_uri
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

const getBase64FromURI = async (uri: string): Promise<string> => {
	const data = await fetch(uri);
	const buffer = await data.buffer();
	return buffer.toString('base64');
}

@Controller('auth')
class AuthController {

	@Inject(AuthService)
	private readonly service: AuthService;

	@Post("/authorize")
	authorize(
		@Body() body: any
	): string {
		let url: URL = new URL("https://api.intra.42.fr/oauth/authorize");
			url.searchParams.append("client_id", this.service.getUniqueID());
			url.searchParams.append("redirect_uri", body.redirect_uri);
			url.searchParams.append("response_type", "code");
		return JSON.stringify({url: url.toString()});
	}

	@Post("/token/:code")
	async login(
		@Param("code") code: string,
		@Body() body: any
	): Promise<string> {
		let api = await getUserAccessToken(
			this.service.getUniqueID(),
			this.service.getSecret(),
			code,
			body.redirect_uri
		);
		console.log(body.redirect_uri)
		let infos = await getUserInformations(api.access_token);
		let user = await this.service.getUser(infos.login);
		if (!user)
		{
			let avatar = new Avatar();
			avatar.title = infos.login;
			avatar.image =  await getBase64FromURI(infos.image_url);
			avatar = await this.service.addAvatar(avatar);

			let req = new User();
			req.username = infos.login;
			req.email = infos.email;
			req.avatar_id = avatar.id;
			user = await this.service.addUser(req);
		}

		let avatar = await this.service.getAvatar(user.avatar_id);

		return JSON.stringify({
			id: user.id,
			username: user.username,
			email: user.email,
			avatar: `data:image/jpeg;base64,${avatar.image}`,
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
	imports: [UserModule, AvatarModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export default class AuthModule {}
