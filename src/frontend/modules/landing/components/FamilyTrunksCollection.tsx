'use client';

import { useState } from 'react';
import { ProductItem } from '@/types/product.types';
import { FAMILY_TRUNKS_PRODUCTS } from '@/constants/landing.data';
import ProductCard from '@/frontend/components/ProductCard';

interface FamilyTrunksCollectionProps {
  onOpenQuickView: (product: ProductItem) => void;
}

type TrunksFilter = 'todos' | 'palmeras' | 'rayas' | 'marino';

/**
 * FamilyTrunksCollection Component
 * Sección especializada en pantalonetas playeras a juego para toda la familia.
 * Grid responsive de 2 columnas en móvil y 4 en desktop.
 */
export default function FamilyTrunksCollection({ onOpenQuickView }: FamilyTrunksCollectionProps) {
  const [activeFilter, setActiveFilter] = useState<TrunksFilter>('todos');

  const filteredTrunks = FAMILY_TRUNKS_PRODUCTS.filter((prod) => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'palmeras') {
      return prod.colorName.toLowerCase().includes('palmera') || prod.name.toLowerCase().includes('palmera');
    }
    if (activeFilter === 'rayas') {
      return prod.colorName.toLowerCase().includes('raya') || prod.name.toLowerCase().includes('raya');
    }
    if (activeFilter === 'marino') {
      return prod.colorName.toLowerCase().includes('marino') || prod.colorName.toLowerCase().includes('tibur');
    }
    return true;
  });

  return (
    <section id="collection-familia-pantalonetas" className="py-12 sm:py-20 lg:py-24 bg-orange-50/30 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-1 sm:mb-2">
              <span className="material-icons-outlined text-sm sm:text-base">beach_access</span>
              <span>Comodidad & Secado Rápido Familiar</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-gray-900 mb-1.5 sm:mb-3">
              Pantalonetas <span className="italic text-primary font-normal">en Familia</span>
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl">
              Modelos playeros a juego en microfibra ultraligera para mamá, papá, hijos e hijas. Cero retención de agua y protección solar UPF 50+.
            </p>
          </div>

          {/* Filtros de Estilo */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'todos', label: 'Todos (8)' },
              { id: 'palmeras', label: 'Palmeras & Sol' },
              { id: 'rayas', label: 'Líneas & Rayas' },
              { id: 'marino', label: 'Olas & Océano' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as TrunksFilter)}
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

        {/* Grid de Pantalonetas: 2 columnas en móvil, 4 en desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 lg:gap-8">
          {filteredTrunks.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
