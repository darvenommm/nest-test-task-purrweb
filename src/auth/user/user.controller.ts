import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

import type { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  public constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  public async getUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
