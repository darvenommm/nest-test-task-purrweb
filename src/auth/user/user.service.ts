import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';

import type { Repository } from 'typeorm';

@Injectable()
export class UserService {
  public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
