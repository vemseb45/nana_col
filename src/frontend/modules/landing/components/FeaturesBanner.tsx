import { BRAND_PILLARS } from "@/constants/landing.data";

/**
 * FeaturesBanner Component
 * Muestra los 4 pilares fundamentales de calidad y servicio de Nana Home.
 * Ajustado a 2 columnas en móviles para mantener proporciones óptimas.
 */
export default function FeaturesBanner() {
  return (
    <section className="py-8 sm:py-16 bg-white border-y border-orange-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {BRAND_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:items-center sm:text-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-orange-50/50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100/70 text-primary rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0">
                <span className="material-icons-outlined text-lg sm:text-2xl">{pillar.icon}</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-gray-900 text-xs sm:text-base mb-0.5 sm:mb-1">
                  {pillar.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
