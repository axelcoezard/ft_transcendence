import { CacheModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Controller } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

@Module({
	controllers: [UserController],
	providers: [UserService],
 	imports: [
		TypeOrmModule.forFeature([UserEntity])
	 ]
})
export class UserModule {}