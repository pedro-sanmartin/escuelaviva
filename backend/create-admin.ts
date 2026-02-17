// backend/create-admin.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL no está definida. Configura .env');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    // 1. Eliminar usuario existente (si hay)
    console.log('🔍 Eliminando usuario existente...');
    await prisma.user.deleteMany({ where: { email: 'admin@escuelaviva.cl' } });

    // 2. Hashear la contraseña
    const hashed = await bcrypt.hash('123456', 10);
    console.log('✅ Contraseña hasheada');

    // 3. Crear nuevo usuario
    const user = await prisma.user.create({
      data: {
        email: 'admin@escuelaviva.cl',
        password: hashed,
        name: 'Administrador',
        role: 'DIRECTIVO',
      },
    });

    console.log('✅ Usuario creado:', user.email);
    console.log('   Rol:', user.role);
    console.log('   Nombre:', user.name);
  } catch (err) {
    console.error(
      '❌ Error al crear usuario:',
      err instanceof Error ? err.message : err,
    );
  } finally {
    await prisma.$disconnect();
  }
}

void main();
