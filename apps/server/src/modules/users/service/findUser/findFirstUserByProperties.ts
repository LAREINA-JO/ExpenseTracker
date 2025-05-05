import { User } from '@prisma/client';
import db from '@/db';
import Result, { ResultPromiseType } from '@/utils/common/result';
import UserServiceError from '../error/UserServiceError';

const findFirstUserEmailAndUsernameByProperties = async (
  properties: Partial<User>,
): ResultPromiseType<Pick<User, 'email' | 'username'>> => {
  const user = await db.user.findFirst({
    where: { ...properties },
    select: { email: true, username: true },
  });

  if (user === null) {
    return Result.error(
      new UserServiceError('USER_NOT_FOUND', 'cannot find user'),
    );
  }

  return Result.success(user);
};

export default findFirstUserEmailAndUsernameByProperties;
