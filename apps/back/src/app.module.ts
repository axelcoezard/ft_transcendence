import { Module, Controller, Get, Injectable } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import AuthModule from './auth.module';
import { AppGateway } from './app.gateway';
import UserModule from './user.module';
import { CvModule } from './cv/cv.module';

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
		CvModule,
  TypeOrmModule.forRoot({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres', 
	password: 'postgres',
	database: 'allusers',
	autoLoadEntities: true,
	entities: ["dist/**/*.entity{.ts,.js}"],
	synchronize: true
  }),
  CvModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		AppGateway
	],
})
export default class AppModule {}
