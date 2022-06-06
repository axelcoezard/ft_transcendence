import { Get, Inject, Controller, Param, ParseIntPipe, Res, StreamableFile, Header } from '@nestjs/common';
import { getManager } from 'typeorm';

import UserService from './user.service';

@Controller('users')
export default class UserController {

	@Inject(UserService)
	private readonly service: UserService;

	@Get('/:id')
	async getUser(
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		let response  = await this.service.getUser(id);
		return response ? {
			id: response.id,
			username: response.username,
			email: response.email,
			avatar_id: response.avatar_id,
			ELO_score: response.ELO_score,
			rank: response.rank,
			created_at: response.created_at,
			updated_at: response.updated_at
		} : {};
	}

	@Get('/:id/avatar')
	@Header('Content-Type', 'image/jpeg')
	async updateUser(
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

	@Get('/:id/games')
	async getUserGames(
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
}

