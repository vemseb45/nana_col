'use client';

export default function ThemeToggle() {
  const toggleTheme = () => {
    // Alterna la clase 'dark' directamente en la etiqueta <html>
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button 
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-lg hover:scale-110 transition-transform"
    >
      <span className="material-icons-outlined block dark:hidden">dark_mode</span>
      <span className="material-icons-outlined hidden dark:block">light_mode</span>
    </button>
  );
}