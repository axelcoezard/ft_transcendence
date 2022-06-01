import {  Get, Inject } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AvatarService } from 'src/services/avatar.service';
import { Avatar } from 'src/entities/avatar.entity';

@Controller('avatars')
export class AvatarController {
	@Inject(AvatarService)
	private readonly service: AvatarService;

	@Get("/")
	async getAll(): Promise<Avatar[]> {
		return await this.service.getAll();
	}
}
