 import { CATEGORIES } from "@/constants/landing.data";

export default function Categories() {
  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
            Categorías Destacadas
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {CATEGORIES.map((cat, idx) => (
            <a key={idx} className="group block text-center" href="#">
              <div className={`relative overflow-hidden ${cat.radius} aspect-square mb-6 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]`}>
                <img 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  src={cat.img} 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <h3 className="font-display text-2xl text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{cat.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}