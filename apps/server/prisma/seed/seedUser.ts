import bcrypt from 'bcrypt';
import type { PrismaClient } from '@prisma/client';

const seedUser = async (prisma: PrismaClient) => {
  const hashedPassword = await bcrypt.hash('demo1234', 10);

  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      username: 'Coder',
      password: hashedPassword,
    },
  });
};

export default seedUser;
