import { CacheModule, Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from '../entities/user.entity';
import { Controller } from '@nestjs/common';

@Module({
	controllers: [UserController],
	providers: [UserService],
 	imports: [TypeOrmModule.forFeature([User])],
	exports: [UserService]
})
export default class UserModule {}
