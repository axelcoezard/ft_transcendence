import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameService from 'src/modules/game/game.service';
import InvitationModule from '../invitation/invitation.module';
import InvitationService from '../invitation/invitation.service';
import GameController from './game.controller';
import Game from './game.entity';

@Module({
	controllers: [GameController],
	providers: [GameService],
	imports: [
		TypeOrmModule.forFeature([Game])
	],
	exports: [GameService]
})
export default class GameModule {}
