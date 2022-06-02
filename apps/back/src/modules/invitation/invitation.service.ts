import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Invitation from './invitation.entity';
import InvitationBuilder from './invitation.builder';

@Injectable()
export default class InvitationService {
	constructor(
		@InjectRepository(Invitation)
		public repository: Repository<Invitation>,
	) {}

	async getAll(): Promise<Invitation[]>
	{
		return await this.repository.find();
	}

	async create(builder: InvitationBuilder): Promise<Invitation>
	{
		const res: Invitation = this.repository.create(builder.build());
		await this.repository.save(res);
		return res;
	}

	async update(builder: InvitationBuilder): Promise<Invitation>
	{
		const res = await this.repository.preload({
			...builder.build()
		})
		return await this.repository.save(res);
	}
}
