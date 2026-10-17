'use client';

import { ProductItem } from '@/types/product.types';
import { FAMILY_SWIMWEAR_PRODUCTS } from '@/constants/landing.data';
import ProductCard from '@/frontend/components/ProductCard';

interface FamilySwimwearCollectionProps {
  onOpenQuickView: (product: ProductItem) => void;
}

/**
 * FamilySwimwearCollection Component
 * Sección especializada en vestidos y trajes de baño coordinados en familia.
 * Cada prenda cuenta con dos escenas fotográficas exclusivas en playa.
 */
export default function FamilySwimwearCollection({ onOpenQuickView }: FamilySwimwearCollectionProps) {
  return (
    <section id="collection-familia-vestidos" className="py-12 sm:py-20 lg:py-24 bg-white scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-1 sm:mb-2">
              <span className="material-icons-outlined text-sm sm:text-base">groups</span>
              <span>Sets Coordinados Mamá, Papá & Hijos</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-gray-900 mb-1.5 sm:mb-3">
              Vestidos de Baño <span className="italic text-primary font-normal">en Familia</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-2xl">
              Colección familiar con doble escena fotográfica. Pasa el cursor en PC o toca la foto para alternar entre la Escena 1 y la Escena 2 de cada prenda.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-orange-50 border border-orange-200/80 rounded-full text-[11px] sm:text-xs font-bold text-primary flex items-center gap-1.5">
              <span className="material-icons-outlined text-sm">collections</span>
              <span>Doble Escena Fotográfica</span>
            </span>
          </div>
        </div>

        {/* Grid de Productos: 2 columnas adaptadas para móvil y desktop centrado */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-8 max-w-4xl mx-auto">
          {FAMILY_SWIMWEAR_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>

        {/* Banner Informativo Familiar */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-7 bg-gradient-to-r from-orange-50/90 via-primary/5 to-orange-50/90 rounded-2xl border border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="material-icons-outlined text-2xl sm:text-3xl text-primary p-2.5 bg-white rounded-2xl shadow-xs">
              diversity_1
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                ¿Deseas combinar tallas para tu familia?
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-600">
                Personalizamos el set con las tallas exactas de cada integrante por WhatsApp.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/573158684467?text=Hola%20Nana.col%2C%20quisiera%20asesor%C3%ADa%20para%20un%20set%20de%20vestidos%20de%20ba%C3%B1o%20en%20familia."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="material-icons-outlined text-sm">chat</span>
            <span>Consultar Set Familiar</span>
          </a>
        </div>
      </div>
    </section>
  );
}
