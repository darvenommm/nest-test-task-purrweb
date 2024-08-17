import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { ConfigSchema } from './config.schema';

export const validateConfiguration = (
  notValidatedConfig: Record<string, unknown>,
): ConfigSchema => {
  const validatedConfig = plainToInstance(ConfigSchema, notValidatedConfig, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new TypeError('Error in validation the environment variables');
  }

  return validatedConfig;
};
