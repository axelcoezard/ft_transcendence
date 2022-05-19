import { NestFactory } from '@nestjs/core';
import AppModule from './app.module'
import { Room, Server } from "colyseus";
import AppRoom from './app.room';

(async () => {
	const api = await NestFactory.create(AppModule, {
		cors: true
	})

	//const game = new Server();
	//game.define("default_room", AppRoom);
	//game.attach({server: api.getHttpServer()});

	api.listen(3030);
})();
