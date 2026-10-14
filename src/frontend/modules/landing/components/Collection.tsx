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
 * Principio DRY: Reutiliza ProductCard
 * Soporta filtrado por novedades y favoritos
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
    <section id="collection-mujer" className="py-24 bg-white dark:bg-surface-dark/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
              <span className="material-icons-outlined text-base">style</span>
              <span>Vestidos de Baño Femeninos</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-3">
              Colección Mujer
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl">
              Pasa el cursor por las prendas para verlas en modelo. Cada pieza combina soporte anatómico, telas con filtro UV 50+ y secado rápido.
            </p>
          </div>

          {/* Filtros por Pestañas */}
          <div className="flex flex-wrap gap-2">
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
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-orange-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>

        {/* Banner Informativo Inferior */}
        <div className="mt-16 p-6 rounded-3xl bg-orange-50/70 dark:bg-slate-800/40 border border-orange-100 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <span className="material-icons-outlined text-3xl text-primary p-2 bg-white dark:bg-slate-700 rounded-2xl shadow-sm">
              verified
            </span>
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                Prendas 100% Confeccionadas con Amor
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ¿Dudas con tu talla o medidas? Te asesoramos en vivo por WhatsApp antes de tu pedido.
              </p>
            </div>
          </div>

          <a
            href="#about"
            className="text-xs uppercase tracking-wider font-bold text-primary hover:text-orange-600 flex items-center gap-1 transition-colors whitespace-nowrap"
          >
            Conocer nuestra esencia <span className="material-icons-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}