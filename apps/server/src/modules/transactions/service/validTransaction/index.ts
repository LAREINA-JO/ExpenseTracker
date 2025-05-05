import db from '@/db';
import {
  TransactionInput,
  TransactionInputError,
} from '@expense-tracker/schemas';
import Result, { ResultPromiseType } from '@/utils/common/result';
import ServiceError from '@/error/service/ServiceError';
import TransactionServiceError from '../error/TransactionServiceError';
import { User } from '@prisma/client';

export const validTransactionInput = async (
  { accountId, categoryId }: Partial<TransactionInput>,
  user: User,
): ResultPromiseType<{}, ServiceError<TransactionInputError>> => {
  if (!accountId || !categoryId) {
    return Result.error(
      new TransactionServiceError('INVALID_TRANSACTION', {
        accountId: 'Account or category is required',
        categoryId: 'Account or category is required',
      }),
    );
  }

  if (accountId > 0) {
    const account = await db.account.findFirst({
      where: { id: accountId, userId: user.id },
    });

    if (!account) {
      return Result.error(
        new TransactionServiceError('INVALID_ACCOUNT', {
          accountId: 'Invalid account selected',
        }),
      );
    }
  }

  if (categoryId > 0) {
    const category = await db.category.findFirst({
      where: { id: categoryId, userId: user.id },
    });

    if (!category) {
      return Result.error(
        new TransactionServiceError('INVALID_CATEGORY', {
          categoryId: 'Invalid category selected',
        }),
      );
    }
  }

  return Result.success({});
};
