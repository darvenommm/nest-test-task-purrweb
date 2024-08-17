import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Config } from 'src/tools/config';
import { User } from '../entities/user.entity';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import type { Repository } from 'typeorm';
import type { AccessPayload } from './auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly config: Config,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const accessToken = request.signedCookies['accessToken'] as string;

    if (!accessToken) {
      throw new UnauthorizedException('You are not authenticate in the system!');
    }

    const { sub: userId }: AccessPayload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.config.secret,
    });

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new ConflictException('Incorrect payload');

    request['user'] = user;

    return true;
  }
}
