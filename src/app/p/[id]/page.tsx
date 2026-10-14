import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_PRODUCTS } from '@/constants/landing.data';
import {
  BRAND_DATA,
  SITE_URL,
  getProductPagePath,
  getProductReference,
  getOgImagePath,
  getWhatsAppProductUrl,
} from '@/constants/brand.data';

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Pre-renderizado estático de todas las páginas de producto
 * para optimización SEO y previsualización instantánea de WhatsApp.
 */
export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

/**
 * Generación de Open Graph Metadata estricto para WhatsApp y redes sociales.
 * WhatsApp requiere imágenes livianas (<300KB), formato 1.91:1 (1200x630) y etiquetas completas.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Producto no encontrado | Nana.col',
      description: 'El diseño seleccionado no se encuentra disponible en Nana.col.',
    };
  }

  const ogImageUrl = `${SITE_URL}${getOgImagePath(product.primaryImage)}`;
  const canonicalUrl = `${SITE_URL}${getProductPagePath(product.id)}`;
  const title = `${product.name} | Nana.col`;
  const description = `${product.name} (${product.price}). Color: ${product.colorName}. Diseños exclusivos con asesoría personalizada por WhatsApp y envíos a todo Colombia.`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: BRAND_DATA.name,
      locale: 'es_CO',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${product.name} - Nana.col`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Página de Detalle de Producto / Vista Previa Enriquecida
 * Servida cuando el cliente o el asesor abren el enlace desde WhatsApp o redes sociales.
 */
export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const refCode = getProductReference(product.id);
  const whatsappUrl = getWhatsAppProductUrl({
    id: product.id,
    name: product.name,
    price: product.price,
    colorName: product.colorName,
  });

  const isKids = product.category === 'ninos';

  return (
    <div className="min-h-screen bg-background-light text-text-light flex flex-col">
      {/* Barra Superior con Logo y Navegación */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-orange-100/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform hover:scale-105"
            title="Volver a Nana.col"
          >
            <img
              src="/logo.png"
              alt="Nana.col Logo"
              className="h-10 w-auto object-contain rounded-full shadow-xs"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-gray-900 leading-tight">
                Nana<span className="text-primary">.col</span>
              </span>
              <span className="text-[10px] text-gray-500 tracking-wider font-medium uppercase">
                Colección 2026
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-primary transition-colors bg-orange-50/80 hover:bg-orange-100/70 px-3.5 py-1.5 rounded-full border border-orange-200/60"
          >
            <span className="material-icons-outlined text-base">arrow_back</span>
            <span>Ver Catálogo Completo</span>
          </Link>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Migas de Pan (Breadcrumb) */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href={isKids ? '/#collection-kids' : '/#collection-mujer'}
            className="hover:text-primary transition-colors"
          >
            {isKids ? 'Línea Infantil' : 'Colección Mujer'}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{product.name}</span>
        </nav>

        {/* Ficha de Producto */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-orange-100/80 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 p-5 sm:p-8 lg:p-10">
            {/* Columna Izquierda: Fotografías */}
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-orange-50/40 border border-orange-100/60 shadow-inner">
                <img
                  src={product.primaryImage}
                  alt={`${product.name} en modelo - Nana.col`}
                  className="w-full h-full object-cover object-center"
                />

                {/* Badge de Referencia */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm border border-orange-100">
                  {refCode}
                </span>

                {product.badge && (
                  <span
                    className={`absolute top-3 right-3 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm ${
                      product.badgeColor || 'bg-primary'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Si tiene foto exclusiva de la prenda, mostrar miniatura / segunda vista */}
              {product.hoverImage && (
                <div className="flex items-center gap-3 p-3 bg-orange-50/40 rounded-xl border border-orange-100/60">
                  <div className="relative w-16 h-20 rounded-lg overflow-hidden border border-orange-200/80 bg-white flex-shrink-0">
                    <img
                      src={product.hoverImage}
                      alt={`${product.name} prenda`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-gray-800">Vista de la prenda sola</p>
                    <p className="text-gray-500">
                      Fotografía del corte y textura sin modelo
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Columna Derecha: Información y Asesoría WhatsApp */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Categoría y Referencia */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                    {isKids ? 'Línea Infantil UPF 50+' : 'Colección Mujer'}
                  </span>
                  <span className="text-xs font-mono font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {refCode}
                  </span>
                </div>

                {/* Nombre y Precio */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-xl sm:text-2xl font-display font-bold text-primary mt-2">
                    {product.price}
                  </p>
                </div>

                {/* Color */}
                <div className="pt-2 border-t border-orange-100/60">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Color / Estampado
                  </p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {product.colorName}
                  </p>
                </div>

                {/* Descripción */}
                <div className="pt-2 border-t border-orange-100/60">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Descripción
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mt-1">
                    {product.description}
                  </p>
                </div>

                {/* Tallas Disponibles */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="pt-2 border-t border-orange-100/60">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1.5">
                      Tallas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 bg-orange-50 text-gray-800 text-xs font-semibold rounded-lg border border-orange-200/60"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Características destacadas */}
                {product.features && product.features.length > 0 && (
                  <div className="pt-2 border-t border-orange-100/60">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                      Beneficios & Confección
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="material-icons-outlined text-emerald-600 text-base">
                            check_circle
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Botones de Acción y Canal Directo */}
              <div className="space-y-3 pt-6 border-t border-orange-100/80">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span className="material-icons-outlined text-2xl">chat</span>
                  <span>Quiero Asesoría por WhatsApp</span>
                </a>

                <p className="text-center text-xs text-gray-500">
                  Respuesta inmediata • Confirmamos disponibilidad de tu talla y coordinamos tu entrega
                </p>

                {/* Tienda Física */}
                <div className="mt-4 p-3.5 bg-orange-50/60 rounded-xl border border-orange-100 flex items-start gap-3">
                  <span className="material-icons-outlined text-primary text-xl flex-shrink-0 mt-0.5">
                    storefront
                  </span>
                  <div className="text-xs text-gray-700">
                    <p className="font-bold text-gray-900">Tienda Física en Bogotá:</p>
                    <p>{BRAND_DATA.address}</p>
                    <p className="text-gray-500 mt-0.5">WhatsApp oficial: {BRAND_DATA.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página simple */}
      <footer className="mt-auto py-6 border-t border-orange-100/80 bg-white/70 text-center text-xs text-gray-500">
        <p>© 2026 Nana.col — Todos los derechos reservados. Moda playera y trajes de baño en Colombia.</p>
      </footer>
    </div>
  );
}
