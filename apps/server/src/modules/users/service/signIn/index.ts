import bcrypt from 'bcrypt';
import db from '@/db';
import { SignInError, SignInResBody } from '@expense-tracker/schemas';
import Result, { ResultPromiseType } from '@/utils/common/result';
import ServiceError from '@/error/service/ServiceError';
import generateUserToken, { UserTokenData } from '../generateUserToken';
import UserServiceError from '../error/UserServiceError';
import logger from '@/utils/logger';

const signIn = async (
  email: string,
  password: string,
): ResultPromiseType<
  SignInResBody & { refreshToken: string },
  ServiceError<SignInError>
> => {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      password: true,
      email: true,
      username: true,
    },
  });
  if (!user) {
    logger.error(
      new UserServiceError('EMAIL_NOT_FOUND', {
        email: 'Cannot find this email',
      }),
      'sign in error',
    );
    return Result.error(
      new UserServiceError('EMAIL_NOT_FOUND', {
        email: 'Cannot find this email',
      }),
    );
  }
  const signInSuccess = await bcrypt.compare(password, user.password);
  if (!signInSuccess) {
    return Result.error(
      new UserServiceError('INVALID_PASSWORD', {
        password: 'invalid password',
      }),
    );
  }

  const tokenData: UserTokenData = {
    email,
    username: user.username,
  };
  // generate json web token
  const accessToken = await generateUserToken(tokenData, 'access');
  const refreshToken = await generateUserToken(tokenData, 'refresh');

  return Result.success({
    username: user.username,
    email,
    accessToken,
    refreshToken,
  });
};

export default signIn;
