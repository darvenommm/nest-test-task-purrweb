import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';

import type { Repository } from 'typeorm';

@Injectable()
export class UserHelper {
  public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new ConflictException('Not found user by the received id');
    }

    return user;
  }
}
