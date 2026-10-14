'use client';

import { getWhatsAppGeneralUrl } from '@/constants/brand.data';

/**
 * Newsletter / VIP Community Component
 * Orientado 100% a WhatsApp (el email no se usa en la marca).
 * Permite a los clientes unirse a la comunidad de sol para lanzamientos y descuentos.
 */
export default function Newsletter() {
  const whatsappUrl = getWhatsAppGeneralUrl();

  return (
    <section className="py-12 sm:py-20 bg-orange-50/70 relative overflow-hidden">
      {/* Círculos decorativos con efecto blur */}
      <div className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 bg-orange-300/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-3xl mx-auto px-4 text-center z-10">
        <span className="material-icons-outlined text-3xl sm:text-5xl text-primary mb-3 block">
          wb_sunny
        </span>
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-2 sm:mb-4">
          Únete a nuestra comunidad de sol
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto text-xs sm:text-base leading-relaxed">
          Recibe acceso anticipado a nuevas colecciones tropicales, lanzamientos de trajes infantiles y atención prioritaria por WhatsApp.
        </p>

        <div className="flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
          >
            <span className="material-icons-outlined text-lg sm:text-xl">chat</span>
            <span>Escribirnos por WhatsApp</span>
          </a>
        </div>

        <p className="text-[10px] sm:text-xs text-gray-400 mt-4">
          Atención personalizada de lunes a sábado de 9:00 AM a 7:00 PM.
        </p>
      </div>
    </section>
  );
}