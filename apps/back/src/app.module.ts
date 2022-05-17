import { Module, Controller, Get, Injectable } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppGateway } from './app.gateway';
import AuthRoute from './auth.module';
import UserRoute from './user.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Injectable()
class AppService
{
	getHello(): string {
		return 'Hello World!';
	}
}

@Controller()
class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}

@Module({
	imports: [
		AuthRoute,
		RouterModule.register([
			{
				path: 'auth',
				module: AuthRoute,
			},
			{
				path: 'user',
				module: UserRoute,
			},
		]),
		UserModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'postgres',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'transcendence',
			autoLoadEntities: true,
			entities: ["dist/**/*.entity{.ts,.js}"],
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
