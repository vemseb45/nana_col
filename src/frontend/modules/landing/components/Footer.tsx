export default function Footer() {
  return (
    <footer className="bg-white dark:bg-background-dark border-t border-gray-100 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-6">
              <img alt="Nana Logo Footer" className="h-10 w-10 object-contain rounded-full mr-3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3TJY0FbNGakGHgIyJWtvqMDTRNJG2ChQkYGwfz0wi6fCelyVnpd18LUiVZz8Xk3Lj1aYNGDuFIllMDbxU0J9EjBmt03t2FONnLsHCeiXI1KS1gOjGfJ2eYdqBpd_e1KoADD_DtTYK_YVlCxZO5Bvdjlvo0Xmk-VpKrz-DUh0LlJWPbY3DyKvvIIewt8_p-oFM-HcknGp_a6cFXVBM9AhiG17M1CAdsvG9sCABb04sp4HR1nM7RkgU1APPEPfpeC2msyoIGS1nrG8" />
              <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">Nana</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Moda tropical premium para espíritus libres. Diseñado con amor por el océano y la naturaleza.
            </p>
            <div className="flex space-x-4">
              <a className="text-gray-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">facebook</span></a>
              <a className="text-gray-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">photo_camera</span></a> 
              <a className="text-gray-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">alternate_email</span></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm mb-6">Comprar</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {['Novedades', 'Bikinis', 'Ropa de Playa', 'Accesorios', 'Tarjetas de Regalo'].map((item) => (
                <li key={item}><a className="hover:text-primary transition-colors" href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm mb-6">Ayuda</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              {['Envíos y Devoluciones', 'Guía de Tallas', 'Cuidado de Prendas', 'Contáctanos', 'FAQ'].map((item) => (
                <li key={item}><a className="hover:text-primary transition-colors" href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-sm mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start">
                <span className="material-icons-outlined mr-2 text-primary text-base">location_on</span>
                Av. del Mar 123, <br />Playa Paraíso, México
              </li>
              <li className="flex items-center">
                <span className="material-icons-outlined mr-2 text-primary text-base">email</span> hola@nanahome.com
              </li>
              <li className="flex items-center">
                <span className="material-icons-outlined mr-2 text-primary text-base">phone</span> +52 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © 2024 Nana Home. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-xs text-gray-400">
            {['Privacidad', 'Términos', 'Cookies'].map((item) => (
              <a key={item} className="hover:text-primary transition-colors" href="#">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}