const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const prisma = new PrismaClient();
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  
  if (!password) {
    if (process.env.NODE_ENV !== 'development') {
      console.error('FATAL: ADMIN_INITIAL_PASSWORD is required in production environments.');
      process.exit(1);
    }
    console.warn('Using insecure development fallback password.');
  }

  const finalPassword = password || 'change_this_immediately';
  const hashedPassword = await bcrypt.hash(finalPassword, 12);
  
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
