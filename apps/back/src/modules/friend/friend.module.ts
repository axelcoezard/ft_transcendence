import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import FriendController from './friend.controller';
import Friend from './friend.entity';
import FriendService from './friend.service';

@Module({
	providers: [FriendService],
	controllers: [FriendController],
	imports: [TypeOrmModule.forFeature([Friend])],
	exports: [FriendService]
})
export default class FriendModule {}
