import db from '@/db';
import Result, { ResultPromiseType } from '@/utils/common/result';
import findFirstUserEmailAndUsernameByProperties from '../findUser/findFirstUserByProperties';

const signOut = async (
  email: string,
  username: string,
): ResultPromiseType<{}> => {
  const { error, isError } = await findFirstUserEmailAndUsernameByProperties({
    email,
    username,
  });

  if (isError) {
    return Result.error(error);
  }

  await db.user.update({
    where: {
      email,
      username,
    },
    data: {
      refreshToken: null,
      refreshTokenExpireAt: null,
    },
  });

  return Result.success({});
};

export default signOut;
