import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const seedTransaction = async (prisma: PrismaClient) => {
  faker.seed(888);

  type CreateTransactionType = Parameters<
    typeof prisma.transaction.create
  >[0]['data'];
  const data = faker.helpers.multiple<CreateTransactionType>(
    () => ({
      amount: parseFloat(faker.finance.amount({ min: 1, max: 1000 })),
      accountId: faker.number.int({ min: 1, max: 5 }),
      categoryId: faker.number.int({ min: 1, max: 9 }),
      userId: 1,
      description: faker.lorem.words(5),
      transactionDate: faker.date.between({
        from: new Date('2024-01-01'),
        to: new Date('2024-12-01'),
      }),
    }),
    { count: 1000 },
  );

  await prisma.$transaction(
    data.map((transaction, id) =>
      prisma.transaction.upsert({
        where: {
          id: id + 1,
        },
        update: {},
        create: transaction,
      }),
    ),
  );
};

export default seedTransaction;
