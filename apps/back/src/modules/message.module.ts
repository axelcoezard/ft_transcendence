import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controller } from '@nestjs/common';
import { Message } from 'src/entities/message.entity';
import { MessageService } from 'src/services/message.service';

@Module({
	providers: [MessageService],
	imports: [TypeOrmModule.forFeature([Message])],
	exports: [MessageService]
})
export default class MessageModule {}
