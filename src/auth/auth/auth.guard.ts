import { Injectable } from '@nestjs/common';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';

type CanBeUndefined<T> = T | undefined;

@Injectable()
export class AuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    const id: CanBeUndefined<string> = request.params.userId;

    return Boolean(id && request.user && request.user.id === id);
  }
}
