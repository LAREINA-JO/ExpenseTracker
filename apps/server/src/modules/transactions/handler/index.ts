import safeRequestHandler from '@/middlewares/safe-request-handler';
import {
  getTransactionsReqBodySchema,
  getTransactionsResBodySchema,
  updateTransactionReqBodySchema,
  addTransactionReqBodySchema,
  transactionSchema,
} from '@expense-tracker/schemas';
import { findTransactions } from '../service/findTransactions';
import z from 'zod';
import { updateTransactionById } from '../service/updateTransaction';
import { addTransaction } from '../service/addTransaction';
import { deleteTransactionById } from '../service/deleteTransaction';
import Result from '../../../utils/common/result';

export const getTransactionsHandler = safeRequestHandler(
  {
    schema: {
      req: {
        body: getTransactionsReqBodySchema,
      },
      res: {
        body: getTransactionsResBodySchema,
      },
    },
  },
  async (req, res) => {
    const user = req.user!;
    const query = req.body;
    const transactionsWithTotal = await findTransactions(user, query);
    res.json(transactionsWithTotal);
  },
);

export const updateTransactionHandler = safeRequestHandler(
  {
    schema: {
      req: {
        params: z.object({
          id: z.string().regex(/\d+/),
        }),
        body: updateTransactionReqBodySchema,
      },
    },
  },
  async (req, res) => {
    const id = +req.params.id;
    const user = req.user!;

    const { data, error, isError } = await updateTransactionById(
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

export const addTransactionHandler = safeRequestHandler(
  {
    schema: {
      req: {
        body: addTransactionReqBodySchema,
      },
      res: {
        body: transactionSchema,
      },
    },
  },
  async (req, res) => {
    const user = req.user!;
    const { data, error, isError } = await addTransaction(user, req.body);
    if (isError) {
      throw error;
    }
    res.json(data);
  },
);

export const deleteTransactionHandler = safeRequestHandler(
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

    const { data, error, isError } = await deleteTransactionById(id, user);
    if (isError) {
      throw Result.error(error);
    }
    res.json(data);
  },
);
