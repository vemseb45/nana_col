'use client';

import { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/constants/landing.data';
import { getWhatsAppGeneralUrl } from '@/constants/brand.data';

interface NavbarProps {
  onSearchClick?: () => void;
}

/**
 * Navbar Component
 * Utiliza el logo oficial /logo.png, menú responsive accesible,
 * navegación fluida por anclas y acceso directo a asesoría por WhatsApp.
 */
export default function Navbar({ onSearchClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = getWhatsAppGeneralUrl();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md shadow-md border-b border-orange-100/70 dark:border-slate-800'
          : 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Botón Hamburguesa Móvil */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú de navegación"
            className="md:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-orange-100/60 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-icons-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Enlaces de Navegación Desktop (Izquierda) */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs uppercase tracking-widest font-semibold text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Logo Central Oficial de Nana Home */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none"
              title="Nana Home - Inicio"
            >
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-primary to-orange-300 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Nana Home Logo Oficial"
                  className="h-full w-full object-cover rounded-full bg-white"
                />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white hidden lg:inline">
                Nana <span className="text-primary font-normal italic">Home</span>
              </span>
            </a>
          </div>

          {/* Acciones del Header (Derecha) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Botón de búsqueda / filtro rápido */}
            {onSearchClick && (
              <button
                type="button"
                onClick={onSearchClick}
                aria-label="Buscar en el catálogo"
                title="Buscar prendas o personajes"
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-icons-outlined text-xl">search</span>
              </button>
            )}

            {/* Asesoría Directa por WhatsApp (Reemplaza el carrito de compras pues es solo catálogo visual) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Hablar con una asesora por WhatsApp"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <span className="material-icons-outlined text-base">chat</span>
              <span className="hidden sm:inline">Asesoría</span>
            </a>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-orange-100 dark:border-slate-800 bg-background-light dark:bg-background-dark px-4 pt-2 pb-6 space-y-3 shadow-xl animate-fadeIn">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200 hover:bg-orange-100/60 dark:hover:bg-slate-800 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-3 border-t border-gray-100 dark:border-slate-800">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md"
            >
              <span className="material-icons-outlined text-lg">chat</span>
              Contactar Asesora por WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}