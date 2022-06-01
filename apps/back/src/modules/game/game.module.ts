import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PongGameService } from 'src/modules/game/game.service';
import { PongGame } from './game.entity';

@Module({
	providers: [PongGameService],
	imports: [TypeOrmModule.forFeature([PongGame])],
	exports: [PongGameService]
})
export default class PongGameModule {}
