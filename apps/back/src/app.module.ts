import { Module, Controller, Get, Injectable, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RouterModule } from '@nestjs/core';
import { AppGateway } from './app.gateway';

import AuthModule from './auth.module';
import UserModule from './modules/user.module';
import MessageModule from './modules/message.module';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';

@Injectable()
class AppService
{
	@Inject(UserService)
	public readonly userService: UserService;

	@Inject(MessageService)
	public readonly messageService: MessageService;
}

@Controller()
class AppController {
	constructor(private readonly appService: AppService) {}
}

@Module({
	imports: [
		AuthModule,
		UserModule,
		MessageModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'postgres',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'transcendence',
			autoLoadEntities: true,
			entities: ["dist/user/user.entity.js"],
			synchronize: true
		})
	],
	controllers: [AppController],
	providers: [
		AppService,
		AppGateway
	],
})
export default class AppModule {}
