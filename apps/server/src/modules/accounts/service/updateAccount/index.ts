import db from '@/db';
import { Account } from '@expense-tracker/schemas';
import { User } from '@prisma/client';
import Result, { ResultPromiseType } from '@/utils/common/result';
import { validAccountInputConflict } from '../validAccount';

export const updateAccountById = async (
  id: number,
  user: User,
  account: Partial<Account>,
): ResultPromiseType<{}> => {
  const { error, isError } = await validAccountInputConflict(account, id);

  if (isError) {
    return Result.error(error);
  }

  await db.account.update({
    select: { id: true },
    where: { id, userId: user.id },
    data: account,
  });

  return Result.success({});
};
