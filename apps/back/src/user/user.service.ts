import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/Add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
	@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

) {}

  async getUrs(): Promise<UserEntity[]> {
      return await this.userRepository.find();
  }

  async addUrs(user: AddUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }
  
  /*async updateCv(cv: UpdateCvDto): Promise<CvEntity> {
	const newCv = await this.cvRepository.preload({
		id,
		...cv 
	})
	
  }*/
}