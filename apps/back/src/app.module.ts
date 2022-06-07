import { Module, Controller, Get, Injectable, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppGateway } from './app.gateway';

import AuthModule from './modules/auth/auth.module';
import UserModule from './modules/user/user.module';
import MessageModule from './modules/message/message.module';
import AppService from './app.service';
import ChannelModule from './modules/chats/channel.module';
import PongGameModule from './modules/game/game.module';
import AvatarModule from './modules/avatar/avatar.module';
import InvitationModule from './modules/invitation/invitation.module';

@Controller()
class AppController
{
	@Inject(AppService)
	private readonly service: AppService;
}

@Module({
	imports: [
		AuthModule,
		UserModule,
		MessageModule,
		ChannelModule,
		PongGameModule,
		AvatarModule,
		InvitationModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'postgres',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'transcendence',
			autoLoadEntities: true,
			entities: [
				"dist/entities/*.entity.js"
			],
			synchronize: true
		})
	],
	controllers: [AppController],
	providers: [
		AppService,
		AppGateway
	],
	exports: [AppService]
})
export default class AppModule {}
