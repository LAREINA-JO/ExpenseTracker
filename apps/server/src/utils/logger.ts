import pino from 'pino';
import config from '../config';

const logger = pino({
  level: config.LOGGER.LEVEL,
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
        }
      : undefined,
});

export default logger;
