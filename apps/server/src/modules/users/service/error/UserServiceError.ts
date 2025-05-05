import { ServiceErrorMetadataMapType } from '@/error/service/ServiceError';
import { SERVICE_CODE } from '@/constant/service';
import buildServiceError from '@/error/service/buildServiceError';

const USER_SERVICE_CODE = SERVICE_CODE.USER_SERVICE;

export const USER_SERVICE_ERROR_METADATA_MAP = {
  USER_NOT_FOUND: {
    errCode: `${USER_SERVICE_CODE}_ERR_00001`,
    httpStatusCode: 401,
    errDataDefault: 'User not found',
  },
  EMAIL_NOT_FOUND: {
    errCode: `${USER_SERVICE_CODE}_ERR_00002`,
    httpStatusCode: 401,
    errDataDefault: 'Email not found',
  },
  INVALID_PASSWORD: {
    errCode: `${USER_SERVICE_CODE}_ERR_00003`,
    httpStatusCode: 401,
    errDataDefault: 'Invalid password',
  },

  INVALID_TOKEN: {
    errCode: `${USER_SERVICE_CODE}_ERR_00004`,
    httpStatusCode: 401,
    errDataDefault: 'Invalid token',
  },
} as const satisfies ServiceErrorMetadataMapType;

const UserServiceError = buildServiceError(USER_SERVICE_ERROR_METADATA_MAP);
export default UserServiceError;
