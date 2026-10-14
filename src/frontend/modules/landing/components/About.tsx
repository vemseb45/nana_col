'use client';

import { getWhatsAppGeneralUrl, BRAND_DATA } from '@/constants/brand.data';

/**
 * About Component (Nuestra Esencia)
 * Comunica el origen de la marca, confección artesanal,
 * tienda física en San Andresito Av. 68 y atención por WhatsApp.
 */
export default function About() {
  const whatsappUrl = getWhatsAppGeneralUrl();

  return (
    <section className="py-12 sm:py-24 bg-background-light overflow-hidden scroll-mt-16 sm:scroll-mt-20" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
          {/* Imagen con bordes orgánicos */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-full h-full border-2 border-primary rounded-2xl sm:rounded-3xl transform -rotate-2 hidden sm:block"></div>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl z-10 aspect-[4/5] bg-orange-100 max-w-sm sm:max-w-none mx-auto">
              <img
                alt="Esencia Nana.col - Moda playera"
                className="w-full h-full object-cover object-center"
                src="/img/modelo_vestido_petroleo.jpeg"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Sello Flotante */}
            <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 z-20 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-orange-100 flex items-center gap-2 sm:gap-3">
              <span className="material-icons-outlined text-2xl sm:text-3xl text-primary">eco</span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-gray-900">100% Sostenible</p>
                <p className="text-[9px] sm:text-[10px] text-gray-500">Protección UV 50+</p>
              </div>
            </div>
          </div>

          {/* Texto Descriptivo */}
          <div className="w-full md:w-1/2 text-left">
            <span className="text-primary font-bold tracking-widest uppercase text-[10px] sm:text-xs mb-1.5 sm:mb-3 block">
              Nuestra Filosofía
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-gray-900 mb-4 sm:mb-6 leading-tight">
              Diseñado para <br />
              <span className="text-primary italic font-normal">momentos eternos</span>
            </h2>
            <p className="text-gray-600 text-xs sm:text-base mb-3 sm:mb-6 leading-relaxed">
              Nana.col nace de la brisa marina y la calidez del sol. Cada prenda es un homenaje a la belleza natural, confeccionada con lycras colombianas de alta resistencia y trajes infantiles diseñados para el juego libre y seguro.
            </p>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              Visítanos en nuestra tienda física en Bogotá o coordina tu compra personalizada vía WhatsApp con envíos rápidos a nivel nacional.
            </p>

            <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-10 text-xs sm:text-sm">
              <li className="flex items-center text-gray-700">
                <span className="material-icons-outlined text-primary mr-2.5 text-base sm:text-xl">store</span>
                <span>{BRAND_DATA.address}</span>
              </li>
              <li className="flex items-center text-gray-700">
                <span className="material-icons-outlined text-primary mr-2.5 text-base sm:text-xl">eco</span>
                Materiales Sostenibles & Protección Solar UPF 50+
              </li>
              <li className="flex items-center text-gray-700">
                <span className="material-icons-outlined text-primary mr-2.5 text-base sm:text-xl">local_shipping</span>
                Envíos Seguros a Todo Colombia
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 sm:px-6 sm:py-3.5 bg-primary text-white text-[10px] sm:text-xs uppercase tracking-widest font-bold hover:bg-orange-600 transition-all rounded-full shadow-lg"
              >
                Hablar con una Asesora
              </a>
              <a
                href="#collection-mujer"
                className="inline-block border-b-2 border-primary text-primary font-bold pb-0.5 hover:text-orange-600 hover:border-orange-600 transition-colors text-[10px] sm:text-xs uppercase tracking-wider"
              >
                Ver Catálogo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}