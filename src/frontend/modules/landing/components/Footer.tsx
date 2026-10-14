import { BRAND_DATA, getWhatsAppGeneralUrl } from "@/constants/brand.data";

/**
 * Footer Component
 * Pie de página oficial con el logo real /logo.png, enlaces de navegación,
 * información de contacto y canales de atención por WhatsApp.
 */
export default function Footer() {
  const whatsappUrl = getWhatsAppGeneralUrl();

  return (
    <footer id="contacto" className="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Columna 1: Marca y Logo Oficial */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-primary to-orange-300 shadow-sm flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Nana Home Logo"
                  className="h-full w-full object-cover rounded-full bg-white"
                />
              </div>
              <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                Nana <span className="text-primary italic font-normal">Home</span>
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
              Moda tropical premium para espíritus libres. Diseñado con amor por el océano, confección ética y protección solar de alta gama.
            </p>
            <div className="flex space-x-3">
              <a
                href={BRAND_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Nana Home"
                className="h-9 w-9 rounded-full bg-orange-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all flex items-center justify-center text-sm shadow-sm"
              >
                <span className="material-icons-outlined text-lg">photo_camera</span>
              </a>
              <a
                href={BRAND_DATA.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Nana Home"
                className="h-9 w-9 rounded-full bg-orange-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all flex items-center justify-center text-sm shadow-sm"
              >
                <span className="material-icons-outlined text-lg">facebook</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Nana Home"
                className="h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center text-sm shadow-sm"
              >
                <span className="material-icons-outlined text-lg">chat</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Colecciones */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs mb-6">
              Colecciones
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a href="#collection-mujer" className="hover:text-primary transition-colors">
                  Vestidos de Baño Mujer
                </a>
              </li>
              <li>
                <a href="#collection-kids" className="hover:text-primary transition-colors">
                  Línea Infantil Niños (Héroes)
                </a>
              </li>
              <li>
                <a href="#collection-kids" className="hover:text-primary transition-colors">
                  Línea Infantil Niñas (Encanto)
                </a>
              </li>
              <li>
                <a href="#categorias" className="hover:text-primary transition-colors">
                  Categorías Destacadas
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Ediciones Limitadas
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información y Guías */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs mb-6">
              Atención & Guías
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="material-icons-outlined text-emerald-600 text-sm">chat</span>
                  Guía de Tallas por WhatsApp
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Cuidado de Prendas & Lycras
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Protección Solar UPF 50+
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Nuestra Filosofía Sostenible
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto Oficial */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs mb-6">
              Contacto Directo
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start">
                <span className="material-icons-outlined mr-2 text-primary text-base">location_on</span>
                <span>{BRAND_DATA.address}</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons-outlined mr-2 text-primary text-base">email</span>
                <a href={`mailto:${BRAND_DATA.email}`} className="hover:text-primary transition-colors">
                  {BRAND_DATA.email}
                </a>
              </li>
              <li className="flex items-center">
                <span className="material-icons-outlined mr-2 text-emerald-600 text-base">chat</span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-semibold text-gray-800 dark:text-gray-200">
                  {BRAND_DATA.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra de Copyright y Legal */}
        <div className="border-t border-gray-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Nana Home. Todos los derechos reservados. Moda playera y vestidos de baño artesanales.
          </p>
          <div className="flex space-x-6 text-xs text-gray-400">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacidad</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Términos</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}