import generateUserToken, { type UserTokenData } from '../generateUserToken';
import findUserByToken from '../findUser/findUserByUserToken';
import { SignInResBody } from '@expense-tracker/schemas';
import Result, { ResultPromiseType } from '@/utils/common/result';

const refreshUserToken = async (
  token: string | undefined,
): ResultPromiseType<SignInResBody & { refreshToken: string }> => {
  const { data, error, isError } = await findUserByToken(token, 'refresh');

  if (isError) {
    return Result.error(error);
  }

  const { email, username } = data;

  const userTokenData: UserTokenData = {
    email: email,
    username: username,
  };
  const accessToken = await generateUserToken(userTokenData, 'access');
  const refreshToken = await generateUserToken(userTokenData, 'refresh');
  return Result.success({
    accessToken,
    refreshToken,
    username,
    email,
  });
};

export default refreshUserToken;
