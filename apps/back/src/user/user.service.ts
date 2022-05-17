import { CACHE_MANAGER, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/Add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
	@InjectRepository(User)
    private userRepository: Repository<User>,

) {}

  async getUrs(): Promise<User[]> {
      return await this.userRepository.find();
  }

  async addUrs(user: AddUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
	const newUser = await this.userRepository.preload({
		id,
		...user
	})
	return await this.userRepository.save(newUser);
}
}
