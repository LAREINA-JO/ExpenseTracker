import { ServiceErrorMetadataMapType } from '@/error/service/ServiceError';
import { SERVICE_CODE } from '@/constant/service';
import buildServiceError from '@/error/service/buildServiceError';

const TRANSACTION_SERVICE_CODE = SERVICE_CODE.TRANSACTION_SERVICE;

export const TRANSACTION_SERVICE_ERROR_METADATA_MAP = {
  TRANSACTION_NOT_FOUND: {
    errCode: `${TRANSACTION_SERVICE_CODE}_ERR_00001`,
    httpStatusCode: 404,
    errDataDefault: 'Transaction not found',
  },
  INVALID_ACCOUNT: {
    errCode: `${TRANSACTION_SERVICE_CODE}_ERR_00002`,
    httpStatusCode: 400,
    errDataDefault: 'Invalid account',
  },
  INVALID_CATEGORY: {
    errCode: `${TRANSACTION_SERVICE_CODE}_ERR_00003`,
    httpStatusCode: 400,
    errDataDefault: 'Invalid category',
  },
  INVALID_TRANSACTION: {
    errCode: `${TRANSACTION_SERVICE_CODE}_ERR_00004`,
    httpStatusCode: 400,
    errDataDefault: 'Invalid transaction',
  },
} as const satisfies ServiceErrorMetadataMapType;

const TransactionServiceError = buildServiceError(
  TRANSACTION_SERVICE_ERROR_METADATA_MAP,
);

export default TransactionServiceError;
