import { Body, Controller, HttpCode, HttpStatus, Post, Response } from '@nestjs/common';

import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

import type { Response as ExpressResponse } from 'express';
import type { Tokens } from './auth.types';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Response({ passthrough: true }) response: ExpressResponse,
    @Body() registerDTO: RegisterDTO,
  ) {
    const tokens = await this.authService.register(registerDTO);
    this.setTokensIntoCookies(response, tokens);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(
    @Response({ passthrough: true }) response: ExpressResponse,
    @Body() loginDTO: LoginDTO,
  ) {
    const tokens = await this.authService.login(loginDTO);
    this.setTokensIntoCookies(response, tokens);
  }

  private setTokensIntoCookies(response: ExpressResponse, { accessToken }: Tokens): void {
    response.cookie('accessToken', accessToken, { httpOnly: true, signed: true });
  }
}
