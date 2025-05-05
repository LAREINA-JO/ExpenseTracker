import db from '@/db';
import { TransactionInput } from '@expense-tracker/schemas';
import { User } from '@prisma/client';
import Result from '@/utils/common/result';
import { validTransactionInput } from '../validTransaction';

export const addTransaction = async (
  user: User,
  transaction: TransactionInput,
) => {
  const { error, isError } = await validTransactionInput(transaction, user);
  if (isError) {
    return Result.error(error);
  }

  const newTransaction = await db.transaction.create({
    data: {
      ...transaction,
      userId: user.id,
    },
    select: {
      id: true,
      amount: true,
      description: true,
      transactionDate: true,
      accountId: true,
      categoryId: true,
      createdAt: true,
      account: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      },
    },
  });

  return Result.success(newTransaction);
};
