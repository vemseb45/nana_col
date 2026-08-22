export default function Newsletter() {
  return (
    <section className="py-24 bg-orange-50 dark:bg-slate-800/50 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-300/10 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        <span className="material-icons-outlined text-5xl text-primary mb-4">sunny</span>
        <h2 className="font-display text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
          Únete a nuestra comunidad de sol
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto">
          Recibe un 15% de descuento en tu primera compra, acceso anticipado a nuevas colecciones y consejos de estilo tropical.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input className="flex-1 px-6 py-4 rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tu correo electrónico" type="email" />
          <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl" type="button">
            Suscribirse
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4">Al suscribirte aceptas nuestra política de privacidad. Puedes cancelar cuando quieras.</p>
      </div>
    </section>
  );
}