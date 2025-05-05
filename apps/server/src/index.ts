import http from 'node:http';
import cors from 'cors';
import i18next from '@/I18n';
import config from './config';
import logger from './utils/logger';
import ExpressApp, { RegisteredRouter } from './ExpressApp';
import expressI18next from './middlewares/express-I18next';
import authRouter from './modules/auth/router';
import usersRouter from './modules/users/router';
import accountsRouter from './modules/accounts/router';
import categoriesRouter from './modules/categories/router';
import transactionsRouter from './modules/transactions/router';
import healthCheckRouter from './modules/health-check/router';
import { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';

function registerRouters(): RegisteredRouter[] {
  return [
    { path: '/api/v1/health-check', router: healthCheckRouter },
    { path: '/api/v1/auth', router: authRouter }, // signin
    { path: '/api/v1/users', router: usersRouter }, // can remove
    { path: '/api/v1/accounts', router: accountsRouter },
    { path: '/api/v1/categories', router: categoriesRouter },
    { path: '/api/v1/transactions', router: transactionsRouter },
    // Add more routes here
  ];
}

function main() {
  const app = new ExpressApp();
  app.addGlobalMiddlewares(
    cors({
      credentials: true,
      origin: ['http://localhost:5173', /(\.)?expense-tracker-b2b.pages.dev/],
    }),
    expressI18next(i18next, 'en-US'),
  );

  app.registerRouters(...registerRouters());
  app.overrideDefaultGlobalErrorHandler((defaultHandler) => {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // bad prisma data
        res.status(400).json({
          errCode: 1, // prisma bad data error
          error: err.message,
          statusCode: 400,
        });
        return;
      }

      defaultHandler(err, req, res, next);
    };
  });

  const server = http.createServer(app.requestListener());
  server.listen(config.SERVER.PORT, () => {
    logger.info(
      `app start at http://${config.SERVER.HOST}:${config.SERVER.PORT}`,
    );
  });
}

main();
