import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from 'src/entities/avatar.entity';
import { AvatarService } from 'src/services/avatar.service';

@Module({
	providers: [AvatarService],
	imports: [TypeOrmModule.forFeature([Avatar])],
	exports: [AvatarService]
})
export default class AvatarModule {}
