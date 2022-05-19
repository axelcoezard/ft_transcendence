import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controller } from '@nestjs/common';
import { Avatar } from 'src/entities/Avatar';
import { AvatarService } from 'src/services/avatar.service';
@Module({
	providers: [AvatarService],
	imports: [TypeOrmModule.forFeature([Avatar])],
	exports: [AvatarService]
})
export default class AvatarModule {}