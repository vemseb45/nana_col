import type { NextResponse } from 'next/server';

export function getAuthCookieName(): string {
  return process.env.AUTH_COOKIE_NAME?.trim() || 'syc_cos_session';
}

export function getSessionDurationHours(): number {
  const parsed = Number(process.env.AUTH_SESSION_HOURS);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return 4;
}

export function setAuthSessionCookie(
  response: NextResponse,
  token: string,
  hours = getSessionDurationHours()
): void {
  response.cookies.set(getAuthCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(hours * 3600),
  });
}

export function clearAuthSessionCookie(response: NextResponse): void {
  response.cookies.set(getAuthCookieName(), '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
