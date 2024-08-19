import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserHelper } from './user.helper';
import { Config } from 'src/tools/config';
import { User } from '../entities/user.entity';
import { UpdateDTO } from './dto/update.dto';

import type { Repository } from 'typeorm';

@Injectable()
export class UserService {
  public constructor(
    private readonly config: Config,
    private readonly userHelper: UserHelper,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async getOne(id: string): Promise<User> {
    return await this.userHelper.getUser(id);
  }

  public async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async update(id: string, { email, password }: UpdateDTO): Promise<void> {
    const user = await this.userHelper.getUser(id);

    const hashedPassword =
      password ? await bcrypt.hash(password, this.config.saltRounds) : user.hashedPassword;

    await this.userRepository.update(id, { email: email ?? user.email, hashedPassword });
  }

  public async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
