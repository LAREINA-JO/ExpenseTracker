import { ServiceErrorMetadataMapType } from '@/error/service/ServiceError';
import { SERVICE_CODE } from '@/constant/service';
import buildServiceError from '@/error/service/buildServiceError';

export const TOKEN_SERVICE_ERROR_METADATA_MAP = {
  INVALID_TOKEN: {
    errCode: `${SERVICE_CODE.TOKEN_SERVICE}_ERR_00001`,
    httpStatusCode: 401,
    errDataDefault: 'Invalid token',
  },
} as const satisfies ServiceErrorMetadataMapType;

const TokenServiceError = buildServiceError(TOKEN_SERVICE_ERROR_METADATA_MAP);
export default TokenServiceError;
