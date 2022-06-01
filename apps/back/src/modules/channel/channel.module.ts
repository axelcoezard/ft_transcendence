import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from './channel.entity';
import ChannelService from './channel.service';
import ChannelController from './channel.controller';

@Module({
	providers: [ChannelService],
	controllers: [ChannelController],
	imports: [TypeOrmModule.forFeature([Channel])],
	exports: [ChannelService]
})
export default class ChannelModule {}
