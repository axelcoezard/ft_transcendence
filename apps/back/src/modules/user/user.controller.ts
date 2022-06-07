import { Get, Inject, Controller, Param, ParseIntPipe, Res, StreamableFile, Header, Post, Body, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { getManager } from 'typeorm';
import { getBase64FromBuffer } from '../auth/auth.utils';
import Avatar from '../avatar/avatar.entity';
import AvatarService from '../avatar/avatar.service';

import UserService from './user.service';

@Controller('users')
export default class UserController {

	@Inject(UserService)
	private readonly service: UserService;

	@Get('/ranking')
	async showRanking(): Promise<any> {
		return await this.service.getRanking();
	}

	@Get('/:id')
	async showUser(
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		let response  = await this.service.getUser(id);
		return response ? {
			id: response.id,
			username: response.username,
			"42_username": response["42_username"],
			email: response.email,
			avatar_id: response.avatar_id,
			ELO_score: response.ELO_score,
			rank: response.rank,
			created_at: response.created_at,
			updated_at: response.updated_at
		} : {};
	}

	@Get("/search/:username")
	async searchUser(
		@Param('username') username: string
	): Promise<any> {
		return await this.service.searchUser(username);
	}

	@Get('/:id/avatar')
	@Header('Content-Type', 'image/jpeg')
	async showAvatar(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: any
	): Promise<StreamableFile> {
		const response = await getManager().query(
			`SELECT
				a.image
			FROM "avatar" as a
				INNER JOIN "user" as u ON u.avatar_id = a.id
			WHERE u.id = $1;`,
			[id]
		);
		if (response.length === 0)
			return res.sendStatus(404);

		const image = response[0].image;
		const file = Buffer.from(image, "base64");
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
		res.end(file)
		return new StreamableFile(file);
	}

	@Post('/:id/avatar')
	@UseInterceptors(FileInterceptor('file'))
	async updateAvatar(
		@Param('id', ParseIntPipe) id: number,
		@UploadedFile() file: any
	): Promise<any> {
		if (!file)
			return { error: "No file was uploaded" };
		let res;
		let avatar = new Avatar()
		avatar.image = await getBase64FromBuffer(file.buffer);
		res = await this.service.avatars.addAvatar(avatar);
		if (!res)
			return { error: "Error while uploading the file" };
		res = await this.service.updateAvatar(id, res.id);
		return res;
	}

	@Get('/:id/games')
	async showUserGames(
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		const response = await getManager().query(
			`SELECT
				g.user1_id,
				g.user1_score,
				g.user2_id,
				g.user2_score,
				g.updated_at
			FROM "game" as g
				INNER JOIN "user" as u ON u.id = g.user1_id OR u.id = g.user2_id
			WHERE u.id = $1
				AND g.status = $2
			ORDER BY g.updated_at DESC;`,
			[id, "ended"]
		);
		return response;
	}

	@Post('/:id/username')
	async updateUsername(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.updateUsername(id, body.username)
	}
}

