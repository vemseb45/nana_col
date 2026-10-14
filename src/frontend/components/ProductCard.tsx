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
 * Se encarga exclusivamente de renderizar la tarjeta del producto,
 * el efecto hover de transición prenda/modelo y la interacción de consulta.
 */
export default function ProductCard({ product, onOpenQuickView }: ProductCardProps) {
  const hasSecondaryImage = Boolean(product.hoverImage);
  const whatsappUrl = getWhatsAppProductUrl(product.name, product.price);

  return (
    <article className="group relative flex flex-col h-full bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-orange-100/60 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Contenedor de Imagen con Efecto Hover */}
      <div 
        onClick={() => onOpenQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-orange-50/50 dark:bg-slate-800/60 cursor-pointer"
      >
        {/* Imagen Principal (Prenda de estudio o Modelo) */}
        <img
          src={product.primaryImage}
          alt={`${product.name} - Nana Home`}
          loading="lazy"
          className={`h-full w-full object-cover object-center transition-all duration-700 ${
            hasSecondaryImage ? 'group-hover:scale-105' : 'group-hover:scale-110'
          }`}
        />

        {/* Imagen Secundaria en Hover (Modelo puesto) si existe */}
        {hasSecondaryImage && product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} en modelo - Nana Home`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
        )}

        {/* Overlay suave en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Badge de estado en esquina superior izquierda */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`${
                product.badgeColor || 'bg-primary text-white'
              } text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md backdrop-blur-md`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Indicador de doble vista (Prenda y Modelo) */}
        {hasSecondaryImage && (
          <div className="absolute top-3 right-3 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
            <span 
              className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full"
              title="Pasa el mouse para ver puesto en modelo"
            >
              <span className="material-icons-outlined text-xs">sync</span>
              <span className="hidden sm:inline">Prenda / Modelo</span>
            </span>
          </div>
        )}

        {/* Botón de Acción en Hover: Ver Detalle */}
        <div className="absolute bottom-4 inset-x-4 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="w-full py-2.5 px-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur text-gray-900 dark:text-white rounded-xl font-medium text-xs uppercase tracking-wider shadow-lg hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-icons-outlined text-sm">visibility</span>
            Ver Detalle Completo
          </button>
        </div>
      </div>

      {/* Información del Producto */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Categoría o Tema */}
          <div className="flex items-center justify-between text-xs text-primary font-semibold uppercase tracking-wider mb-1">
            <span>{product.colorName}</span>
            {product.theme && (
              <span className="text-gray-400 dark:text-gray-500 lowercase">
                #{product.theme}
              </span>
            )}
          </div>

          {/* Título */}
          <h3 
            onClick={() => onOpenQuickView(product)}
            className="font-display text-lg text-gray-900 dark:text-white font-medium hover:text-primary transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Breve descripción o material */}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
            {product.material}
          </p>
        </div>

        {/* Precio y Botón de Consulta por WhatsApp */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block">Precio Ref.</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-gray-900 dark:text-white">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Consultar disponibilidad por WhatsApp"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all text-xs font-semibold"
          >
            <span className="material-icons-outlined text-sm">chat</span>
            <span>Consultar</span>
          </a>
        </div>
      </div>
    </article>
  );
}
