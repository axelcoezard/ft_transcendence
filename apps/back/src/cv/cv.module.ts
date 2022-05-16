import { CacheModule, Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Controller } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

@Module({
	controllers: [CvController],
	providers: [CvService],
 	imports: [
		TypeOrmModule.forFeature([CvEntity])
	 ]
})
export class CvModule {}