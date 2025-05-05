import db from '@/db';
import { User } from '@prisma/client';
import { ConditionalQuery } from '@/types/query';
import { Transaction } from '@expense-tracker/schemas';

type FindTransactionsQueryType = ConditionalQuery<
  Transaction,
  'id' | 'createdAt' | 'transactionDate' | 'amount'
> & {
  startDate?: Date;
  endDate?: Date;
};

export const findTransactions = async (
  user: User,
  conditions: FindTransactionsQueryType,
) => {
  const {
    start = 0,
    limit = 100,
    orderBy,
    description,
    startDate,
    endDate = new Date(),
    ...restProps
  } = conditions;

  const totalTransactions = await db.transaction.count({
    where: {
      ...restProps,
      userId: user.id,
      description:
        description === null
          ? null
          : description === ''
            ? undefined
            : {
                contains: description,
                mode: 'insensitive',
              },
      transactionDate: { gte: startDate, lte: endDate },
    },
  });

  const transactions = await db.transaction.findMany({
    where: {
      ...restProps,
      userId: user.id,
      description:
        description === null
          ? null
          : description === ''
            ? undefined
            : {
                contains: description,
                mode: 'insensitive',
              },
      transactionDate: { gte: startDate, lte: endDate },
    },
    select: {
      id: true,
      amount: true,
      createdAt: true,
      transactionDate: true,
      description: true,
      categoryId: true,
      accountId: true,
      account: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    skip: start,
    take: limit === -1 ? undefined : limit,
    orderBy,
  });

  return {
    total: totalTransactions,
    transactions,
  };
};

export const findFirstTransactionByIdAndUser = async (
  id: number,
  user: User,
) => {
  const transaction = await db.transaction.findFirst({
    where: { id, userId: user.id },
  });

  return transaction;
};
