import db from '@/db';
import { CategoryInput } from '@expense-tracker/schemas';
import { User } from '@prisma/client';
import Result from '@/utils/common/result';
import { validCategoryInputConflict } from '../validCategory';

export const addCategory = async (user: User, category: CategoryInput) => {
  const { error, isError } = await validCategoryInputConflict(category);
  if (isError) {
    return Result.error(error);
  }

  const newCategory = await db.category.create({
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    data: {
      ...category,
      userId: user.id,
    },
  });

  return Result.success(newCategory);
};
