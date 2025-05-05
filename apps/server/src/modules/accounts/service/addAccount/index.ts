import db from '@/db';
import { AccountInput } from '@expense-tracker/schemas';
import { User } from '@prisma/client';
import Result from '@/utils/common/result';
import { validAccountInputConflict } from '../validAccount';

export const addAccount = async (user: User, account: AccountInput) => {
  const { isError, error } = await validAccountInputConflict(account);
  if (isError) {
    return Result.error(error);
  }

  const newAccount = await db.account.create({
    select: {
      id: true,
      name: true,
      cardNumber: true,
      createdAt: true,
    },
    data: {
      ...account,
      userId: user.id,
    },
  });

  return Result.success(newAccount);
};
