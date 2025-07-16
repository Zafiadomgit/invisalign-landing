import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('12345678', 10);
  await prisma.user.upsert({
    where: { email: 'odontoesteticabogota@gmail.com' },
    update: {
      nombre: 'Admin',
      apellido: 'Principal',
    },
    create: {
      email: 'odontoesteticabogota@gmail.com',
      password,
      nombre: 'Admin',
      apellido: 'Principal',
      phone: '',
      status: 'admin',
      role: 'admin',
    },
  });
  console.log('Usuario administrador creado o actualizado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 