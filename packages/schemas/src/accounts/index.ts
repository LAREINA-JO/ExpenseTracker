import z from 'zod';
import { conditionalQuerySchema } from '../utils/query';
import { APIReqBody, APIResBody } from '../utils/api';

export const accountSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    cardNumber: z.string(),
    createdAt: z
      .string()
      .datetime()
      .transform((v) => new Date(v)),
  })
  .strict();
export type Account = z.infer<typeof accountSchema>;

export const accountInputSchema = z
  .object({
    name: z
      .string()
      .min(3, 'account name should not be less than 3 characters')
      .max(50, 'account name should be less than 50 characters'),
    cardNumber: z
      .string()
      .regex(
        /^\d{13}$|^\d{16}$|^\d{19}$/,
        'card number should be exactly 13, 16, or 19 digits',
      ),
  })
  .strict();

export type AccountInput = z.infer<typeof accountInputSchema>;
export type AccountInputError = Partial<AccountInput>;

export const getAccountsReqBodySchema = conditionalQuerySchema(accountSchema, [
  'id',
  'createdAt',
]);
export type GetAccountsReqBody = APIReqBody<typeof getAccountsReqBodySchema>;

// get accounts
export const getAccountsResBodySchema = z.array(accountSchema);
export type GetAccountsResBody = APIResBody<typeof getAccountsResBodySchema>;

// update account
export const updateAccountsReqBodySchema = accountInputSchema.partial();
export type UpdateAccountsReqBody = APIReqBody<
  typeof updateAccountsReqBodySchema
>;
export type UpdateAccountError = AccountInputError;

// add account
export const addAccountReqBodySchema = accountInputSchema;
export type AddAccountReqBody = APIReqBody<typeof addAccountReqBodySchema>;
export type AddAccountError = AccountInputError;
