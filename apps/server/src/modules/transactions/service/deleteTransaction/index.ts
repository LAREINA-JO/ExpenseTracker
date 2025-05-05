import db from '@/db';
import { User } from '@prisma/client';
import Result, { ResultPromiseType } from '@/utils/common/result';
import TransactionServiceError from '../error/TransactionServiceError';
import { findFirstTransactionByIdAndUser } from '../findTransactions';

export const deleteTransactionById = async (
  id: number,
  user: User,
): ResultPromiseType<{}> => {
  const transaction = await findFirstTransactionByIdAndUser(id, user);
  if (!transaction) {
    return Result.error(new TransactionServiceError('TRANSACTION_NOT_FOUND'));
  }

  await db.transaction.delete({
    where: { id, userId: user.id },
  });

  return Result.success({});
};
