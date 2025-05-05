import db from '@/db';
import { Transaction } from '@expense-tracker/schemas';
import { User } from '@prisma/client';
import Result, { ResultPromiseType } from '@/utils/common/result';
import { validTransactionInput } from '../validTransaction';
import { findFirstTransactionByIdAndUser } from '../findTransactions';
import TransactionServiceError from '../error/TransactionServiceError';
import omit from '@/utils/common/omit';

export const updateTransactionById = async (
  id: number,
  user: User,
  transaction: Partial<Transaction>,
): ResultPromiseType<{}> => {
  const existingTransaction = await findFirstTransactionByIdAndUser(id, user);
  if (!existingTransaction) {
    return Result.error(new TransactionServiceError('TRANSACTION_NOT_FOUND'));
  }

  const { error, isError } = await validTransactionInput(transaction, user);
  if (isError) {
    return Result.error(error);
  }

  await db.transaction.update({
    where: { id, userId: user.id },
    data: omit(transaction, ['id', 'createdAt', 'account', 'category']),
  });

  return Result.success({});
};
