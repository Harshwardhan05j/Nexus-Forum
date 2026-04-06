const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  const hashedPassword = await bcrypt.hash('harshwardhan3519', 12);
  
  await prisma.user.upsert({
    where: { email: 'harshwardhan474@gmail.com' },
    update: { password: hashedPassword },
    create: {
      email: 'harshwardhan474@gmail.com',
      name: 'Admin',
      password: hashedPassword,
      emailVerified: new Date()
    }
  });

  console.log('Account configured successfully!');
  await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
