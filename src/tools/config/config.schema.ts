import { IsInt, Min, Max, IsIP, IsString } from 'class-validator';

import type { IRawConfig } from './config.types';

export class ConfigSchema implements IRawConfig {
  @IsInt()
  @Min(0)
  @Max(65535)
  SERVER_PORT: number;

  @IsIP()
  DATABASE_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_SCHEMA: string;

  @IsString()
  SECRET: string;
}
