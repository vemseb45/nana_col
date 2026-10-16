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
 * Modal interactivo:
 * - Muestra primero la foto en MODELO y permite alternar a SOLO VESTIDO.
 * - Botón de asesoría por WhatsApp con enlace directo a la foto de la prenda.
 * - Diseño 100% responsive optimizado para celulares.
 */
export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [selectedImageOverride, setSelectedImageOverride] = useState<string | null>(null);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  // Sincronización oficial de React 19 durante render
  if (product && product.id !== currentProductId) {
    setCurrentProductId(product.id);
    setSelectedImageOverride(null);
  }

  // Sincronización del overflow del body
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

  // Tecla Escape para cerrar
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
  const whatsappUrl = getWhatsAppProductUrl({
    id: product.id,
    name: product.name,
    price: product.price,
    colorName: product.colorName,
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar (X) */}
        <button
          onClick={onClose}
          aria-label="Cerrar vista rápida"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 text-gray-500 hover:text-gray-900 bg-white/80 rounded-full backdrop-blur-md shadow-md transition-transform hover:scale-110"
        >
          <span className="material-icons-outlined text-xl sm:text-2xl">close</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 p-4 sm:p-8">
          {/* Columna Izquierda: Visualización Completa Inmediata */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-orange-50/60 border border-orange-100/80 shadow-inner flex items-center justify-center p-2.5 sm:p-4">
              <img
                src={activeImage}
                alt={product.name}
                loading="eager"
                decoding="async"
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl drop-shadow-xs transition-transform duration-300"
              />

            </div>

            {/* Selector de vistas: Primero MODELO, luego SOLO VESTIDO */}
            {hasTwoImages && product.hoverImage && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedImageOverride(product.primaryImage)}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeImage === product.primaryImage
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 text-gray-600 hover:border-primary'
                  }`}
                >
                  <span className="material-icons-outlined text-sm">person</span>
                  Foto en Modelo
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedImageOverride(product.hoverImage!)}
                  className={`flex-1 py-2 px-2.5 rounded-xl border text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeImage === product.hoverImage
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 text-gray-600 hover:border-primary'
                  }`}
                >
                  <span className="material-icons-outlined text-sm">checkroom</span>
                  Solo Vestido
                </button>
              </div>
            )}
          </div>

          {/* Columna Derecha: Información del Producto */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-primary mb-1 block">
                {product.category === 'ninos' ? 'Colección Infantil' : 'Colección Tropical Mujer'} • {product.colorName}
              </span>

              <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-gray-900 font-bold mb-2 sm:mb-3">
                {product.name}
              </h2>

              {/* Precios en Moneda Colombiana (COP) */}
              <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-display">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                )}
                <span className="text-[10px] sm:text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-medium">
                  Catálogo Visual
                </span>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                {product.description}
              </p>

              {/* Material */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-orange-50/60 border border-orange-100">
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-900 mb-1 flex items-center gap-1">
                  <span className="material-icons-outlined text-primary text-sm sm:text-base">texture</span>
                  Composición & Material
                </h4>
                <p className="text-[11px] sm:text-xs text-gray-600">
                  {product.material}
                </p>
              </div>

              {/* Características Clave */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">
                  Beneficios Destacados
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center text-[11px] sm:text-xs text-gray-600">
                      <span className="material-icons-outlined text-primary text-sm mr-1">
                        check_circle
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tallas disponibles para consultar */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-900 mb-1.5">
                  Tallas Disponibles
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.sizes.map((sz) => (
                    <span
                      key={sz}
                      className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[10px] sm:text-xs font-semibold rounded-lg"
                    >
                      {sz}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Llamado a la acción: Contacto por WhatsApp con la foto */}
            <div className="pt-3 sm:pt-4 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-center"
              >
                <span className="material-icons-outlined text-lg sm:text-xl">chat</span>
                Quiero Asesoría por WhatsApp con esta Foto
              </a>
              <p className="text-[10px] sm:text-[11px] text-gray-400 text-center">
                El mensaje incluirá el nombre del vestido, precio y foto para coordinar tallas con una asesora.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
