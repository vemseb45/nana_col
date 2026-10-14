import { CATEGORIES } from "@/constants/landing.data";

/**
 * Categories Component
 * Principio DRY: Mapeo de categorías con escala balanceada para pantallas móviles y desktop.
 */
export default function Categories() {
  return (
    <section id="categorias" className="py-10 sm:py-20 bg-background-light scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-primary mb-1 sm:mb-2 block">
            Explora por Colección
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-2 sm:mb-4">
            Categorías Destacadas
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.targetId}`}
              className="group block text-center cursor-pointer"
            >
              <div
                className={`relative overflow-hidden ${cat.radius} aspect-square max-w-[280px] sm:max-w-none mx-auto mb-4 sm:mb-6 shadow-lg sm:shadow-xl transition-transform duration-500 group-hover:scale-[1.03] bg-orange-50`}
              >
                <img
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  src={cat.img}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors"></div>

                <div className="absolute bottom-3 inset-x-3">
                  <span className="inline-block py-1 px-2.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-primary shadow">
                    {cat.tag}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-lg sm:text-2xl text-gray-800 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 max-w-xs mx-auto">
                {cat.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}