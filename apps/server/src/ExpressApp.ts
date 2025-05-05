import type {
  Express,
  RequestHandler,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import express, { json } from 'express';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import logger from './utils/logger';
import helmet from 'helmet';
import HttpError from './error/http/HttpError';
import { isResult } from './utils/common/result';

export type RegisteredRouter = {
  path: string;
  router: Router;
};

export default class ExpressApp {
  private readonly app: Express;

  private globalMiddlewares: RequestHandler[] = [];
  private routers: RegisteredRouter[] = [];
  private errorHandler = this.defaultErrorHandler;

  private defaultGlobalMiddlewares = {
    json: json(),
    helmet: helmet(),
    cookie: cookieParser(),
    logger: pinoHttp({
      logger,
      serializers: {
        req: (req: Request) => {
          const { headers, ...others } = req;
          return { ...others };
        },
        res: (res: Response) => {
          return { statusCode: res.statusCode };
        },
        err: (err: Error) => {
          return {
            type: err.name || 'Error', // Error type
            message: err.message, // Error message
          };
        },
      },
    }),
  } as const;

  constructor() {
    this.app = express();
  }

  overrideDefaultGlobalMiddlewares(
    middlewares: Partial<typeof this.defaultGlobalMiddlewares>,
  ) {
    this.defaultGlobalMiddlewares = {
      ...this.defaultGlobalMiddlewares,
      ...middlewares,
    };
  }

  addGlobalMiddlewares(...middlewares: RequestHandler[]) {
    this.globalMiddlewares.push(...middlewares);
  }

  overrideDefaultGlobalErrorHandler(
    handler: (
      defaultErrorhandler: typeof this.defaultErrorHandler,
    ) => typeof this.defaultErrorHandler,
  ) {
    this.errorHandler = handler(this.defaultErrorHandler);
  }

  registerRouters(...routers: typeof this.routers) {
    this.routers = routers;
  }

  /**
   *
   * @returns native http handler
   */
  requestListener(): Express {
    this.applyGlobalMiddlewares();

    this.routers.forEach((router) => {
      this.app.use(router.path, router.router);
    });

    this.setupErrorHandler();

    return this.app;
  }

  listen(port: number, callback: () => void): void {
    this.applyGlobalMiddlewares();

    this.routers.forEach((router) => {
      this.app.use(router.path, router.router);
    });

    this.setupErrorHandler();
    this.app.listen(port, callback);
  }

  private applyGlobalMiddlewares() {
    this.globalMiddlewares = [
      ...(Object.values(this.defaultGlobalMiddlewares) as RequestHandler[]),
      ...this.globalMiddlewares,
    ];
    for (const middleware of this.globalMiddlewares) {
      this.app.use(middleware);
    }
  }

  private setupErrorHandler() {
    this.app.use(this.errorHandler);
  }

  private defaultErrorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof HttpError) {
      res.status(err.httpStatusCode).json({
        errCode: err.errCode,
        error: err.errData,
      });
      return;
    }

    if (isResult(err)) {
      logger.warn(err, 'Internal should not throw Result type as an error');
      res.status(500).json({
        errCode: '-1',
        error: 'Internal should not throw Result type as an error',
      });
      return;
    }

    const errorStack = err.stack
      ?.split('\n') // Split stack trace into lines
      .filter((line) => !line.includes('node_modules')) // Exclude lines from node_modules
      .join('\n'); // Join filtered lines back into a string
    logger.error(errorStack, 'An unexpected error occurred, error stack is');

    res.status(500).json({
      errCode: '-1',
      error: 'An unexpected error occurred',
    });
  }
}
