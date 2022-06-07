import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from './channel.entity';
import ChannelService from './channel.service';
import ChannelController from './channel.controller';
import UserInChannel from './user_in_channel.entity';

@Module({
	providers: [ChannelService],
	controllers: [ChannelController],
	imports: [
		TypeOrmModule.forFeature([
			Channel,
			UserInChannel
		])
	],
	exports: [ChannelService]
})
export default class ChannelModule {}
