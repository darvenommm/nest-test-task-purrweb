import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth/auth.controller';
import { UsersController } from './user/user.controller';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

import { Config } from 'src/tools/config';
import { User } from './entities/user.entity';

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
  controllers: [AuthController, UsersController],
  providers: [AuthGuard, AuthService, UserService],
  exports: [AuthGuard],
})
export class AuthModule {}
