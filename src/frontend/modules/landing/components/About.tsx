'use client';

import { getWhatsAppGeneralUrl } from '@/constants/brand.data';

/**
 * About Component (Nuestra Esencia)
 * Comunica el origen de la marca, el amor por el océano,
 * materiales sostenibles y confección artesanal.
 */
export default function About() {
  const whatsappUrl = getWhatsAppGeneralUrl();

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark overflow-hidden scroll-mt-20" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Imagen con bordes orgánicos */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-3xl transform -rotate-2 hidden md:block"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 aspect-[4/5] bg-orange-100 dark:bg-slate-800">
              <img
                alt="Esencia Nana Home - Mujer en la playa"
                className="w-full h-full object-cover object-center"
                src="/img/modelo_vestido_petroleo.jpeg"
                loading="lazy"
              />
            </div>
            
            {/* Sello Flotante */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-orange-100 dark:border-slate-700 hidden sm:flex items-center gap-3">
              <span className="material-icons-outlined text-3xl text-primary">eco</span>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">100% Sostenible</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Hecho con amor por el mar</p>
              </div>
            </div>
          </div>

          {/* Texto Descriptivo */}
          <div className="w-full md:w-1/2">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">
              Nuestra Filosofía
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 leading-tight">
              Diseñado para <br />
              <span className="text-primary italic font-normal">momentos eternos</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
              Nana nace de la brisa marina y la calidez del atardecer. Cada prenda es un homenaje a la belleza natural, creada con lycras y fibras de alta calidad que respetan el océano que tanto amamos.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
              Creemos en un verano sin prisas, en siluetas pensadas para favorecer cada tipo de cuerpo y en trajes infantiles que permiten a los más pequeños jugar sin preocupaciones gracias a nuestra protección UV certificada.
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <span className="material-icons-outlined text-primary mr-3 text-xl">eco</span>
                Materiales Sostenibles & Filtro UV 50+
              </li>
              <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <span className="material-icons-outlined text-primary mr-3 text-xl">handshake</span>
                Comercio Justo, Ético y Confección Artesanal
              </li>
              <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <span className="material-icons-outlined text-primary mr-3 text-xl">local_shipping</span>
                Envíos Seguros a Todo el País
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-primary text-white text-xs uppercase tracking-widest font-bold hover:bg-orange-600 transition-all rounded-full shadow-lg"
              >
                Conversar con Nuestra Creadora
              </a>
              <a
                href="#collection-mujer"
                className="inline-block border-b-2 border-primary text-primary font-bold pb-0.5 hover:text-orange-600 hover:border-orange-600 transition-colors text-xs uppercase tracking-wider"
              >
                Explorar Catálogo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}