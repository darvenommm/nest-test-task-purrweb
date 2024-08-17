export type IRawConfig = Readonly<{
  SERVER_PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  SECRET: string;
  SALT_ROUNDS: number;
}>;

export type IConfig = Readonly<{
  serverPort: number;
  databaseHost: string;
  databasePort: number;
  databaseName: string;
  databaseUsername: string;
  databasePassword: string;
  secret: string;
  saltRounds: number;
}>;
