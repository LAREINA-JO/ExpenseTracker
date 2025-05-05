import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import type { RequestHandler } from 'express';
import BadRequestError from '@/error/http/BadRequestError';
import type { ParsedQs } from 'qs';

type Config<RequestParam, RequestBody, RequestQuery, ResponseBody> = {
  schema?: {
    req?: {
      params?: z.Schema<RequestParam, z.ZodTypeDef, unknown>;
      query?: z.Schema<RequestQuery, z.ZodTypeDef, unknown>;
      body?: z.Schema<RequestBody, z.ZodTypeDef, unknown>;
    };
    res?: {
      body?: z.Schema<ResponseBody, z.ZodTypeDef, unknown>;
    };
  };
};

const safeRequestHandler = <
  RequestParam extends Record<string, string>,
  RequestBody,
  RequestQuery extends ParsedQs,
  ResponseBody,
>(
  config: Config<RequestParam, RequestBody, RequestQuery, ResponseBody>,
  requestHandler: RequestHandler<
    Record<string, string>,
    ResponseBody,
    RequestBody,
    RequestQuery
  >,
): RequestHandler<RequestParam, ResponseBody, RequestBody, RequestQuery> => {
  return async (req, res, next) => {
    try {
      const { schema } = config;

      if (schema?.req?.params) {
        const result = schema.req.params.safeParse(req.params);
        if (!result.success) {
          throw new BadRequestError(fromZodError(result.error).message);
        }
        req.params = result.data;
      }

      if (schema?.req?.body) {
        const result = schema.req.body.safeParse(req.body);
        if (!result.success) {
          throw new BadRequestError(fromZodError(result.error).message);
        }
        req.body = result.data;
      }

      if (schema?.req?.query) {
        const result = schema.req.query.safeParse(req.query);
        if (!result.success) {
          throw new BadRequestError(fromZodError(result.error).message);
        }
        req.query = result.data;
      }

      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default safeRequestHandler;
