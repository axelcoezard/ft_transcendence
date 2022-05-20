import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Channel from 'src/entities/channel.entity';
import ChannelService from 'src/services/channel.service';
import ChannelController from 'src/controllers/channel.controller';

@Module({
	providers: [ChannelService],
	controllers: [ChannelController],
	imports: [TypeOrmModule.forFeature([Channel])],
	exports: [ChannelService]
})
export default class ChannelModule {}
