import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controller } from '@nestjs/common';
//import message
import { Message } from 'src/entities/Message';
import { MessageService } from 'src/services/message.service';
/*@Module({
	controllers: [UserController],
	providers: [UserService],
 	imports: [TypeOrmModule.forFeature([User])],
	exports: [UserService]
})
export default class UserModule {}*/

@Module({
	providers: [MessageService],
	imports: [TypeOrmModule.forFeature([Message])],
	exports: [MessageService]
})
export default class MessageModule {}