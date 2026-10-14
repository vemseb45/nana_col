'use client';

/**
 * Hero Component
 * Presentación principal de Nana Home con llamado a acción para colección de mujer y niños.
 */
export default function Hero() {
  return (
    <header className="relative pt-20 min-h-[680px] h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de Fondo con degradado refinado */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Colección Tropical Nana Home"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          src="/img/modelo_vestido_flores.jpeg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/50 to-black/60 dark:from-background-dark dark:via-background-dark/70 dark:to-black/80"></div>
      </div>

      {/* Contenido Central */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12 sm:mt-16">
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-xs uppercase tracking-widest mb-6 text-primary font-bold shadow-lg">
          <span className="material-icons-outlined text-sm">wb_sunny</span>
          <span>Temporada Solar 2024 • Colección Exclusiva</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-900 dark:text-white font-bold tracking-tight text-shadow mb-6 leading-[1.1]">
          Elegancia <br />
          <span className="italic font-normal text-primary">Tropical & Kids</span>
        </h1>

        <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto drop-shadow leading-relaxed">
          Piezas diseñadas para abrazar el sol y el mar. Vestidos de baño femeninos de corte sofisticado y trajes infantiles con máxima protección UV 50+.
        </p>

        {/* Botones de Navegación Rápida */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#collection-mujer"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-xs uppercase tracking-widest font-bold hover:bg-orange-600 transition-all rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Ver Colección Mujer</span>
            <span className="material-icons-outlined text-sm">arrow_downward</span>
          </a>

          <a
            href="#collection-kids"
            className="w-full sm:w-auto px-8 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-gray-900 dark:text-white text-xs uppercase tracking-widest font-bold hover:bg-white dark:hover:bg-slate-700 transition-all rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span className="material-icons-outlined text-sm text-primary">child_care</span>
            <span>Línea Infantil Kids</span>
          </a>
        </div>
      </div>
    </header>
  );
}