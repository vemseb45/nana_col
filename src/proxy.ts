import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthCookieName } from '@/backend/modules/auth/auth.cookies';
import { verifyAdminJwt } from '@/backend/modules/auth/jwt';

/**
 * Next.js 16 Proxy (formerly Middleware)
 * Permite manejar redirecciones, cabeceras de seguridad y protección de rutas /admin.
 */
export async function proxy(request: NextRequest) {
  if (!request.nextUrl) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get(getAuthCookieName())?.value;
    const payload = token ? await verifyAdminJwt(token) : null;

    if (!payload) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();

  // Cabeceras de seguridad recomendadas (Clean Code & Security)
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    /*
     * Ignora rutas estáticas, imágenes y recursos internos
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
