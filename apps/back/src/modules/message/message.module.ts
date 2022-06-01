import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from './message.entity';
import MessageService from './message.service';
import MessageController from './message.controller';

@Module({
	providers: [MessageService],
	controllers: [MessageController],
	imports: [TypeOrmModule.forFeature([Message])],
	exports: [MessageService]
})
export default class MessageModule {}
