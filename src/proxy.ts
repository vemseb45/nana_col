import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js 16 Proxy (formerly Middleware)
 * Permite manejar redirecciones, cabeceras de seguridad y control de peticiones.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Log o auditoría en desarrollo si fuera necesario
  if (!request.nextUrl) return response;

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