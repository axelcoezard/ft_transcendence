import { Module, Controller, Get, Injectable } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import AuthModule from './auth.module';
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
		AuthModule,
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
	providers: [AppService],
})
export default class AppModule {}
