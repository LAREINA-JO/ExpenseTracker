import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const seedCategory = async (prisma: PrismaClient) => {
  faker.seed(888);

  type CreateCategoryType = Parameters<
    typeof prisma.category.create
  >[0]['data'];

  const data = [
    'Travel',
    'Shopping',
    'Food & Drink',
    'Gas',
    'Groceries',
    'Bills & Utilities',
    'Personal',
    'Home',
    'Entertainment',
  ].map<CreateCategoryType>((name) => ({
    name,
    userId: 1,
    createdAt: faker.date.between({ from: '2024-01-01', to: '2024-11-01' }),
  }));

  await prisma.$transaction(
    data.map((category) =>
      prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      }),
    ),
  );
};

export default seedCategory;
