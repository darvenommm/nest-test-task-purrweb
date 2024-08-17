import { Injectable, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Config } from 'src/tools/config';
import { User } from '../entities/user.entity';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

import type { Repository } from 'typeorm';
import type { Tokens, AccessPayload } from './auth.types';

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: Config,
  ) {}

  public async register({ email, password }: RegisterDTO): Promise<Tokens> {
    if (await this.userRepository.existsBy({ email })) {
      throw new ConflictException('There is a user with this email in the system!');
    }

    const hashedPassword = await bcrypt.hash(password, this.config.saltRounds);
    const createdUser = await this.userRepository.save({ email, hashedPassword });
    const accessToken = await this.jwtService.signAsync({
      sub: createdUser.id,
    } satisfies AccessPayload);

    return { accessToken };
  }

  public async login({ email, password }: LoginDTO): Promise<Tokens> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new ConflictException('There is not a user with this email in the system!');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!isCorrectPassword) {
      throw new UnprocessableEntityException('Incorrect password');
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id });

    return { accessToken };
  }
}
