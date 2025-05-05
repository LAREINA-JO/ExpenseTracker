import db from '@/db';
import { User } from '@prisma/client';
import Result, { ResultPromiseType } from '@/utils/common/result';
import AccountServiceError from '../error/AccountServiceError';
import { findFirstAccountByIdAndUser } from '../findAccounts';

export const deleteAccountById = async (
  id: number,
  user: User,
): ResultPromiseType<{}> => {
  const account = await findFirstAccountByIdAndUser(id, user);

  if (!account) {
    return Result.error(new AccountServiceError('ACCOUNT_NOT_FOUND'));
  }

  await db.account.delete({
    where: { id, userId: user.id },
  });
  return Result.success({});
};
