import db from '@/db';
import * as tokenService from '@/modules/token/service';
import config from '@/config';

export type UserTokenData = {
  email: string;
  username: string;
};

export type UserTokenType = 'access' | 'refresh';

const generateUserToken = async (data: UserTokenData, type: UserTokenType) => {
  switch (type) {
    case 'access': {
      return tokenService.sign(data, config.ACCESS_TOKEN.SECRET, {
        expiresIn: config.ACCESS_TOKEN.EXPIRES_IN,
      });
    }
    case 'refresh': {
      const refreshToken = tokenService.sign(
        data,
        config.REFRESH_TOKEN.SECRET,
        {
          expiresIn: config.REFRESH_TOKEN.EXPIRES_IN,
        },
      );
      await db.user.update({
        where: { ...data },
        data: {
          refreshToken,
          refreshTokenExpireAt: new Date(
            Date.now() + config.REFRESH_TOKEN.EXPIRES_IN,
          ),
        },
      });
      return refreshToken;
    }
    default:
      return '';
  }
};

export default generateUserToken;
