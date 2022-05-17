import { Module, Controller, Get, Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RouterModule } from '@nestjs/core';
import { AppGateway } from './app.gateway';

import AuthModule from './auth.module';
import UserModule from './user/user.module';

@Injectable()
class AppService
{

}

@Controller()
class AppController {
	constructor(private readonly appService: AppService) {}
}

@Module({
	imports: [
		AuthModule,
		UserModule,
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
