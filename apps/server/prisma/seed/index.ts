import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'node:path';
import seedUser from './seedUser';
import seedAccount from './seedAccount';
import seedCategory from './seedCategory';
import seedTransaction from './seedTransaction';

async function main() {
  dotenv.config({
    path: path.join(
      __dirname,
      `../../env/.env.${process.env.NODE_ENV ?? 'development'}`,
    ),
  });

  const prisma = new PrismaClient();
  await seedUser(prisma);
  await seedAccount(prisma);
  await seedCategory(prisma);
  await seedTransaction(prisma);
}

main();
