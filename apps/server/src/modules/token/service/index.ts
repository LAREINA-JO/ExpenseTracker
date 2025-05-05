import jwt from 'jsonwebtoken';
import Result, { type ResultType } from '@/utils/common/result';
import _ from 'lodash';
import TokenServiceError from './error/TokenServiceError';

export const sign = (
  payload: string | Buffer | object,
  secret: jwt.Secret,
  options?: jwt.SignOptions,
) => {
  const token = jwt.sign(payload, secret, options);
  return token;
};

export const verify = <T>(
  token: string,
  secret: jwt.Secret,
  options?: jwt.VerifyOptions,
): ResultType<T> => {
  try {
    const decoded = jwt.verify(token, secret, options);
    const data = decoded as T &
      Pick<
        jwt.JwtPayload,
        'iss' | 'sub' | 'aud' | 'exp' | 'nbf' | 'iat' | 'jti'
      >;
    return Result.success(
      _.omit(data, ['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti']) as T,
    );
  } catch (error) {
    return Result.error(
      new TokenServiceError('INVALID_TOKEN', 'invalid token', error),
    );
  }
};
