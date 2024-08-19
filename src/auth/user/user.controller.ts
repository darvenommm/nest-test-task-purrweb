import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { UpdateDTO } from './dto/update.dto';

import type { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async getONe(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.getOne(id);
  }

  @Get()
  public async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  // create with AuthController

  @UseGuards(AuthGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDTO: UpdateDTO,
  ): Promise<void> {
    return this.userService.update(id, updateDTO);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.userService.delete(id);
  }
}
