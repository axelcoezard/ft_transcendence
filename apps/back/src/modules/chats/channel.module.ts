import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from './channel.entity';
import ChannelService from './channel.service';
import ChannelController from './channel.controller';
import UserInChannel from './user_in_channel.entity';
import UserModule from '../user/user.module';

@Module({
	providers: [ChannelService],
	controllers: [ChannelController],
	imports: [
		UserModule,
		TypeOrmModule.forFeature([
			Channel,
			UserInChannel
		])
	],
	exports: [ChannelService]
})
export default class ChannelModule {}
