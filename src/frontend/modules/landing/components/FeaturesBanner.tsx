import { BRAND_PILLARS } from "@/constants/landing.data";

/**
 * FeaturesBanner Component
 * Muestra los 4 pilares fundamentales de calidad y servicio de Nana Home.
 * Principio DRY: Mapeo de constantes BRAND_PILLARS
 */
export default function FeaturesBanner() {
  return (
    <section className="py-16 bg-white dark:bg-background-dark border-y border-orange-100/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRAND_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="flex items-center sm:flex-col sm:text-center gap-4 p-4 rounded-2xl hover:bg-orange-50/50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="p-3.5 bg-orange-100/70 dark:bg-slate-800 text-primary rounded-2xl shadow-sm flex items-center justify-center">
                <span className="material-icons-outlined text-2xl">{pillar.icon}</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-gray-900 dark:text-white text-base mb-1">
                  {pillar.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
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
