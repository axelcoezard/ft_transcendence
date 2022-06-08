import {  Get, Header, Inject, Param, ParseIntPipe, Res, StreamableFile } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import AvatarService from './avatar.service';
import Avatar from './avatar.entity';
import { getManager } from 'typeorm';

@Controller('avatars')
export default class AvatarController
{
	@Inject(AvatarService)
	private readonly service: AvatarService;

	@Get('/:id')
	@Header('Content-Type', 'image/jpeg')
	async showAvatar(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: any
	): Promise<StreamableFile> {
		const response = await getManager().query(
			`SELECT
				a.image
			FROM
				"avatar" as a
			WHERE
				a.id = $1;`,
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
}
