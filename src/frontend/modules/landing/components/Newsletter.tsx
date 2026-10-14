'use client';

import { useState } from 'react';

/**
 * Newsletter Component
 * Captación de emails para novedades de temporada y lanzamientos de nuevas colecciones.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-24 bg-orange-50/70 dark:bg-slate-800/40 relative overflow-hidden">
      {/* Círculos decorativos con efecto blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-300/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        <span className="material-icons-outlined text-5xl text-primary mb-4 block">
          wb_sunny
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-gray-900 dark:text-white mb-4">
          Únete a nuestra comunidad de sol
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Recibe acceso anticipado a nuevas colecciones tropicales, lanzamientos de trajes infantiles y consejos de cuidado para tus prendas.
        </p>

        {subscribed ? (
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-3xl max-w-md mx-auto animate-fadeIn">
            <span className="material-icons-outlined text-3xl text-emerald-600 mb-2">
              check_circle
            </span>
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm mb-1">
              ¡Bienvenida a la familia Nana Home!
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Pronto recibirás nuestras novedades tropicales directamente en tu bandeja de entrada.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm shadow-sm"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl active:scale-95"
            >
              Suscribirse
            </button>
          </form>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Al suscribirte aceptas nuestra política de privacidad. Respetamos tu privacidad, cero spam.
        </p>
      </div>
    </section>
  );
}