import { Module } from '@nestjs/common';

import { ConfigModule } from './tools/config';
import { DatabaseModule } from './tools/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
