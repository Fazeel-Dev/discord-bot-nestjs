export const NODE_ENVIRONMENT = {
  LOCAL: 'local',
  DEVELOPMENT: 'develop',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

export const API_PREFIX = '/api';

export const NODE_ENVIRONMENTS = Object.values(NODE_ENVIRONMENT);

export const LOGGER_LEVELS = ['log', 'error', 'warn', 'debug'];

export const LOCALHOST = '0.0.0.0';

export const MAX_JSON_REQUEST_SIZE = 10485760;

export const FASTIFY_ERR_BODY_TOO_LARGE = 'FST_ERR_BODY_TOO_LARGE';

export const PUBLIC_METADATA = 'isPublic';

export const JWT_ALGORITHM = 'HS512';

export const JWT_STRATEGY = { DEFAULT: 'jwt', REFRESH: 'jwt-refresh' };

export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM_URL_ENCODED: 'application/x-www-form-urlencoded',
};

export const COMMAND_KEY = 'commands';
