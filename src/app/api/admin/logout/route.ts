import { NextRequest } from 'next/server';
import { authService } from '@/backend/modules/auth/auth.service';
import { clearAuthSessionCookie, getAuthCookieName } from '@/backend/modules/auth/auth.cookies';
import { successResponse } from '@/backend/shared/api-response';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(getAuthCookieName())?.value;
  await authService.logout(token);

  const response = successResponse({ loggedOut: true });
  clearAuthSessionCookie(response);
  return response;
}
