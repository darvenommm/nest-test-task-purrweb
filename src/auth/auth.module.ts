import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

import { Config } from 'src/tools/config';
import { User } from './entities/user.entity';

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserHelper } from './user/user.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: Config) => ({
        secret: config.secret,
        signOptions: {
          expiresIn: '1 day',
        },
      }),
      inject: [Config],
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthMiddleware, AuthGuard, AuthService, UserService, UserHelper],
  exports: [AuthGuard],
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
