import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Message from 'src/entities/message.entity';
import MessageService from 'src/services/message.service';
import MessageController from 'src/controllers/message.controller';

@Module({
	providers: [MessageService],
	controllers: [MessageController],
	imports: [TypeOrmModule.forFeature([Message])],
	exports: [MessageService]
})
export default class MessageModule {}
