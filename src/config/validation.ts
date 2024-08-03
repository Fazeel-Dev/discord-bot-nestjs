import * as Joi from 'joi';
import * as K from 'src/common/constants';

export default Joi.object({
  BOT_TOKEN: Joi.string().required(),
  GUILD_ID: Joi.string().required(),
  CHANNEL_ID: Joi.string(),
  CLIENT_ID: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid(...K.NODE_ENVIRONMENTS)
    .default(K.NODE_ENVIRONMENTS[0]),
  PORT: Joi.number().required(),
  LOGGER_LEVEL: Joi.string()
    .valid(...K.LOGGER_LEVELS)
    .default(K.LOGGER_LEVELS[0]),
  LOG_PRETTY_PRINT: Joi.string().default('false'),
  SWAGGER_SERVER: Joi.string().default('false'),
  SWAGGER_USER: Joi.string().required(),
  SWAGGER_PASSWORD: Joi.string().required(),
});
