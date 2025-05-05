import db from '@/db';
import { Category } from '@expense-tracker/schemas';
import { User } from '@prisma/client';
import Result, { ResultPromiseType } from '@/utils/common/result';
import { validCategoryInputConflict } from '../validCategory';

export const updateCategoryById = async (
  id: number,
  user: User,
  category: Partial<Category>,
): ResultPromiseType<{}> => {
  const { error, isError } = await validCategoryInputConflict(category, id);

  if (isError) {
    return Result.error(error);
  }

  await db.category.update({
    select: { id: true },
    where: { id, userId: user.id },
    data: category,
  });

  return Result.success({});
};
