import { cookies } from 'next/headers';
import { getAuthCookieName } from './auth.cookies';
import { authService, AuthenticatedAdmin } from './auth.service';

export async function getAuthenticatedAdminFromCookies(): Promise<AuthenticatedAdmin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;
  return authService.verifySessionToken(token);
}
