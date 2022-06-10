import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import Channel from './channel.entity';
import ChannelBuilder from './channel.builder';
import UserService from '../user/user.service';

@Injectable()
export default class ChannelService {
	constructor(
		@InjectRepository(Channel)
		public channelRepository: Repository<Channel>
	) {}

	@Inject(UserService)
	private readonly userService: UserService;

	async getAll(): Promise<Channel[]> {
		return await this.channelRepository.find();
	}

	async getById(id: number): Promise<Channel> {
		return await this.channelRepository.findOne({
			where: {id}
		})
	}

	async getBySlug(slug: string): Promise<Channel> {
		return await this.channelRepository.findOne({
			where: {slug}
		})
	}

	async hasUser(slug: string, id: number): Promise<boolean> {
		let rank = await this.userService.getRankFromChannelByUserId(slug, id);
		return rank && rank.length > 0;
	}

	async getUsersFromChannel(slug: string): Promise<any[]> {
		return await getManager().query(
			`SELECT
				u.*
			FROM "user" as u
				INNER JOIN "user_in_channel" as uc ON uc.user_id = u.id
				INNER JOIN "channel" as c ON c.id = uc.channel_id
			WHERE c.slug = $1;`,
			[slug]
		)
	}

	async deleteBySlug(slug: string, id: number): Promise<any> {
		let rank = await this.userService.getRankFromChannelByUserId(slug, id);
		if (!rank || rank.length == 0)	return { error: "No user found in channel" };
		if (rank[0].rank !== 'owner')			return { error: "You are not the owner" };
		return await this.channelRepository.delete({slug});
	}

	async addUsers(id: number, users: any[]): Promise<any> {
		if (users.length === 0)
			return { error: "No users provided" };
		let req = `INSERT INTO "user_in_channel" (user_id, channel_id, rank) VALUES `;
		let req_i = -3;
		let req_values = users.map((u: any) => {
			req_i += 3;
			return `(\$${req_i + 1}, \$${req_i + 2}, \$${req_i + 3})`
		});
		req += req_values.join(', ') + ";";
		let values = users.reduce((prev: any, user: any) => {
			return [...prev, user.id, id, user.rank];
		}, [])
		return await getManager().query(req, values);
	}

	async removeUser(id: number, users: any[]): Promise<any> {
		if (users.length === 0)
			return { error: "No users provided" };

		let parts = users.map((u: any, i: number) => `\$${i + 1}`).join(", ");
		let ids = users.reduce((prev: any, user: any) => [...prev, user.id], [])
		let req = `DELETE FROM "user_in_channel" WHERE user_id IN (${parts}) AND channel_id = $${users.length + 1};`;
		return await getManager().query(req, [...ids, id]);
	}

	async create(channel: ChannelBuilder): Promise<Channel> {
		const newChannel = this.channelRepository.create(channel.build());
		await this.channelRepository.save(newChannel);
		return newChannel;
	}
}

