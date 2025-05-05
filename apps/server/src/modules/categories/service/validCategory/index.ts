import db from '@/db';
import { CategoryInput, CategoryInputError } from '@expense-tracker/schemas';
import Result, { ResultPromiseType } from '@/utils/common/result';
import ServiceError from '@/error/service/ServiceError';
import CategoryServiceError from '../error/CategoryServiceError';

export const validCategoryInputConflict = async (
  { name }: Partial<CategoryInput>,
  id?: number,
): ResultPromiseType<{}, ServiceError<CategoryInputError>> => {
  const otherCategory = await db.category.findFirst({
    where: {
      id: { not: id },
      name,
    },
  });

  if (!otherCategory) {
    return Result.success({});
  }

  return Result.error(
    new CategoryServiceError('CATEGORY_NAME_ALREADY_EXISTS', {
      name: 'you already have another category with the same name',
    }),
  );
};
