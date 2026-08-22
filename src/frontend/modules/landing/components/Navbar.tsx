export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-orange-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button className="md:hidden p-2 rounded-md hover:bg-orange-50 dark:hover:bg-slate-800">
            <span className="material-icons-outlined">menu</span>
          </button>
          
          <div className="hidden md:flex space-x-8">
            {['Mujer', 'Hombre', 'Accesorios'].map((item) => (
              <a key={item} className="text-sm uppercase tracking-widest hover:text-primary transition-colors" href="#">
                {item}
              </a>
            ))}
          </div>

          <div className="flex-shrink-0 flex items-center justify-center">
            <a className="flex flex-col items-center" href="#">
              <img alt="Nana Logo" className="h-16 w-16 object-contain rounded-full shadow-sm hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyZONdkWhT3yxNTkgrXJvnKCLRXFPFBY0WgycUSRuHi0MCP7aWDHBgBRPU3KhKfYzhxQyJgIcmQPouxQbrGRnh9droaJx1kxpsnsEbOoFQLxX_FyLzO_NccQu1CxqzfQchdsOowMC0Z833TafYb9EYjspcFUkaDF_xVT0T1E7ZLOU6hnCzPNskkCDoK5vbAiq4DtHyBR4KOv4Vd05y1Sc29gD-AEU2BjmDCW2zR0lLEcvmNQVApEwOG23FWnMZz7pfG54j524hbnQ" />
            </a>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="hover:text-primary transition-colors">
              <span className="material-icons-outlined">search</span>
            </button>
            <button className="hover:text-primary transition-colors hidden sm:block">
              <span className="material-icons-outlined">favorite_border</span>
            </button>
            <button className="hover:text-primary transition-colors relative">
              <span className="material-icons-outlined">shopping_bag</span>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">2</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}