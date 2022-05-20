import { IsOptional, IsNumber, IsString, Max, Min, isString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAvatarDto {
	@IsOptional()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	uri: string;

	@IsOptional()
	@IsString()
	type: string;

}
