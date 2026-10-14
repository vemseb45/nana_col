import { BRAND_DATA, getWhatsAppGeneralUrl } from "@/constants/brand.data";

/**
 * Footer Component
 * Pie de página oficial:
 * - Logo real /logo.png
 * - Dirección física oficial: San Andresito Av. 68 Local P1 Segundo Piso
 * - Teléfono / WhatsApp oficial: +57 315 8684467
 * - Sin correos electrónicos (no se usan en la operación)
 */
export default function Footer() {
  const whatsappUrl = getWhatsAppGeneralUrl();

  return (
    <footer id="contacto" className="bg-white border-t border-gray-100 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
          {/* Columna 1: Marca y Logo Oficial */}
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-primary to-orange-300 shadow-sm flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Nana.col Logo Oficial"
                  className="h-full w-full object-cover rounded-full bg-white"
                />
              </div>
              <span className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                Nana<span className="text-primary italic font-normal">.col</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Moda tropical y vestidos de baño exclusivos para mujer y niños. Confección artesanal colombiana y protección solar certificada.
            </p>
            <div className="flex space-x-3">
              <a
                href={BRAND_DATA.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Nana.col"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-orange-50 text-gray-600 hover:bg-primary hover:text-white transition-all flex items-center justify-center text-sm shadow-sm"
              >
                <span className="material-icons-outlined text-base sm:text-lg">photo_camera</span>
              </a>
              <a
                href={BRAND_DATA.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Nana.col"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-orange-50 text-gray-600 hover:bg-primary hover:text-white transition-all flex items-center justify-center text-sm shadow-sm"
              >
                <span className="material-icons-outlined text-base sm:text-lg">facebook</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Nana.col"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center text-sm shadow-sm"
              >
                <span className="material-icons-outlined text-base sm:text-lg">chat</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Colecciones */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] sm:text-xs mb-3 sm:mb-6">
              Colecciones
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-gray-500">
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
            </ul>
          </div>

          {/* Columna 3: Información y Guías */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] sm:text-xs mb-3 sm:mb-6">
              Atención Directa
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-gray-500">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5 font-medium text-emerald-600">
                  <span className="material-icons-outlined text-sm">chat</span>
                  Asesoría de Tallas por WhatsApp
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Protección Solar UPF 50+
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Cuidado de Telas & Lycras
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Nuestra Filosofía de Confección
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4: Punto Físico y WhatsApp (Sin Email) */}
          <div>
            <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] sm:text-xs mb-3 sm:mb-6">
              Visítanos o Escríbenos
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-500">
              <li className="flex items-start">
                <span className="material-icons-outlined mr-2 text-primary text-base flex-shrink-0 mt-0.5">location_on</span>
                <span className="leading-snug">{BRAND_DATA.address}</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons-outlined mr-2 text-emerald-600 text-base flex-shrink-0">chat</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors font-bold text-gray-900"
                >
                  {BRAND_DATA.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center text-[11px] sm:text-xs text-gray-400">
                <span className="material-icons-outlined mr-2 text-primary text-base flex-shrink-0">schedule</span>
                <span>Lunes a Sábado: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra de Copyright */}
        <div className="border-t border-gray-100 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] sm:text-xs text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Nana.col. Todos los derechos reservados. San Andresito Av. 68, Bogotá.
          </p>
          <div className="flex space-x-4 sm:space-x-6 text-[11px] sm:text-xs text-gray-400">
            <span className="hover:text-primary transition-colors cursor-pointer">Catálogo Visual</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Términos</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}