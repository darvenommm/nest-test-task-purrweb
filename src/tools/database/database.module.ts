import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '../config';

import type { IConfig } from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: IConfig) => ({
        type: 'postgres',
        host: config.databaseHost,
        port: config.databasePort,
        username: config.databaseUsername,
        password: config.databasePassword,
        database: config.databaseName,
        schema: config.databaseSchema,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: 'advanced-console',
      }),
      inject: [Config],
    }),
  ],
})
export class DatabaseModule {}
