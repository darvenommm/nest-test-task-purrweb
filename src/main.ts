import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { Config } from './tools/config';

const bootstrap = async (): Promise<void> => {
  const application = await NestFactory.create(AppModule);

  const config = application.get(Config);
  application.use(cookieParser(config.secret));

  await application.listen(config.serverPort);
};

bootstrap();
