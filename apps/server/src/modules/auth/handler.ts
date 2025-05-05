import safeRequestHandler from '@/middlewares/safe-request-handler';
import {
  signInReqBodySchema,
  signInResBodySchema,
  signOutReqBodySchema,
} from '@expense-tracker/schemas';
import * as userService from '@/modules/users/service';
import config from '@/config';

export const signInHandler = safeRequestHandler(
  {
    schema: {
      req: {
        body: signInReqBodySchema,
      },
      res: {
        body: signInResBodySchema,
      },
    },
  },
  async (req, res) => {
    const { email, password } = req.body;
    const { data, error, isError } = await userService.signIn(email, password);

    if (isError) {
      throw error;
    }

    const { refreshToken, ...otherData } = data;

    res.cookie('refreshToken', refreshToken, {
      maxAge: config.REFRESH_TOKEN.EXPIRES_IN * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.json(otherData);
  },
);

export const signOutHandler = safeRequestHandler(
  {
    schema: {
      req: {
        body: signOutReqBodySchema,
      },
    },
  },
  async (req, res) => {
    const { email, username } = req.body;
    const { data, error, isError } = await userService.signOut(email, username);

    if (isError) {
      throw error;
    }
    res.json(data);
  },
);

export const refreshUserHandler = safeRequestHandler(
  {
    schema: {
      res: {
        body: signInResBodySchema,
      },
    },
  },
  async (req, res) => {
    const allowedOrigins = [
      /http:\/\/localhost:5173/,
      /(\.)?expense-tracker-b2b.pages.dev/,
    ];
    const origin = req.get('Origin'); // Get the Origin header
    if (!origin || !allowedOrigins.some((allowed) => allowed.test(origin))) {
      throw Error('The origin not allowed!');
    }

    const { refreshToken: token } = req.cookies;
    const { data, error, isError } = await userService.refreshUserToken(token);
    if (isError) {
      throw error;
    }

    const { refreshToken, ...otherData } = data;

    res.cookie('refreshToken', refreshToken, {
      maxAge: config.REFRESH_TOKEN.EXPIRES_IN * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.json(otherData);
  },
);
