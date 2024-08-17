import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateConfiguration } from './config.validator';
import { CustomConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true, cache: true, validate: validateConfiguration }),
  ],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
