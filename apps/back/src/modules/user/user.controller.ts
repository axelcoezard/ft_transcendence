import { Get, Inject, Controller, Param, ParseIntPipe, Res, StreamableFile, Header, Post, Body, Patch, UseInterceptors, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { getManager } from 'typeorm';
import { getBase64FromBuffer } from '../auth/auth.utils';
import { JwtAuthGuard } from '../auth/jwt.authguard';
import Avatar from '../avatar/avatar.entity';
import AvatarService from '../avatar/avatar.service';

import UserService from './user.service';

@Controller('users')
export default class UserController {

	@Inject(UserService)
	private readonly service: UserService;

	@UseGuards(JwtAuthGuard)
	@Get('/ranking')
	async showRanking(): Promise<any> {
		return await this.service.getRanking();
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id')
	async showUser(
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		return await this.service.getUser(id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:friend_id/if/:id')
	async showUserIfFriend(
		@Param('friend_id', ParseIntPipe) friend_id: number,
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		let resF = await this.service.isFriendWith(id, friend_id);
		if (resF.length >= 1)
			return {
				isFriend: true,
				value: await this.service.getUserFiltered(friend_id)
			};
		return { isFriend: false }
	}

	@UseGuards(JwtAuthGuard)
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

	@UseGuards(JwtAuthGuard)
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

	@UseGuards(JwtAuthGuard)
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

	@UseGuards(JwtAuthGuard)
	@Post('/:id/username')
	async updateUsername(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.updateUsername(id, body.username)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/:id/color/paddle')
	async updatePaddleColor(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		if (!body.color)
			return { error: "No color was provided" };
		return await this.service.updatePaddleColor(id, body.color);
	}

	@UseGuards(JwtAuthGuard)
	@Post('/:id/color/ball')
	async updateBallColor(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		if (!body.color)
			return { error: "No color was provided" };
		return await this.service.updateBallColor(id, body.color);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id/channels')
	async showUserChannels(
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		return await this.service.getUserChannels(id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id/channels/:channel_id/rank')
	async showUserRankInChannels(
		@Param('id', ParseIntPipe) id: number,
		@Param('channel_id', ParseIntPipe) channel_id: number
	): Promise<any> {
		return await this.service.getUserRankInChannel(id, channel_id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id/friends')
	async showUserFriends(
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		return await this.service.getFriends(id);
	}

	@UseGuards(JwtAuthGuard)
	@Post('/:id/friends')
	async addFriend(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.addFriend(id, body.friend_id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id/friends')
	async removeFriend(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.removeFriend(id, body.friend_id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id/blockeds')
	async showUserBlocked(
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		return await this.service.getBlockeds(id);
	}

	@UseGuards(JwtAuthGuard)
	@Post('/:id/blockeds')
	async addBlocked(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.addBlocked(id, body.blocked_id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/:id/blockeds')
	async removeBlocked(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: any
	): Promise<any> {
		return await this.service.removeBlocked(id, body.blocked_id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/:id/stats')
	async showUserStats(
		@Param('id', ParseIntPipe) id: number
	): Promise<any> {
		return await this.service.getUserStats(id);
	}
}

