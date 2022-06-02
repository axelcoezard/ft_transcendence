import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Invitation from './invitation.entity';
import InvitationService from './invitation.service';

@Module({
	providers: [InvitationService],
	imports: [TypeOrmModule.forFeature([Invitation])],
	exports: [InvitationService]
})
export default class InvitationModule {}
