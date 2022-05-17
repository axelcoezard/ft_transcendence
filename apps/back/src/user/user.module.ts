import { CacheModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './user.entity';
import { Controller } from '@nestjs/common';

@Module({
	controllers: [UserController],
	providers: [UserService],
 	imports: [TypeOrmModule.forFeature([User])],
	exports: [UserService]
})
export default class UserModule {}
