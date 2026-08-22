import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Esta es la función principal que Next.js estaba buscando
export function middleware(request: NextRequest) {
  // Por ahora, permitimos que todas las peticiones pasen sin interrupción.
  // Más adelante, aquí irá tu lógica de seguridad y autenticación.
  return NextResponse.next();
}

// Configuración recomendada para optimizar el rendimiento
export const config = {
  matcher: [
    /*
     * Ignora las rutas que coincidan con:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (imágenes optimizadas)
     * - favicon.ico y archivos .svg
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)',
  ],
};