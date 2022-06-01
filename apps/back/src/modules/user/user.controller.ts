import { UserService } from './user.service';
import { Get, Inject, Controller, Param, ParseIntPipe, Res, StreamableFile, Header } from '@nestjs/common';
import { getManager } from 'typeorm';

@Controller('users')
export class UserController {
	@Inject(UserService)
	private readonly service: UserService;

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
			FROM "pong_game" as g
				INNER JOIN "user" as u ON u.id = g.user1_id OR u.id = g.user2_id
			WHERE u.id = $1
				AND g.status = $2
			ORDER BY g.updated_at DESC;`,
			[id, "ended"]
		);
		return response;
	}
}

