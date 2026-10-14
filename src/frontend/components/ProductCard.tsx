'use client';

import { useState } from 'react';
import { ProductItem } from '@/types/product.types';
import { getWhatsAppProductUrl } from '@/constants/brand.data';

interface ProductCardProps {
  product: ProductItem;
  onOpenQuickView: (product: ProductItem) => void;
}

/**
 * ProductCard Component
 * Principio SOLID: Single Responsibility Principle (SRP)
 * - Muestra PRIMERO la fotografía de la MODELO.
 * - Al pasar el mouse en PC o dar toque en celular, cambia a la foto de SOLO EL VESTIDO.
 * - En celulares incluye un selector táctil intuitivo [Modelo | Vestido].
 * - Enlace a WhatsApp con foto de referencia y precios en COP.
 */
export default function ProductCard({ product, onOpenQuickView }: ProductCardProps) {
  // Estado para alternar entre vista de modelo y solo vestido en móviles
  const [showDressOnMobile, setShowDressOnMobile] = useState<boolean>(false);

  const hasSecondaryImage = Boolean(product.hoverImage);
  const whatsappUrl = getWhatsAppProductUrl({
    id: product.id,
    name: product.name,
    price: product.price,
    colorName: product.colorName,
  });

  // Alternar vista táctil en dispositivos móviles
  const handleTouchToggle = (e: React.MouseEvent) => {
    if (hasSecondaryImage) {
      e.stopPropagation();
      setShowDressOnMobile((prev) => !prev);
    }
  };

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-orange-100/70 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Contenedor de Imagen con Efecto Hover e Interacción Móvil */}
      <div 
        onClick={handleTouchToggle}
        className="relative aspect-[3/4] w-full overflow-hidden bg-orange-50/50 cursor-pointer select-none"
      >
        {/* Imagen Principal: MODELO puesta */}
        <img
          src={product.primaryImage}
          alt={`${product.name} en modelo - Nana.col`}
          loading="lazy"
          className={`h-full w-full object-cover object-center transition-all duration-700 ${
            showDressOnMobile && hasSecondaryImage ? 'opacity-0' : 'opacity-100'
          } ${hasSecondaryImage ? 'group-hover:scale-105' : 'group-hover:scale-110'}`}
        />

        {/* Imagen Secundaria: SOLO EL VESTIDO (En hover en PC o activo en Móvil) */}
        {hasSecondaryImage && product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} (solo prenda) - Nana.col`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-in-out ${
              showDressOnMobile
                ? 'opacity-100'
                : 'opacity-0 md:group-hover:opacity-100'
            }`}
          />
        )}

        {/* Overlay suave en desktop */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badge de estado en esquina superior izquierda */}
        {product.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none">
            <span
              className={`${
                product.badgeColor || 'bg-primary text-white'
              } text-[9px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md backdrop-blur-md`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Botón selector táctil para Móvil y Desktop */}
        {hasSecondaryImage && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <button
              type="button"
              onClick={handleTouchToggle}
              title="Toca para cambiar entre modelo y solo vestido"
              className="flex items-center gap-1 bg-black/65 active:bg-primary backdrop-blur-md text-white text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full shadow transition-colors"
            >
              <span className="material-icons-outlined text-xs">sync</span>
              <span>{showDressOnMobile ? 'Vestido' : 'Modelo'}</span>
            </button>
          </div>
        )}

        {/* Botón de Acción en Hover para Desktop */}
        <div className="hidden md:flex absolute bottom-3 inset-x-3 z-10 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex-col gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="w-full py-2 px-3 bg-white/95 backdrop-blur text-gray-900 rounded-xl font-medium text-[11px] uppercase tracking-wider shadow-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-icons-outlined text-sm">visibility</span>
            Ver Detalle Completo
          </button>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Color y Tema */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-primary font-bold uppercase tracking-wider mb-0.5">
            <span className="truncate">{product.colorName}</span>
            {hasSecondaryImage && (
              <span className="text-[9px] text-gray-400 font-normal md:hidden">
                (Toca para alternar)
              </span>
            )}
          </div>

          {/* Título */}
          <h3 
            onClick={() => onOpenQuickView(product)}
            className="font-display text-xs sm:text-sm md:text-base text-gray-900 font-bold hover:text-primary transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Material resumido */}
          <p className="mt-0.5 text-[10px] sm:text-xs text-gray-500 line-clamp-1">
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
              className="md:hidden p-1.5 rounded-lg bg-orange-50 text-gray-700 text-xs"
            >
              <span className="material-icons-outlined text-sm block">visibility</span>
            </button>

            {/* Botón WhatsApp con enlace a foto */}
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
