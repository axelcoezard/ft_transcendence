import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import Tchat from './tchat';

(async () => {
	const app = await NestFactory.create(AppModule, { cors: true });

	const tchat = new Tchat(app);

	await app.listen(3030);
})();
