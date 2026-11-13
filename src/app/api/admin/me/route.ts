import { NextRequest } from 'next/server';
import { authService } from '@/backend/modules/auth/auth.service';
import { getAuthCookieName } from '@/backend/modules/auth/auth.cookies';
import { errorResponse, successResponse } from '@/backend/shared/api-response';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(getAuthCookieName())?.value;
  const admin = await authService.verifySessionToken(token);

  if (!admin) {
    return errorResponse('No autorizado', 401);
  }

  return successResponse({ admin });
}
