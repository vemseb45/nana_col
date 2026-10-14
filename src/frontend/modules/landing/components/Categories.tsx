import { CATEGORIES } from "@/constants/landing.data";

/**
 * Categories Component
 * Principio DRY: Mapeo de categorías con enlace dinámico a cada sección.
 */
export default function Categories() {
  return (
    <section id="categorias" className="py-20 bg-background-light dark:bg-background-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-primary mb-2 block">
            Explora por Colección
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
            Categorías Destacadas
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.targetId}`}
              className="group block text-center cursor-pointer"
            >
              <div
                className={`relative overflow-hidden ${cat.radius} aspect-square mb-6 shadow-xl transition-transform duration-500 group-hover:scale-[1.03] bg-orange-50 dark:bg-slate-800`}
              >
                <img
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  src={cat.img}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors"></div>

                <div className="absolute bottom-4 inset-x-4">
                  <span className="inline-block py-1 px-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[11px] font-bold uppercase tracking-wider text-primary shadow">
                    {cat.tag}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-2xl text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">
                {cat.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}