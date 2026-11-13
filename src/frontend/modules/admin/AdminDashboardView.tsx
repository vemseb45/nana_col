'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductCategory, ProductItem } from '@/types/product.types';
import AdminProductEditModal from './AdminProductEditModal';

interface AdminSummary {
  id: string;
  username: string;
  name: string;
  role: string;
}

interface SessionAuditItem {
  id: string;
  ipAddress: string | null;
  userAgent: string | null;
  expiresAt: string;
  revokedAt: string | null;
  createdAt: string;
  admin: {
    username: string;
    name: string;
  };
}

interface AdminDashboardViewProps {
  admin: AdminSummary;
  initialProducts: ProductItem[];
}

type CategoryFilter = 'todos' | ProductCategory;

const CATEGORY_TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'mujer', label: 'Mujer' },
  { id: 'vestidos_familiares', label: 'Vestidos Familia' },
  { id: 'pantalonetas_familiares', label: 'Pantalonetas Familia' },
  { id: 'ninos', label: 'Niños & Niñas' },
];

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  mujer: 'Mujer',
  vestidos_familiares: 'Vestidos Familia',
  pantalonetas_familiares: 'Pantalonetas Familia',
  ninos: 'Niños & Niñas',
  accesorios: 'Accesorios',
};

export default function AdminDashboardView({
  admin,
  initialProducts,
}: AdminDashboardViewProps) {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [sessions, setSessions] = useState<SessionAuditItem[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'todos' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.colorName.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.theme && item.theme.toLowerCase().includes(q)) ||
        item.id.toLowerCase().includes(q)
      );
    });
  }, [products, selectedCategory, searchTerm]);

  const discountedCount = useMemo(
    () => products.filter((p) => Boolean(p.originalPrice)).length,
    [products]
  );

  const handleSavedProduct = (updated: ProductItem) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingProduct(null);
    setToastMessage(`"${updated.colorName}" actualizado correctamente.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
      router.push('/admin/login');
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleOpenSessions = async () => {
    setSessionsOpen(true);
    setLoadingSessions(true);
    try {
      const res = await fetch('/api/admin/sessions', { credentials: 'same-origin' });
      const payload = (await res.json()) as {
        success: boolean;
        data?: SessionAuditItem[];
      };
      if (payload.success && payload.data) {
        setSessions(payload.data);
      }
    } finally {
      setLoadingSessions(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light text-text-light flex flex-col">
      {/* Header Administrativo */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="h-10 w-10 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-primary to-orange-300 shadow-sm">
                <img
                  src="/logo.png"
                  alt="Nana.col Logo"
                  className="h-full w-full object-cover rounded-full bg-white"
                />
              </div>
              <span className="font-display text-lg sm:text-xl font-bold text-gray-900 hidden sm:inline">
                Nana<span className="text-primary font-normal italic">.col</span>
              </span>
            </Link>

            <div className="h-6 w-px bg-orange-100 hidden sm:block" />

            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                Panel Administrador
              </span>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                {admin.name} (@{admin.username})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOpenSessions}
              className="px-3 py-2 rounded-xl border border-orange-200 bg-orange-50/70 text-gray-700 hover:text-primary text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Ver registro de inicios de sesión"
            >
              <span className="material-icons-outlined text-base text-primary">history</span>
              <span className="hidden md:inline">Accesos</span>
            </button>

            <Link
              href="/"
              className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-icons-outlined text-base">storefront</span>
              <span className="hidden sm:inline">Ver Tienda</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-3 sm:px-4 py-2 rounded-xl bg-gray-900 hover:bg-primary text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-icons-outlined text-base">logout</span>
              <span className="hidden sm:inline">
                {isLoggingOut ? 'Saliendo...' : 'Salir'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Notificación Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-primary/40 flex items-center gap-2.5 text-xs sm:text-sm animate-fadeIn">
          <span className="material-icons-outlined text-primary">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
        {/* Resumen y Título */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-gray-900">
              Gestión de <span className="italic font-normal text-primary">Catálogo</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Edita precios, descripciones, tallas e imágenes. Al cambiar un precio, el valor anterior aparecerá tachado automáticamente.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <div className="px-4 py-2 rounded-2xl bg-white border border-orange-100 shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
                Total Artículos
              </span>
              <span className="text-lg font-bold text-gray-900 font-display">
                {products.length}
              </span>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-white border border-orange-100 shadow-xs">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">
                Con Precio Tachado
              </span>
              <span className="text-lg font-bold text-primary font-display">
                {discountedCount}
              </span>
            </div>
          </div>
        </div>

        {/* Filtros por Categoría + Buscador */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-orange-100 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {CATEGORY_TABS.map((tab) => {
                const count =
                  tab.id === 'todos'
                    ? products.length
                    : products.filter((p) => p.category === tab.id).length;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3.5 py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-orange-50 text-gray-600 hover:bg-orange-100'
                    }`}
                  >
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-80">
              <span className="material-icons-outlined text-gray-400 text-lg absolute left-3.5 top-1/2 -translate-y-1/2">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar vestido, color o descripción..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-orange-100 bg-orange-50/30 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>
        </div>

        {/* Grid de Artículos */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-orange-100 p-12 text-center">
            <span className="material-icons-outlined text-4xl text-orange-300 mb-2">
              inventory_2
            </span>
            <p className="text-sm text-gray-500">
              No se encontraron artículos con los filtros seleccionados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="bg-white rounded-2xl border border-orange-100/80 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-orange-50/50 overflow-hidden">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-gray-700 shadow-sm">
                    {CATEGORY_LABELS[product.category]}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary line-clamp-1">
                      {product.colorName}
                    </h3>
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1 mt-0.5">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 font-display">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setEditingProduct(product)}
                      className="px-3.5 py-2 rounded-xl bg-primary hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <span className="material-icons-outlined text-sm">edit</span>
                      <span>Editar</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Edición de Producto */}
      {editingProduct && (
        <AdminProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSaved={handleSavedProduct}
        />
      )}

      {/* Modal de Historial de Sesiones */}
      {sessionsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSessionsOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-orange-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-icons-outlined text-primary">verified_user</span>
                <h2 className="font-display text-lg font-bold text-gray-900">
                  Registro de Inicios de Sesión
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSessionsOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-primary hover:bg-orange-50 cursor-pointer"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto space-y-3">
              {loadingSessions ? (
                <p className="text-sm text-gray-500 text-center py-6">Cargando sesiones...</p>
              ) : sessions.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-6">Sin registros recientes.</p>
              ) : (
                sessions.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-2xl bg-orange-50/40 border border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <p className="font-bold text-gray-800">
                        {s.admin.name} (@{s.admin.username})
                      </p>
                      <p className="text-gray-500 truncate max-w-md">
                        IP: {s.ipAddress || 'Local'} • {s.userAgent || 'Navegador'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          s.revokedAt
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {s.revokedAt ? 'Cerrada' : 'Activa'}
                      </span>
                      <p className="text-[11px] text-gray-400 mt-1">
                        {new Date(s.createdAt).toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
