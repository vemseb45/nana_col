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
 * Sección especializada en vestidos y trajes de baño para niños y niñas.
 * Destaca los estampados de personajes (Spiderman, Batman, Hulk, etc.)
 * y la protección solar certificada UPF 50+.
 */
export default function KidsCollection({ onOpenQuickView }: KidsCollectionProps) {
  const [activeFilter, setActiveFilter] = useState<KidsFilter>('todos');

  const filteredKids = KIDS_PRODUCTS.filter((prod) => {
    if (activeFilter === 'todos') return true;
    return prod.subcategory === activeFilter;
  });

  return (
    <section id="collection-kids" className="py-24 bg-orange-50/40 dark:bg-slate-900/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
              <span className="material-icons-outlined text-base">child_care</span>
              <span>Protección Solar UV 50+ & Diversión</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-3">
              Línea Infantil <span className="italic text-primary font-normal">Kids</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-xl">
              Diseñados con sus héroes y personajes favoritos: Spiderman, Batman, Hulk, Tiburón Aventura, Gatita y Cisne Encantado. Telas hipoalergénicas que protegen del sol todo el día.
            </p>
          </div>

          {/* Filtros Niños / Niñas */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'todos', label: 'Todos (7)' },
              { id: 'nino', label: 'Niños / Héroes (4)' },
              { id: 'nina', label: 'Niñas / Encanto (3)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as KidsFilter)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos Infantiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredKids.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
            />
          ))}
        </div>

        {/* Tarjeta de Garantía para Padres */}
        <div className="mt-16 bg-gradient-to-r from-orange-100/80 via-primary/10 to-orange-100/80 dark:from-slate-800 dark:via-primary/20 dark:to-slate-800 rounded-3xl p-8 border border-orange-200/60 dark:border-slate-700/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <span className="material-icons-outlined text-3xl text-primary p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm">
                shield
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Protección Solar UPF 50+
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Bloquea los rayos UV para proteger la delicada piel de tus hijos en piscina y playa.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <span className="material-icons-outlined text-3xl text-primary p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm">
                dry_cleaning
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Telas Hipoalergénicas
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Costuras suaves anti-roce y cierres con protector interno para cero irritaciones.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <span className="material-icons-outlined text-3xl text-primary p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm">
                palette
              </span>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Estampados de Alta Calidad
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  No se decoloran ni pierden brillo con el agua salada, arena o cloro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
