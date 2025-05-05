import { ServiceErrorMetadataMapType } from '@/error/service/ServiceError';
import { SERVICE_CODE } from '@/constant/service';
import buildServiceError from '@/error/service/buildServiceError';

const CATEGORY_SERVICE_CODE = SERVICE_CODE.CATEGORY_SERVICE;

export const CATEGORY_SERVICE_ERROR_METADATA_MAP = {
  CATEGORY_NOT_FOUND: {
    errCode: `${CATEGORY_SERVICE_CODE}_ERR_00001`,
    httpStatusCode: 404,
    errDataDefault: 'Category not found',
  },
  CATEGORY_NAME_ALREADY_EXISTS: {
    errCode: `${CATEGORY_SERVICE_CODE}_ERR_00002`,
    httpStatusCode: 409,
    errDataDefault: 'Category name already exists',
  },
} as const satisfies ServiceErrorMetadataMapType;

const CategoryServiceError = buildServiceError(
  CATEGORY_SERVICE_ERROR_METADATA_MAP,
);

export default CategoryServiceError;
