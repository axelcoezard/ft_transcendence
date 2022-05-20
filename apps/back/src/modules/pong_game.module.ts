import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PongGameService } from 'src/services/pong_game.service';
import { PongGame } from 'src/entities/pong_game.entity';

@Module({
	providers: [PongGameService],
	imports: [TypeOrmModule.forFeature([PongGame])],
	exports: [PongGameService]
})
export default class PongGameModule {}
