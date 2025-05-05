/**
 * @packageDocumentation
 * cli created package
 */

export {
  signInReqBodySchema,
  signInResBodySchema,
  signOutReqBodySchema,
} from './auth';
export type {
  SignInReqBody,
  SignInResBody,
  SignInError,
  SignOutReqBody,
} from './auth';

export {
  accountSchema,
  accountInputSchema as validAccountSchema,
  getAccountsReqBodySchema,
  getAccountsResBodySchema,
  updateAccountsReqBodySchema,
  addAccountReqBodySchema,
} from './accounts';
export type {
  Account,
  AccountInput,
  AccountInputError,
  GetAccountsReqBody,
  GetAccountsResBody,
  UpdateAccountsReqBody,
  UpdateAccountError,
  AddAccountReqBody,
  AddAccountError,
} from './accounts';

export { getMeReqQuerySchema, getMeResBodySchema } from './user';
export type { GetMeReqQuery, GetMeResBody } from './user';

export { isAPIError } from './utils/api';
export type {
  APIError,
  APIReqBody,
  APIReqQuery,
  APIResBody,
  SerializedType,
} from './utils/api';

export {
  categorySchema,
  categoryInputSchema,
  getCategoriesReqBodySchema,
  getCategoriesResBodySchema,
  updateCategoriesReqBodySchema,
  addCategoryReqBodySchema,
} from './categories';

export type {
  Category,
  CategoryInput,
  CategoryInputError,
  GetCategoriesReqBody,
  GetCategoriesResBody,
  UpdateCategoriesReqBody,
  UpdateCategoryError,
  AddCategoryReqBody,
  AddCategoryError,
} from './categories';

export {
  transactionSchema,
  transactionInputSchema,
  getTransactionsReqBodySchema,
  getTransactionsResBodySchema,
  updateTransactionReqBodySchema,
  addTransactionReqBodySchema,
} from './transactions';

export type {
  Transaction,
  TransactionInput,
  TransactionInputError,
  GetTransactionsReqBody,
  GetTransactionsResBody,
  UpdateTransactionReqBody,
  UpdateTransactionError,
  AddTransactionReqBody,
  AddTransactionError,
} from './transactions';
