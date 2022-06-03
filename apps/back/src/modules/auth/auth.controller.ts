import { Controller, Get, Param, Inject, Body, Post, Header, StreamableFile, Res, ParseIntPipe } from '@nestjs/common';
import User from '../user/user.entity';
import Avatar from '../avatar/avatar.entity';
import AuthService from './auth.service';
import { getBase64FromURI, getUserAccessToken, getUserInformations } from './auth.utils';
import { generateQrCode, generateSecret, validateCode } from './auth.twofactor';

@Controller('auth')
export default class AuthController {

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
			this.service.getUniqueID(), this.service.getSecret(),
			code, body.redirect_uri
		);
		let infos = await getUserInformations(api.access_token);
		let user = await this.service.getUser(infos.login);
		if (!user)
		{
			let avatar = new Avatar();
			avatar.image =  await getBase64FromURI(infos.image_url);
			avatar = await this.service.addAvatar(avatar);

			let req: User = new User();
			req.username = infos.login;
			req.email = infos.email;
			req.avatar_id = avatar.id;
			req["2FA_secret"] = generateSecret(api.access_token);
			user = await this.service.addUser(req);
		}

		return JSON.stringify({
			id: user.id,
			username: user.username,
			ELO_score: user.ELO_score,
			"2FA_secret": user["2FA_secret"],
			"2FA_status": user["2FA_status"],
			access_token: api.access_token,
			refresh_token: api.refresh_token
		});
	}

	@Post("/token/:token/refresh")
	async refresh(
		@Param("token") token: string
	): Promise<string> {
		return null;
	}

	@Get("/twofactor/:secret")
	@Header('Content-Type', 'image/png')
	async getQRCode(
		@Param("secret") secret: string,
		@Res() res: any
	): Promise<StreamableFile> {
		let response = await this.service.users.userRepository.findOne({
			where: { "2FA_secret": secret }
		});
		if (!response)
			return res.writeHead(404);
		const image = await generateQrCode(response.username, secret);
		const buffer = Buffer.from(image, 'base64');
		res.writeHead(200, {'Content-Type': 'image/png'});
		res.end(buffer)
		return new StreamableFile(buffer);
	}

	/*@Get("/twofactor/:secret/:code")
	async verifyCode(
		@Param("secret") secret: string,
		@Param("code", ParseIntPipe) code: number
	): Promise<string> {
		return JSON.stringify({
			status: validateCode(code, secret)
		});
	}*/

	@Post("/twofactor")
	async enable2FA(
		@Body() body: any,
	): Promise<string> {
		if (!body.secret || !body.code || !validateCode(parseInt(body.code), body.secret))
			return JSON.stringify({ status: false });
		let res = await this.service.users.userRepository.query(
			`UPDATE "user" SET "2FA_status" = $1 WHERE "2FA_secret" = $2;`,
			[true, body.secret]
		)
		return JSON.stringify({ status: true });
	}
}
