'use client';

import { useState, useEffect } from 'react';
import { ProductItem } from '@/types/product.types';
import { getWhatsAppProductUrl } from '@/constants/brand.data';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

/**
 * ProductDetailModal Component
 * Modal interactivo para visualizar a detalle el vestido de baño,
 * alternar entre prenda y modelo, y contactar directamente vía WhatsApp.
 */
export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [selectedImageOverride, setSelectedImageOverride] = useState<string | null>(null);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  // Patrón oficial de React 19 para sincronizar estado de props durante render sin efectos en cascada
  if (product && product.id !== currentProductId) {
    setCurrentProductId(product.id);
    setSelectedImageOverride(null);
  }

  // Sincronización con el DOM externo (overflow del body)
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [product]);

  // Manejo de tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const activeImage = selectedImageOverride || product.primaryImage;
  const hasTwoImages = Boolean(product.hoverImage);
  const whatsappUrl = getWhatsAppProductUrl(product.name, product.price);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-surface-dark rounded-3xl shadow-2xl border border-orange-100 dark:border-slate-800 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar (X) */}
        <button
          onClick={onClose}
          aria-label="Cerrar vista rápida"
          className="absolute top-4 right-4 z-20 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:white bg-white/80 dark:bg-slate-800/80 rounded-full backdrop-blur-md shadow-md transition-transform hover:scale-110"
        >
          <span className="material-icons-outlined text-2xl">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Columna Izquierda: Galería de Imágenes */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-orange-50 dark:bg-slate-800 shadow-inner">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className={`${product.badgeColor || 'bg-primary text-white'} text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md`}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Selector de vistas si cuenta con prenda y modelo */}
            {hasTwoImages && product.hoverImage && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedImageOverride(product.primaryImage)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeImage === product.primaryImage
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-primary'
                  }`}
                >
                  <span className="material-icons-outlined text-sm">checkroom</span>
                  Ver Prenda
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedImageOverride(product.hoverImage!)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    activeImage === product.hoverImage
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-primary'
                  }`}
                >
                  <span className="material-icons-outlined text-sm">person</span>
                  Ver en Modelo
                </button>
              </div>
            )}
          </div>

          {/* Columna Derecha: Información del Producto */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
                {product.category === 'ninos' ? 'Colección Infantil' : 'Colección Tropical Mujer'} • {product.colorName}
              </span>

              <h2 className="font-display text-2xl sm:text-3xl text-gray-900 dark:text-white font-bold mb-3">
                {product.name}
              </h2>

              {/* Precios */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary font-display">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-xs bg-orange-100 dark:bg-slate-800 text-orange-800 dark:text-orange-300 px-2.5 py-0.5 rounded-full font-medium">
                  Catálogo Visual
                </span>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Material */}
              <div className="mb-6 p-4 rounded-2xl bg-orange-50/60 dark:bg-slate-800/50 border border-orange-100 dark:border-slate-700/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1.5 flex items-center gap-1">
                  <span className="material-icons-outlined text-primary text-base">texture</span>
                  Composición & Material
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {product.material}
                </p>
              </div>

              {/* Características Clave */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2.5">
                  Beneficios Destacados
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                      <span className="material-icons-outlined text-primary text-sm mr-1.5">
                        check_circle
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tallas disponibles para consultar */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
                  Tallas Disponibles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <span
                      key={sz}
                      className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-lg"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Llamado a la acción: Contacto por WhatsApp */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                <span className="material-icons-outlined text-xl">chat</span>
                Consultar Disponibilidad por WhatsApp
              </a>
              <p className="text-[11px] text-gray-400 text-center">
                Te atenderá directamente una asesora de Nana Home con fotos adicionales y guía de tallas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
