import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('regi12345', 10);

  // Create or update the admin user
  await prisma.user.upsert({
    where: { email: 'suporte@gmail.com' },
    update: {},
    create: {
      email: 'suporte@gmail.com',
      name: 'Reginalde',
      username: '@regi',
      image: '',
      password: hashedPassword,
      role: 'ORGANIZER', // Link to the Admin role
    },
  });
}

// Fetch Customer role ID

console.log('Running seed...');

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
