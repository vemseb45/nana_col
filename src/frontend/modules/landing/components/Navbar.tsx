'use client';

import { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/constants/landing.data';
import { getWhatsAppGeneralUrl } from '@/constants/brand.data';

interface NavbarProps {
  onSearchClick?: () => void;
}

/**
 * Navbar Component
 * - Logo oficial /logo.png proporcionado en escala adecuada para móvil y desktop.
 * - Enlaces directos por ancla a secciones.
 * - Acceso a asesoría directa por WhatsApp (+57 315 8684467).
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
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled
          ? 'bg-background-light/95 backdrop-blur-md shadow-md border-b border-orange-100/70'
          : 'bg-background-light/85 backdrop-blur-sm border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 sm:h-20">
          {/* Lado Izquierdo: Botón Hamburguesa Móvil o Enlaces de Navegación Desktop */}
          <div className="flex items-center">
            {/* Botón Hamburguesa Móvil */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú de navegación"
              className="md:hidden p-1.5 rounded-lg text-gray-700 hover:bg-orange-100/60 transition-colors"
            >
              <span className="material-icons-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            {/* Enlaces de Navegación Desktop */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[11px] lg:text-xs uppercase tracking-widest font-semibold text-gray-700 hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Logo Oficial de Nana.col - 100% Centrado Matemático */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <a
              href="#"
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none"
              title="Nana.col - Inicio"
            >
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-primary to-orange-300 shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Nana.col Logo Oficial"
                  className="h-full w-full object-cover rounded-full bg-white"
                />
              </div>
              <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-gray-900 hidden sm:inline">
                Nana<span className="text-primary font-normal italic">.col</span>
              </span>
            </a>
          </div>

          {/* Lado Derecho: Acciones del Header */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Botón de búsqueda */}
            {onSearchClick && (
              <button
                type="button"
                onClick={onSearchClick}
                aria-label="Buscar en el catálogo"
                title="Buscar prendas o personajes"
                className="p-1.5 sm:p-2 rounded-full text-gray-700 hover:text-primary hover:bg-orange-50 transition-colors"
              >
                <span className="material-icons-outlined text-xl">search</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-orange-100 bg-background-light px-4 pt-2 pb-5 space-y-2.5 shadow-xl animate-fadeIn">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-800 hover:bg-orange-100/60 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-2 border-t border-gray-100">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md"
            >
              <span className="material-icons-outlined text-base">chat</span>
              WhatsApp: +57 315 8684467
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}