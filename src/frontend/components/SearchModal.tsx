'use client';

import { useState, useMemo, useEffect } from 'react';
import { ALL_PRODUCTS } from '@/constants/landing.data';
import { ProductItem } from '@/types/product.types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
}

/**
 * SearchModal Component
 * Búsqueda instantánea en el catálogo de Nana Home (Mujer y Niños).
 */
export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleClose = () => {
    setSearchTerm('');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase().trim();
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.colorName.toLowerCase().includes(query) ||
        (p.theme && p.theme.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de Entrada */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-3">
          <span className="material-icons-outlined text-gray-400 text-2xl">search</span>
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, color o personaje (ej: Spiderman, Rojo, Batman, Flores)..."
            className="flex-1 bg-transparent border-none text-base sm:text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 transition-colors"
          >
            <span className="material-icons-outlined text-xl">close</span>
          </button>
        </div>

        {/* Resultados o Sugerencias Rápidas */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-6">
          {!searchTerm.trim() ? (
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3">
                Búsquedas Populares
              </p>
              <div className="flex flex-wrap gap-2">
                {['Vestido Rojo', 'Spiderman', 'Batman', 'Azul Océano', 'Gatita', 'Flores', 'Blanco'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSearchTerm(chip)}
                    className="px-3 py-1.5 rounded-full bg-orange-50 text-xs font-medium text-gray-700 hover:bg-primary hover:text-white transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8">
              <span className="material-icons-outlined text-4xl text-gray-300 mb-2">
                search_off
              </span>
              <p className="text-sm font-medium text-gray-700">
                No encontramos productos con &ldquo;{searchTerm}&rdquo;
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Intenta buscar por color (azul, rojo) o por personaje (spiderman, hulk, batman).
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs uppercase font-bold tracking-wider text-primary mb-2">
                {searchResults.length} {searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </p>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    handleClose();
                    onSelectProduct(product);
                  }}
                  className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-orange-50/80 transition-all cursor-pointer group"
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="h-16 w-14 object-cover rounded-xl bg-orange-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {product.colorName} • {product.category === 'ninos' ? 'Línea Infantil' : 'Colección Mujer'}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-primary font-display">
                    {product.price}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
