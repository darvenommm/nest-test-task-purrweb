import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';
import { Config } from 'src/tools/config';

import type { NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import type { Repository } from 'typeorm';
import type { AccessPayload } from './auth.types';

type CanBeUndefined<T> = T | undefined;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly config: Config,
    private readonly jwtService: JwtService,
  ) {}

  public async use(request: Request, _: Response, next: NextFunction): Promise<void> {
    const accessToken: CanBeUndefined<string> = request.signedCookies['accessToken'];

    if (!accessToken) return next();

    const userId = await this.getUserIdByAccessToken(accessToken);

    if (!userId) {
      delete request.signedCookies['accessToken'];
      return next();
    }

    request.user = (await this.userRepository.findOneBy({ id: userId })) ?? undefined;
    next();
  }

  private async getUserIdByAccessToken(accessToken: string): Promise<null | string> {
    try {
      const { sub: userId }: AccessPayload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.config.secret,
      });

      return userId;
    } catch {
      return null;
    }
  }
}
