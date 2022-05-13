import { Module, Controller, Get, Injectable } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import AuthModule from './auth.module';
import { AppGateway } from './app.gateway';
import UserModule from './user.module';

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
		RouterModule.register([
			{
				path: 'auth',
				module: AuthModule,
			},
			{
				path: 'user',
				module: UserModule,
			},
		]),
	],
	controllers: [AppController],
	providers: [
		AppService,
		AppGateway
	],
})
export default class AppModule {}
