import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';

(async () => {
	const app = await NestFactory.create(AppModule, { cors: true });
	//app.enableCors({ origin: "*" });
	await app.listen(3030);
})();
