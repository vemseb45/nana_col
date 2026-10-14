'use client';

/**
 * Hero Component
 * Ajustado para perfecta visualización y escala proporcional en celulares y pantallas grandes.
 */
export default function Hero() {
  return (
    <header className="relative pt-16 sm:pt-20 min-h-[500px] sm:min-h-[620px] h-[82vh] sm:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de Fondo con degradado refinado */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Colección Tropical Nana Home"
          className="w-full h-full object-cover object-center scale-105"
          src="/img/modelo_vestido_flores.jpeg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-light via-background-light/60 to-black/60"></div>
      </div>

      {/* Contenido Central */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-6 sm:mt-12">
        <div className="inline-flex items-center gap-1.5 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full bg-white/90 backdrop-blur-md text-[10px] sm:text-xs uppercase tracking-widest mb-4 sm:mb-6 text-primary font-bold shadow-md">
          <span className="material-icons-outlined text-xs sm:text-sm">wb_sunny</span>
          <span>Temporada Solar • Hecho en Colombia</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 font-bold tracking-tight text-shadow mb-3 sm:mb-6 leading-tight">
          Elegancia <br />
          <span className="italic font-normal text-primary">Tropical & Kids</span>
        </h1>

        <p className="text-gray-800 text-xs sm:text-base md:text-lg font-light mb-6 sm:mb-10 max-w-xl mx-auto drop-shadow leading-relaxed">
          Vestidos de baño femeninos de corte sofisticado y trajes infantiles con máxima protección UV 50+. Confección artesanal en Bogotá.
        </p>

        {/* Botones de Navegación Rápida */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none">
          <a
            href="#collection-mujer"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-primary text-white text-[11px] sm:text-xs uppercase tracking-widest font-bold hover:bg-orange-600 transition-all rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Colección Mujer</span>
            <span className="material-icons-outlined text-sm">arrow_downward</span>
          </a>

          <a
            href="#collection-kids"
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-3.5 bg-white/95 backdrop-blur-md text-gray-900 text-[11px] sm:text-xs uppercase tracking-widest font-bold hover:bg-white transition-all rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span className="material-icons-outlined text-sm text-primary">child_care</span>
            <span>Línea Niños (Héroes)</span>
          </a>
        </div>
      </div>
    </header>
  );
}