import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GameModule from '../game/game.module';
import InvitationController from './invitation.controller';
import Invitation from './invitation.entity';
import InvitationService from './invitation.service';

@Module({
	controllers: [InvitationController],
	providers: [InvitationService],
	imports: [GameModule, TypeOrmModule.forFeature([Invitation])],
	exports: [InvitationService]
})
export default class InvitationModule {}
