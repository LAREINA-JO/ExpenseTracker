import db from '@/db';
import verifyUserToken from '../verifyUserToken';
import { UserTokenType } from '../generateUserToken';
import { User } from '@prisma/client';
import Result, { ResultPromiseType } from '@/utils/common/result';
import UserServiceError from '../error/UserServiceError';

const findUserByToken = async (
  token: string | undefined,
  tokenType: UserTokenType,
): ResultPromiseType<User> => {
  const { data, error, isError } = verifyUserToken(token, tokenType);
  if (isError) {
    return Result.error(error);
  }

  const { email, username } = data;
  const user = await db.user.findUnique({
    where: { email, username },
  });

  if (!user) {
    return Result.error(
      new UserServiceError('USER_NOT_FOUND', { email: 'cannot find email' }),
    );
  }

  if (tokenType === 'refresh') {
    if (token !== user.refreshToken) {
      return Result.error(
        new UserServiceError('INVALID_TOKEN', 'invalid refreshToken'),
      );
    }
  }

  return Result.success(user);
};

export default findUserByToken;
