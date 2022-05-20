import { Module, Controller, Get, Injectable, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppGateway } from '../app.gateway';

import AuthModule from './auth.module';
import UserModule from './user.module';
import MessageModule from './message.module';
import AppService from '../services/app.service';
import ChannelModule from './channel.module';

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
