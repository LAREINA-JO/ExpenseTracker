import * as tokenService from '@/modules/token/service';
import type { UserTokenData, UserTokenType } from '../generateUserToken';
import config from '@/config';
import Result, { ResultType } from '@/utils/common/result';
import UserServiceError from '../error/UserServiceError';

const verifyUserToken = <T extends UserTokenData = UserTokenData>(
  token: string | undefined,
  type: UserTokenType,
): ResultType<T> => {
  if (!token) {
    return Result.error(
      new UserServiceError(
        'INVALID_TOKEN',
        `token with ${type} cannot be undefined`,
      ),
    );
  }

  switch (type) {
    case 'access': {
      return tokenService.verify<T>(token, config.ACCESS_TOKEN.SECRET);
    }
    case 'refresh': {
      return tokenService.verify<T>(token, config.REFRESH_TOKEN.SECRET);
    }
    default:
      return Result.error(
        new UserServiceError('INVALID_TOKEN', `invalid token type ${type}`),
      );
  }
};

export default verifyUserToken;
