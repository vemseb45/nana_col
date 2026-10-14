'use client';

import { useState } from 'react';
import { ProductItem } from '@/types/product.types';
import { WOMEN_PRODUCTS } from '@/constants/landing.data';
import ProductCard from '@/frontend/components/ProductCard';

interface CollectionProps {
  onOpenQuickView: (product: ProductItem) => void;
}

type FilterTab = 'todos' | 'bestseller' | 'nuevo' | 'edicion_limitada';

/**
 * Collection Component (Vestidos de Baño Mujer)
 * Optimizado para móvil (grid de 2 columnas compactas) y desktop (4 columnas).
 * Primero muestra la foto en modelo y al pasar el mouse / tocar se ve solo el vestido.
 */
export default function Collection({ onOpenQuickView }: CollectionProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('todos');

  const filteredProducts = WOMEN_PRODUCTS.filter((prod) => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'bestseller') return prod.badge?.toLowerCase().includes('bestseller') || prod.featured;
    if (activeTab === 'nuevo') return prod.isNew || prod.badge?.toLowerCase().includes('nuevo');
    if (activeTab === 'edicion_limitada') return prod.badge?.toLowerCase().includes('limitada') || prod.badge?.toLowerCase().includes('exclusivo');
    return true;
  });

  return (
    <section id="collection-mujer" className="py-12 sm:py-20 lg:py-24 bg-white scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Cabecera de la Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary mb-1 sm:mb-2">
              <span className="material-icons-outlined text-sm sm:text-base">style</span>
              <span>Vestidos de Baño Femeninos</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-gray-900 mb-1.5 sm:mb-3">
              Colección Mujer
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm max-w-xl">
              Primero visualizas la prenda puesta en modelo. Pasa el cursor o toca la foto para apreciar solo el vestido.
            </p>
          </div>

          {/* Filtros por Pestañas */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'todos', label: 'Todos (8)' },
              { id: 'bestseller', label: 'Favoritos' },
              { id: 'nuevo', label: 'Novedades' },
              { id: 'edicion_limitada', label: 'Exclusivos' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as FilterTab)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-orange-50 text-gray-600 hover:bg-orange-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos: 2 columnas en móvil para evitar que se vean gigantes, 4 en desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
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