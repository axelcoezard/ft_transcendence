import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AvatarController from './avatar.controller';
import Avatar from './avatar.entity';
import AvatarService from './avatar.service';

@Module({
	providers: [AvatarService],
	controllers: [AvatarController],
	imports: [TypeOrmModule.forFeature([Avatar])],
	exports: [AvatarService]
})
export default class AvatarModule {}
