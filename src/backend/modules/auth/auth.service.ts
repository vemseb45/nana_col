import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/backend/shared/prisma';
import { ensureDefaultAdminSeeded } from './admin.seed';
import { getSessionDurationHours } from './auth.cookies';
import { signAdminJwt, verifyAdminJwt } from './jwt';

const BCRYPT_HASH_REGEX = /^\$2[aby]\$\d{2}\$.{53}$/;

export interface AuthenticatedAdmin {
  id: string;
  username: string;
  name: string;
  role: string;
  lastLoginAt: Date | null;
}

export interface LoginMetadata {
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface LoginResult {
  token: string;
  expiresAt: Date;
  admin: AuthenticatedAdmin;
}

/**
 * Verifica la contraseña contra el hash bcrypt de la DB.
 * Si la contraseña en la DB fue cambiada manualmente a texto plano,
 * valida en tiempo constante y la vuelve a encriptar automáticamente con bcrypt.
 */
async function verifyAndReencryptIfPlaintext(
  adminId: string,
  plainPassword: string,
  storedPassword: string
): Promise<boolean> {
  if (BCRYPT_HASH_REGEX.test(storedPassword)) {
    return bcrypt.compare(plainPassword, storedPassword);
  }

  const inputBuffer = Buffer.from(plainPassword, 'utf8');
  const storedBuffer = Buffer.from(storedPassword, 'utf8');

  if (inputBuffer.length === 0 || inputBuffer.length !== storedBuffer.length) {
    return false;
  }

  const isMatch = crypto.timingSafeEqual(inputBuffer, storedBuffer);
  if (isMatch) {
    const newHash = await bcrypt.hash(plainPassword, 12);
    await prisma.adminUser.update({
      where: { id: adminId },
      data: { passwordHash: newHash },
    });
  }

  return isMatch;
}

export class AuthService {
  async login(
    username: string,
    password: string,
    metadata: LoginMetadata = {}
  ): Promise<LoginResult | null> {
    await ensureDefaultAdminSeeded();

    const cleanUsername = username.trim().toLowerCase();
    const user = await prisma.adminUser.findFirst({
      where: {
        username: {
          equals: cleanUsername,
          mode: 'insensitive',
        },
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    const passwordValid = await verifyAndReencryptIfPlaintext(
      user.id,
      password,
      user.passwordHash
    );
    if (!passwordValid) {
      return null;
    }

    const sessionHours = getSessionDurationHours();
    const expiresAt = new Date(Date.now() + sessionHours * 3600 * 1000);
    const tokenId = crypto.randomUUID();
    const now = new Date();

    await prisma.$transaction([
      prisma.adminSession.create({
        data: {
          adminId: user.id,
          tokenId,
          ipAddress: metadata.ipAddress ?? null,
          userAgent: metadata.userAgent ?? null,
          expiresAt,
        },
      }),
      prisma.adminUser.update({
        where: { id: user.id },
        data: { lastLoginAt: now },
      }),
    ]);

    const token = await signAdminJwt(
      {
        sub: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        jti: tokenId,
      },
      sessionHours
    );

    return {
      token,
      expiresAt,
      admin: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        lastLoginAt: now,
      },
    };
  }

  async verifySessionToken(token: string | undefined): Promise<AuthenticatedAdmin | null> {
    if (!token) return null;

    const payload = await verifyAdminJwt(token);
    if (!payload) return null;

    const session = await prisma.adminSession.findUnique({
      where: { tokenId: payload.jti },
      include: { admin: true },
    });

    if (
      !session ||
      session.revokedAt !== null ||
      session.expiresAt <= new Date() ||
      !session.admin.isActive
    ) {
      return null;
    }

    return {
      id: session.admin.id,
      username: session.admin.username,
      name: session.admin.name,
      role: session.admin.role,
      lastLoginAt: session.admin.lastLoginAt,
    };
  }

  async logout(token: string | undefined): Promise<void> {
    if (!token) return;

    const payload = await verifyAdminJwt(token);
    if (!payload) return;

    await prisma.adminSession.updateMany({
      where: {
        tokenId: payload.jti,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async listRecentSessions(limit = 20) {
    return prisma.adminSession.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        ipAddress: true,
        userAgent: true,
        expiresAt: true,
        revokedAt: true,
        createdAt: true,
        admin: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
  }
}

export const authService = new AuthService();
