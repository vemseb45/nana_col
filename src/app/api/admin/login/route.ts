import { NextRequest } from 'next/server';
import { z } from 'zod';
import { authService } from '@/backend/modules/auth/auth.service';
import { setAuthSessionCookie } from '@/backend/modules/auth/auth.cookies';
import { errorResponse, successResponse } from '@/backend/shared/api-response';

const loginSchema = z.object({
  username: z.string().trim().min(2, 'Usuario requerido').max(60),
  password: z.string().min(1, 'Contraseña requerida').max(128),
});

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0]?.message || 'Datos inválidos', 400);
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || null;
    const userAgent = request.headers.get('user-agent') || null;

    const result = await authService.login(parsed.data.username, parsed.data.password, {
      ipAddress,
      userAgent,
    });

    if (!result) {
      return errorResponse('Credenciales incorrectas o usuario inactivo.', 401);
    }

    const response = successResponse({
      admin: result.admin,
      expiresAt: result.expiresAt.toISOString(),
    });

    setAuthSessionCookie(response, result.token);
    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
    return errorResponse(message, 500);
  }
}
