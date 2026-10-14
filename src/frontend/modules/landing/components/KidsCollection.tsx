'use client';

import { useState } from 'react';
import { ProductItem } from '@/types/product.types';
import { KIDS_PRODUCTS } from '@/constants/landing.data';
import ProductCard from '@/frontend/components/ProductCard';

interface KidsCollectionProps {
  onOpenQuickView: (product: ProductItem) => void;
}

type KidsFilter = 'todos' | 'nino' | 'nina';

/**
 * KidsCollection Component
 * Sección especializada en trajes y vestidos de baño para niños y niñas.
 * Ajustado a 2 columnas en móviles para evitar tamaños desproporcionados.
 */
export default function KidsCollection({ onOpenQuickView }: KidsCollectionProps) {
  const [activeFilter, setActiveFilter] = useState<KidsFilter>('todos');

  const filteredKids = KIDS_PRODUCTS.filter((prod) => {
    if (activeFilter === 'todos') return true;
    return prod.subcategory === activeFilter;
  });

  return (
    <section id="collection-kids" className="py-12 sm:py-20 lg:py-24 bg-orange-50/40 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-1 sm:mb-2">
              <span className="material-icons-outlined text-sm sm:text-base">child_care</span>
              <span>Protección Solar UV 50+ & Diversión</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-gray-900 mb-1.5 sm:mb-3">
              Línea Infantil <span className="italic text-primary font-normal">Kids</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl">
              Spiderman, Batman, Hulk, Tiburón Aventura, Gatita y Cisne. Diseñados con protección solar UPF 50+ para cuidar su piel en piscina y mar.
            </p>
          </div>

          {/* Filtros Niños / Niñas */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'todos', label: 'Todos (7)' },
              { id: 'nino', label: 'Niños / Héroes (4)' },
              { id: 'nina', label: 'Niñas / Encanto (3)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as KidsFilter)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-orange-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos Infantiles: 2 columnas en móvil */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 lg:gap-8">
          {filteredKids.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>

        {/* Tarjeta de Garantía para Padres */}
        <div className="mt-10 sm:mt-16 bg-gradient-to-r from-orange-100/80 via-primary/10 to-orange-100/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-orange-200/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="flex items-start gap-3">
              <span className="material-icons-outlined text-2xl sm:text-3xl text-primary p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-sm flex-shrink-0">
                shield
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5">
                  Protección Solar UPF 50+
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-600">
                  Bloquea hasta el 98% de la radiación solar para cuidar la piel infantil.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-icons-outlined text-2xl sm:text-3xl text-primary p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-sm flex-shrink-0">
                dry_cleaning
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5">
                  Telas Hipoalergénicas
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-600">
                  Costuras planas y cremallera con solapa protectora para cero roces.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-icons-outlined text-2xl sm:text-3xl text-primary p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-sm flex-shrink-0">
                palette
              </span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5">
                  Estampados de Alta Calidad
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-600">
                  No se decoloran ni desgastan con cloro, salitre ni lavados frecuentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
