import { registerAs } from '@nestjs/config';

const env = process.env;

export default registerAs('config', () => ({
  server: {
    env: env.NODE_ENV,
    port: env.PORT,
  },
  discord: {
    token: env.BOT_TOKEN,
    guildId: env.GUILD_ID,
    clientId: env.CLIENT_ID,
  },
  logger: {
    level: env.LOGGER_LEVEL,
    prettyPrint: env.LOG_PRETTY_PRINT,
  },
  swagger: {
    server: env.SWAGGER_SERVER,
    user: env.SWAGGER_USER,
    pass: env.SWAGGER_PASSWORD,
  },
}));
