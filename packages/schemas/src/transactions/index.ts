import { z } from 'zod';
import { conditionalQuerySchema } from '../utils/query';
import { APIResBody, SerializedType } from '../utils/api';
import { accountSchema } from '../accounts';
import { categorySchema } from '../categories';

// Base transaction schema
export const transactionSchema = z.object({
  id: z.number(),
  amount: z.number(),
  description: z.string().nullable(),
  transactionDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val)),
  accountId: z.number(),
  account: accountSchema.pick({ id: true, name: true }),
  categoryId: z.number(),
  category: categorySchema.pick({ id: true, name: true }),
  createdAt: z
    .string()
    .datetime()
    .transform((val) => new Date(val)),
});

export type Transaction = z.infer<typeof transactionSchema>;

// Transaction input validation
export const transactionInputSchema = z.object({
  amount: z.number().min(0, 'amount must be greater than 0'),
  description: z
    .string()
    .max(255)
    .nullable()
    .transform((val) => val || null),
  transactionDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val)),
  accountId: z.number(),
  categoryId: z.number(),
});

export type TransactionInput = z.infer<typeof transactionInputSchema>;
export type TransactionInputError = Partial<
  Record<keyof TransactionInput, string>
>;

// Get transactions
export const getTransactionsReqBodySchema = conditionalQuerySchema(
  transactionSchema,
  ['id', 'createdAt', 'transactionDate', 'amount'],
).extend({
  startDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val))
    .optional(),
  endDate: z
    .string()
    .datetime()
    .transform((val) => new Date(val))
    .optional(),
});
export type GetTransactionsReqBody = SerializedType<
  z.infer<typeof getTransactionsReqBodySchema>
>;

export const getTransactionsResBodySchema = z.object({
  total: z.number(),
  transactions: z.array(transactionSchema),
});
export type GetTransactionsResBody = APIResBody<
  typeof getTransactionsResBodySchema
>;

// Update transaction
export const updateTransactionReqBodySchema = transactionInputSchema.partial();
export type UpdateTransactionReqBody = SerializedType<
  z.infer<typeof updateTransactionReqBodySchema>
>;
export type UpdateTransactionError = TransactionInputError;

// Add transaction
export const addTransactionReqBodySchema = transactionInputSchema;
export type AddTransactionReqBody = SerializedType<
  z.infer<typeof addTransactionReqBodySchema>
>;
export type AddTransactionError = TransactionInputError;
