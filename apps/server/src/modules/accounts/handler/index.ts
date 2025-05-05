import safeRequestHandler from '@/middlewares/safe-request-handler';
import {
  getAccountsReqBodySchema,
  getAccountsResBodySchema,
  updateAccountsReqBodySchema,
  addAccountReqBodySchema,
  accountSchema,
} from '@expense-tracker/schemas';
import { findAccounts } from '../service/findAccounts';
import z from 'zod';
import { updateAccountById } from '../service/updateAccount';
import { addAccount } from '../service/addAccount';
import { deleteAccountById } from '../service/deleteAccount';

export const getAccountsHandler = safeRequestHandler(
  {
    schema: {
      req: {
        body: getAccountsReqBodySchema,
      },
      res: {
        body: getAccountsResBodySchema,
      },
    },
  },
  async (req, res) => {
    const user = req.user!;
    const query = req.body;
    const accounts = await findAccounts(user, query);
    res.json(accounts);
  },
);

export const updateAccountHandler = safeRequestHandler(
  {
    schema: {
      req: {
        params: z.object({
          id: z.string().regex(/\d+/),
        }),
        body: updateAccountsReqBodySchema,
      },
    },
  },
  async (req, res) => {
    const id = +req.params.id;
    const user = req.user!;

    const { data, error, isError } = await updateAccountById(
      id,
      user,
      req.body,
    );
    if (isError) {
      throw error;
    }
    res.json(data);
  },
);

export const addAccountHandler = safeRequestHandler(
  {
    schema: {
      req: {
        body: addAccountReqBodySchema,
      },
      res: {
        body: accountSchema,
      },
    },
  },
  async (req, res) => {
    const user = req.user!;
    const { data, error, isError } = await addAccount(user, req.body);
    if (isError) {
      throw error;
    }
    res.json(data);
  },
);

export const deleteAccountHandler = safeRequestHandler(
  {
    schema: {
      req: {
        params: z.object({
          id: z.string().regex(/\d+/),
        }),
      },
    },
  },
  async (req, res) => {
    const id = +req.params.id;
    const user = req.user!;

    const { data, error, isError } = await deleteAccountById(id, user);
    if (isError) {
      throw error;
    }
    res.json(data);
  },
);
