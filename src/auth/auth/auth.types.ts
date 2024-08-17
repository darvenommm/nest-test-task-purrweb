import { User } from '../entities/user.entity';

export type Tokens = { accessToken: string };
export type AccessPayload = { sub: User['id'] };
