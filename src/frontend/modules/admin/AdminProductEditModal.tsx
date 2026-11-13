'use client';

import { FormEvent, useState } from 'react';
import {
  ProductCategory,
  ProductItem,
  ProductSubcategory,
} from '@/types/product.types';

interface AdminProductEditModalProps {
  product: ProductItem;
  onClose: () => void;
  onSaved: (updated: ProductItem) => void;
}

const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: 'mujer', label: 'Colección Mujer' },
  { value: 'vestidos_familiares', label: 'Vestidos de Baño en Familia' },
  { value: 'pantalonetas_familiares', label: 'Pantalonetas en Familia' },
  { value: 'ninos', label: 'Línea Infantil (Niños & Niñas)' },
  { value: 'accesorios', label: 'Accesorios' },
];

const SUBCATEGORY_OPTIONS: { value: ProductSubcategory; label: string }[] = [
  { value: 'vestido_bano', label: 'Vestido de Baño' },
  { value: 'bikini', label: 'Bikini' },
  { value: 'enterizo', label: 'Enterizo' },
  { value: 'familia', label: 'Familia' },
  { value: 'pantaloneta', label: 'Pantaloneta' },
  { value: 'nino', label: 'Niño' },
  { value: 'nina', label: 'Niña' },
  { value: 'resort', label: 'Resort' },
];

export default function AdminProductEditModal({
  product,
  onClose,
  onSaved,
}: AdminProductEditModalProps) {
  const [name, setName] = useState(product.name);
  const [colorName, setColorName] = useState(product.colorName);
  const [category, setCategory] = useState<ProductCategory>(product.category);
  const [subcategory, setSubcategory] = useState<ProductSubcategory>(product.subcategory);
  const [theme, setTheme] = useState(product.theme ?? '');
  const [price, setPrice] = useState(product.price);
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice ?? '');
  const [originalPriceTouched, setOriginalPriceTouched] = useState(false);
  const [description, setDescription] = useState(product.description);
  const [material, setMaterial] = useState(product.material);
  const [sizesText, setSizesText] = useState(product.sizes.join(', '));
  const [featuresText, setFeaturesText] = useState(product.features.join('\n'));
  const [primaryImage, setPrimaryImage] = useState(product.primaryImage);
  const [hoverImage, setHoverImage] = useState(product.hoverImage ?? '');
  const [badge, setBadge] = useState(product.badge ?? '');
  const [isNew, setIsNew] = useState(Boolean(product.isNew));
  const [featured, setFeatured] = useState(Boolean(product.featured));

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePriceChange = (nextPrice: string) => {
    setPrice(nextPrice);
    if (!originalPriceTouched && nextPrice.trim() !== product.price.trim()) {
      setOriginalPrice(product.price);
    }
  };

  const handleClearOriginalPrice = () => {
    setOriginalPriceTouched(true);
    setOriginalPrice('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSaving(true);

    const parsedSizes = sizesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedFeatures = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      const response = await fetch(`/api/admin/products/${encodeURIComponent(product.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          name: name.trim(),
          colorName: colorName.trim(),
          category,
          subcategory,
          theme: theme.trim() || null,
          price: price.trim(),
          originalPrice: originalPrice.trim() ? originalPrice.trim() : null,
          description: description.trim(),
          material: material.trim(),
          sizes: parsedSizes,
          features: parsedFeatures,
          primaryImage: primaryImage.trim(),
          hoverImage: hoverImage.trim() || null,
          badge: badge.trim() || null,
          isNew,
          featured,
        }),
      });

      const payload = (await response.json()) as {
        success: boolean;
        data?: ProductItem;
        error?: string;
      };

      if (!response.ok || !payload.success || !payload.data) {
        setErrorMessage(payload.error || 'No se pudo guardar el producto.');
        return;
      }

      onSaved(payload.data);
    } catch {
      setErrorMessage('Error de conexión al guardar cambios.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-orange-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera Modal */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-orange-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={primaryImage || product.primaryImage}
              alt={colorName}
              className="w-11 h-11 rounded-xl object-cover border border-orange-100 shrink-0"
            />
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                Editando Artículo • {product.id}
              </span>
              <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900 truncate">
                {colorName || product.colorName}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar editor"
            className="p-2 rounded-full bg-orange-50 text-gray-500 hover:text-primary hover:bg-orange-100 transition-colors cursor-pointer"
          >
            <span className="material-icons-outlined text-xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <span className="material-icons-outlined text-base">error_outline</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Bloque de Precios con Vista Previa de Tachado */}
          <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-icons-outlined text-primary text-lg">sell</span>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-800">
                  Precio & Descuento Automático
                </h3>
              </div>

              <div className="flex items-baseline gap-2 bg-white px-3 py-1.5 rounded-xl border border-orange-100">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  Vista previa:
                </span>
                <span className="text-sm sm:text-base font-bold text-primary font-display">
                  {price || '$0 COP'}
                </span>
                {originalPrice.trim() && (
                  <span className="text-xs text-gray-400 line-through">
                    {originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Precio Actual (COP)
                </label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  placeholder="$145.000 COP"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-orange-200 bg-white text-sm text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600">
                    Precio Anterior Tachado (COP)
                  </label>
                  {originalPrice && (
                    <button
                      type="button"
                      onClick={handleClearOriginalPrice}
                      className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Quitar tachado
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={originalPrice}
                  onChange={(e) => {
                    setOriginalPriceTouched(true);
                    setOriginalPrice(e.target.value);
                  }}
                  placeholder="Ej: $165.000 COP (opcional)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-orange-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>
          </div>

          {/* Información Principal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Título Corto / Color (Naranja en Tarjeta)
              </label>
              <input
                type="text"
                required
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Nombre Completo (Modal & WhatsApp)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Subcategoría
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value as ProductSubcategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {SUBCATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Material y Confección
              </label>
              <input
                type="text"
                required
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Tallas (separadas por coma)
              </label>
              <input
                type="text"
                value={sizesText}
                onChange={(e) => setSizesText(e.target.value)}
                placeholder="S, M, L, XL"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Temática / Personaje (Opcional)
              </label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Ej: Spiderman, Flores, Tropical"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Etiqueta / Badge (Filtro Favoritos / Exclusivos)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Ej: Bestseller, Nuevo, Edición Limitada"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Descripción y Características */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Descripción del Producto
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Características (una por línea)
              </label>
              <textarea
                rows={4}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Imágenes y Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Imagen Principal (Modelo)
              </label>
              <input
                type="text"
                required
                value={primaryImage}
                onChange={(e) => setPrimaryImage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Imagen Secundaria (Solo Prenda / Escena 2)
              </label>
              <input
                type="text"
                value={hoverImage}
                onChange={(e) => setHoverImage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-1">
            <label className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>Destacado / Favorito</span>
            </label>

            <label className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>Novedad</span>
            </label>
          </div>

          {/* Botones de Acción */}
          <div className="pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-orange-600 disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-icons-outlined text-base">save</span>
              <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
