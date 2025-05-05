import db from '@/db';
import { User } from '@prisma/client';
import Result, { ResultPromiseType } from '@/utils/common/result';
import CategoryServiceError from '../error/CategoryServiceError';
import { findFirstCategoryByIdAndUser } from '../findCategories';

export const deleteCategoryById = async (
  id: number,
  user: User,
): ResultPromiseType<{}> => {
  const category = await findFirstCategoryByIdAndUser(id, user);

  if (!category) {
    return Result.error(new CategoryServiceError('CATEGORY_NOT_FOUND'));
  }

  await db.category.delete({
    where: { id, userId: user.id },
  });
  return Result.success({});
};
