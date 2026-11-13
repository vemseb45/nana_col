'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLoginView() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (!response.ok || !payload.success) {
        setErrorMessage(payload.error || 'No fue posible iniciar sesión.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setErrorMessage('Error de conexión con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col justify-center items-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-orange-100 p-6 sm:p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-16 w-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-primary to-orange-300 shadow-md mb-3">
            <img
              src="/logo.png"
              alt="Nana.col Logo Oficial"
              className="h-full w-full object-cover rounded-full bg-white"
            />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
            Acceso Privado
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
            Panel Nana<span className="text-primary font-normal italic">.col</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
            Ingresa tus credenciales de administración para gestionar el catálogo.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <span className="material-icons-outlined text-base shrink-0">error_outline</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="admin-username"
              className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5"
            >
              Usuario
            </label>
            <div className="relative">
              <span className="material-icons-outlined text-gray-400 text-lg absolute left-3.5 top-1/2 -translate-y-1/2">
                person
              </span>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-orange-100 bg-orange-50/30 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5"
            >
              Contraseña
            </label>
            <div className="relative">
              <span className="material-icons-outlined text-gray-400 text-lg absolute left-3.5 top-1/2 -translate-y-1/2">
                lock
              </span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-orange-100 bg-orange-50/30 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar u ocultar contraseña"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-icons-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-orange-600 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-icons-outlined text-base">login</span>
            <span>{isSubmitting ? 'Verificando...' : 'Ingresar al Panel'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="material-icons-outlined text-sm text-primary">verified_user</span>
            Sesión segura HttpOnly
          </span>
          <Link href="/" className="text-primary font-semibold hover:underline">
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
