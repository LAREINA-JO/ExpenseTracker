import { RequestHandler } from 'express';
import * as userService from '@/modules/users/service';
import safeRequestHandler from '../safe-request-handler';

const authRequired: RequestHandler = safeRequestHandler(
  {},
  async (req, res, next) => {
    const accessToken = req.headers['authorization']?.replace('Bearer ', '');
    const { data, error, isError } = await userService.findUserByUserToken(
      accessToken,
      'access',
    );

    if (isError) {
      throw error;
    }

    req.user = data;
    next();
  },
);

export default authRequired;
