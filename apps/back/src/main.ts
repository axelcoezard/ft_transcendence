import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';

(async () => (await NestFactory.create(AppModule, {
	cors: true
})).listen(3030))();
