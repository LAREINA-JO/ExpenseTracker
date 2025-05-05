import db from '@/db';
import { User } from '@prisma/client';
import { ConditionalQuery } from '@/types/query';
import { Category } from '@expense-tracker/schemas';

export const findCategories = async (
  user: User,
  conditions: ConditionalQuery<Category, 'id' | 'createdAt'>,
) => {
  const { start = 0, limit = 100, orderBy, name, ...restProps } = conditions;

  const categories = await db.category.findMany({
    where: {
      ...restProps,
      userId: user.id,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    skip: start,
    take: limit,
    orderBy,
  });

  return categories;
};

export const findFirstCategoryByIdAndUser = async (id: number, user: User) => {
  const category = await db.category.findFirst({
    where: { id, userId: user.id },
  });

  return category;
};
