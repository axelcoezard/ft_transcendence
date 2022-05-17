import { IsOptional, IsNumber, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	username: string;

	@IsOptional()
	@IsString()
	email: string;

	@IsOptional()
	@Type(() => Number )
	@IsNumber()
	avatar_id: number;

	@IsOptional()
	@Type(() => Number )
	@IsNumber()
	rank: number;

	@IsOptional()
	@IsString()
	status: string;

	@IsOptional()
	@IsNumber()
	"2FA_status": boolean;

	@IsOptional()
	@IsNumber()
	"2FA_secret": boolean;

	@IsOptional()
	@Type(() => Number )
	@IsNumber()
	ELO_score: number;

	// join column ?
}
