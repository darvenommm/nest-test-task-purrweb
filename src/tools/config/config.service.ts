import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { IRawConfig, IConfig } from './config.types';

@Injectable()
export class CustomConfigService implements IConfig {
  public constructor(
    @Inject(ConfigService) private readonly configService: ConfigService<IRawConfig, true>,
  ) {}

  // server
  public get serverPort(): number {
    return this.configService.get('SERVER_PORT', { infer: true });
  }

  // database
  public get databaseHost(): string {
    return this.configService.get('DATABASE_HOST', { infer: true });
  }

  public get databasePort(): number {
    return this.configService.get('DATABASE_PORT', { infer: true });
  }

  public get databaseName(): string {
    return this.configService.get('DATABASE_NAME', { infer: true });
  }

  public get databaseUsername(): string {
    return this.configService.get('DATABASE_USERNAME', { infer: true });
  }

  public get databasePassword(): string {
    return this.configService.get('DATABASE_PASSWORD', { infer: true });
  }

  public get databaseSchema(): string {
    return this.configService.get('DATABASE_SCHEMA', { infer: true });
  }

  // secret
  public get secret(): string {
    return this.configService.get('SECRET', { infer: true });
  }
}
