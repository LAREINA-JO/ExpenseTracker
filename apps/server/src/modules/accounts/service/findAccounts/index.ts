import db from '@/db';
import { User } from '@prisma/client';
import { ConditionalQuery } from '@/types/query';
import { Account } from '@expense-tracker/schemas';

export const findAccounts = async (
  user: User,
  conditions: ConditionalQuery<Account, 'id' | 'createdAt'>,
) => {
  const { start = 0, limit = 100, orderBy, name, ...restProps } = conditions;

  const accounts = await db.account.findMany({
    where: {
      ...restProps,
      userId: user.id,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      cardNumber: true,
      createdAt: true,
    },
    skip: start,
    take: limit,
    orderBy,
  });

  return accounts;
};

export const findFirstAccountByIdAndUser = async (id: number, user: User) => {
  const account = await db.account.findFirst({
    where: { id, userId: user.id },
  });

  return account;
};
