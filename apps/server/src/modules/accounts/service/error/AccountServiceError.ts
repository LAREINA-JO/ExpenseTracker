import { ServiceErrorMetadataMapType } from '@/error/service/ServiceError';
import { SERVICE_CODE } from '@/constant/service';
import buildServiceError from '@/error/service/buildServiceError';

const ACCOUNT_SERVICE_CODE = SERVICE_CODE.ACCOUNT_SERVICE;

export const ACCOUNT_SERVICE_ERROR_METADATA_MAP = {
  ACCOUNT_NOT_FOUND: {
    errCode: `${ACCOUNT_SERVICE_CODE}_ERR_00001`,
    httpStatusCode: 404,
    errDataDefault: 'Account not found',
  },
  ACCOUNT_NAME_ALREADY_EXISTS: {
    errCode: `${ACCOUNT_SERVICE_CODE}_ERR_00002`,
    httpStatusCode: 409,
    errDataDefault: 'Account name already exists',
  },
  CARD_NUMBER_ALREADY_EXISTS: {
    errCode: `${ACCOUNT_SERVICE_CODE}_ERR_00003`,
    httpStatusCode: 409,
    errDataDefault: 'Card number already exists',
  },
  ACCOUNT_ALREADY_EXIST: {
    errCode: `${ACCOUNT_SERVICE_CODE}_ERR_00004`,
    httpStatusCode: 409,
    errDataDefault: 'Account already exist',
  },
} as const satisfies ServiceErrorMetadataMapType;

const AccountServiceError = buildServiceError(
  ACCOUNT_SERVICE_ERROR_METADATA_MAP,
);

export default AccountServiceError;
