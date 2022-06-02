import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameService from 'src/modules/game/game.service';
import Game from './game.entity';

@Module({
	providers: [GameService],
	imports: [TypeOrmModule.forFeature([Game])],
	exports: [GameService]
})
export default class GameModule {}
