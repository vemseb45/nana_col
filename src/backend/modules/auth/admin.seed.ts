import bcrypt from 'bcryptjs';
import { prisma } from '@/backend/shared/prisma';

const DEFAULT_ADMIN_USERNAME = 'admin';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || 'NanaAdmin2026!';

/**
 * Garantiza que exista un administrador inicial con contraseña encriptada en bcrypt.
 */
export async function ensureDefaultAdminSeeded(): Promise<void> {
  const existingCount = await prisma.adminUser.count();
  if (existingCount > 0) return;

  const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);
  await prisma.adminUser.create({
    data: {
      username: DEFAULT_ADMIN_USERNAME,
      name: 'Administradora Nana.col',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });
}
