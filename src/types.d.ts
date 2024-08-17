import * as _express from 'express';

import type { User } from './auth/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
