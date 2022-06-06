import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserController from './user.controller';
import UserService from './user.service';
import User from './user.entity';
import AvatarModule from '../avatar/avatar.module';

@Module({
	controllers: [UserController],
	providers: [UserService],
 	imports: [
		 AvatarModule,
		 TypeOrmModule.forFeature([User])
	],
	exports: [UserService]
})
export default class UserModule {}
