import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Game from './game.entity';
import GameBuilder from './game.builder';
import InvitationService from '../invitation/invitation.service';

@Injectable()
export default class GameService {
	constructor(
		@InjectRepository(Game)
		public repository: Repository<Game>,
	) {}

	async getAll(): Promise<Game[]>
	{
		return await this.repository.find();
	}

	async getBySlug(slug: string): Promise<Game>
	{
		return await this.repository.findOne({
			where: {slug}
		});
	}

	async create(builder: GameBuilder): Promise<Game>
	{
		const res = this.repository.create(builder.build());
		await this.repository.save(res);
		return res;
	}

	async update(builder: GameBuilder): Promise<Game>
	{
		const res = await this.repository.preload({
			...builder.build()
		})
		return await this.repository.save(res);
	}

	async cleanUp(): Promise<void>
	{
		await this.repository.query(`
			DELETE FROM "game"
			WHERE status = 'waiting'
				OR status = 'starting'
				OR status = 'started';
		`);
	}
}
