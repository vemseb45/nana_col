export default function Hero() {
  return (
    <header className="relative pt-20 h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img alt="Tropical Beach Lifestyle" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWXW_53dVm9DZ1hgwWRG9oHXZoXUiu8fHbvWpQx2KRHuASrthvnpLPBavEfNqX6dI6wynTmZr1kXD5P85Gpn7obVRZNfXpa3zvNQeFmi6GovPh5PKTjCQUD9AAoHJrEr6nWWZhyWPUyU6yC_DiFlVUkRtimRE_dG3aTylItPRxXyEh1K1dyzel0joDpUgTLle84y8JvQm_zh6ISH-zPYMGhmifooKYiEK-goJOE5MDhvpLHl0nlOFEkO3HUiasTF1xLX8v9HWR_N8" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-light/20 to-background-light dark:via-background-dark/40 dark:to-background-dark"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <span className="inline-block py-1 px-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur text-xs uppercase tracking-widest mb-6 text-primary font-semibold shadow-sm">
          Verano 2024
        </span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white dark:text-white text-shadow mb-6">
          Nueva Colección <br /> <span className="italic text-primary-200">Tropical</span>
        </h1>
        <p className="text-white/90 dark:text-gray-200 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto drop-shadow-md">
          Descubre piezas diseñadas para abrazar el sol. Elegancia relajada inspirada en las costas del paraíso.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a className="px-8 py-4 bg-primary text-white text-sm uppercase tracking-widest font-bold hover:bg-orange-600 transition-all rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1" href="#collection">
            Ver Colección
          </a>
          <a className="px-8 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur text-gray-800 dark:text-white text-sm uppercase tracking-widest font-bold hover:bg-white dark:hover:bg-slate-700 transition-all rounded-full shadow-lg" href="#about">
            Ver Lookbook
          </a>
        </div>
      </div>
    </header>
  );
}