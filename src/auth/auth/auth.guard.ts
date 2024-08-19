import { Injectable } from '@nestjs/common';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();

    return Boolean(request.user);
  }
}
