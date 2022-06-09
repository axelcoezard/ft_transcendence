import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BlockedController from './blocked.controller';
import Blocked from './blocked.entity';
import BlockedService from './blocked.service';

@Module({
	providers: [BlockedService],
	controllers: [BlockedController],
	imports: [TypeOrmModule.forFeature([Blocked])],
	exports: [BlockedService]
})
export default class BlockedModule {}
