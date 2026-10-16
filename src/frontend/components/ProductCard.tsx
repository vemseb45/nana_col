'use client';

import { ProductItem } from '@/types/product.types';
import { getWhatsAppProductUrl } from '@/constants/brand.data';

interface ProductCardProps {
  product: ProductItem;
  onOpenQuickView: (product: ProductItem) => void;
}

/**
 * ProductCard Component
 * Principio SOLID: Single Responsibility Principle (SRP)
 * - Muestra la fotografía de la MODELO limpia (sin etiquetas superpuestas).
 * - Al pasar el cursor en PC, alterna suavemente a la foto de SOLO EL VESTIDO.
 * - Al dar clic en la imagen, abre de inmediato el modal de detalle del vestido.
 * - Título único: color y característica corta en color naranja oficial (text-primary).
 * - Enlace directo a WhatsApp con referencia oficial y precio en COP.
 */
export default function ProductCard({ product, onOpenQuickView }: ProductCardProps) {
  const hasSecondaryImage = Boolean(product.hoverImage);
  const whatsappUrl = getWhatsAppProductUrl({
    id: product.id,
    name: product.name,
    price: product.price,
    colorName: product.colorName,
  });

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-orange-100/70 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Contenedor de Imagen Limpio: Clic abre el modal, Hover en PC alterna a la prenda */}
      <div 
        onClick={() => onOpenQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-orange-50/50 cursor-pointer select-none"
        title={`Ver detalles de ${product.colorName}`}
      >
        {/* Imagen Principal: MODELO puesta */}
        <img
          src={product.primaryImage}
          alt={`${product.name} en modelo - Nana.col`}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover object-center transition-all duration-700 ${
            hasSecondaryImage ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
          }`}
        />

        {/* Imagen Secundaria: SOLO EL VESTIDO (Visible al pasar el mouse en PC) */}
        {hasSecondaryImage && product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} (solo prenda) - Nana.col`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500 ease-in-out opacity-0 md:group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Botón Flotante en Hover para Desktop */}
        <div className="hidden md:flex absolute bottom-3 inset-x-3 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex-col gap-2 pointer-events-none">
          <div className="w-full py-2 px-3 bg-white/95 backdrop-blur text-gray-900 rounded-xl font-medium text-[11px] uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5">
            <span className="material-icons-outlined text-sm text-primary">visibility</span>
            <span>Ver Detalle</span>
          </div>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Título Único: Color y Característica Corta en Color Naranja */}
          <h3 
            onClick={() => onOpenQuickView(product)}
            className="text-xs sm:text-sm md:text-base text-primary font-bold uppercase tracking-wider hover:opacity-80 transition-opacity cursor-pointer line-clamp-1 leading-snug"
            title={product.colorName}
          >
            {product.colorName}
          </h3>

          {/* Material resumido */}
          <p className="mt-1 text-[10px] sm:text-xs text-gray-500 line-clamp-1">
            {product.material}
          </p>
        </div>

        {/* Precios en COP y Acciones */}
        <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-gray-900 font-display">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Botón Ver Detalle (Móvil) */}
            <button
              type="button"
              onClick={() => onOpenQuickView(product)}
              aria-label="Ver detalle"
              className="md:hidden p-1.5 rounded-lg bg-orange-50 text-gray-700 text-xs hover:bg-orange-100 transition-colors"
            >
              <span className="material-icons-outlined text-sm block text-primary">visibility</span>
            </button>

            {/* Botón WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Quiero asesoría por WhatsApp con esta foto"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all text-[11px] sm:text-xs font-bold"
            >
              <span className="material-icons-outlined text-sm">chat</span>
              <span>Asesoría</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
