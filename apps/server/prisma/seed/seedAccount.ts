import { faker } from '@faker-js/faker';
import type { PrismaClient } from '@prisma/client';

const seedAccount = async (prisma: PrismaClient) => {
  faker.seed(888);

  type CreateAccountType = Parameters<typeof prisma.account.create>[0]['data'];

  const data = [
    {
      name: 'Citi Costco Anywhere',
      cardIssuer: 'visa',
    },
    {
      name: 'Chase Freedom',
      cardIssuer: 'visa',
    },
    {
      name: 'MasterCard',
      cardIssuer: 'mastercard',
    },
    {
      name: 'Chase Freedom Unlimited',
      cardIssuer: 'visa',
    },
    {
      name: 'Chase Sapphire',
      cardIssuer: 'visa',
    },
  ].map<CreateAccountType>(({ name, cardIssuer }) => ({
    name,
    cardNumber: faker.finance.creditCardNumber(cardIssuer).replace(/-/g, ''),
    userId: 1,
    createdAt: faker.date.between({ from: '2024-01-01', to: '2024-11-01' }),
  }));

  await prisma.$transaction(
    data.map((account) =>
      prisma.account.upsert({
        where: { cardNumber: account.cardNumber, userId: account.userId },
        update: {},
        create: account,
      }),
    ),
  );
};

export default seedAccount;
