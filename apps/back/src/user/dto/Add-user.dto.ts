import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AddUserDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Type(() => Number )
  @IsNumber()
  avatar_id: number;

  @IsNotEmpty()
  @Type(() => Number )
  @IsNumber()
  rank: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber
  "2FA_status": boolean;

  @IsNotEmpty()
  @IsNumber
  "2FA_secret": boolean;

  @IsNotEmpty()
  @Type(() => Number )
  @IsNumber()
  ELO_score: number;

  // join column ?
}