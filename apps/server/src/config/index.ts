import loadEnv from './load-env';

loadEnv();

const config = {
  SERVER: {
    HOST: process.env.HOST ?? 'localhost',
    PORT: parseInt(process.env.PORT ?? '3000'),
  },
  LOGGER: {
    LEVEL: process.env.LOGGER_LEVEL ?? 'info',
  },
  ACCESS_TOKEN: {
    SECRET: process.env.ACCESS_TOKEN_SECRET!,
    EXPIRES_IN: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN!),
  },
  REFRESH_TOKEN: {
    SECRET: process.env.REFRESH_TOKEN_SECRET!,
    EXPIRES_IN: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN!),
  },
} as const;

export default config;
