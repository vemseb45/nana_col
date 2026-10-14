import type { NextConfig } from "next";

/**
 * Next.js Configuration - Nana.col
 * 
 * Estrategia de Caché en el Servidor y Red de Entrega (Vercel Edge CDN):
 * - Cabeceras Cache-Control con `public, max-age=31536000, immutable`:
 *   Indica al Edge CDN de Vercel y al navegador del usuario que almacene en caché
 *   las imágenes durante 1 año sin necesidad de re-descargarlas.
 * - Compresión automática Gzip y Brotli (`compress: true`).
 * - Formatos modernos AVIF y WebP activados.
 */
const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 año de caché
  },
  async headers() {
    return [
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/og/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:file(logo\\.png|favicon\\.ico|icon\\.png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
