export default function About() {
  return (
    <section className="py-20 bg-background-light dark:bg-background-dark overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-3xl transform -rotate-2 hidden md:block"></div>
            <img alt="Mujer en la playa" className="relative rounded-3xl shadow-2xl w-full z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD2a7VQiHiNKrP22ghpzI2DqvxKmej7E3POhVuziPoXxg87t3PmGQKK01j-ZCjCvCHAhSCQVWU2Mf-W9DUpV1-t7EaRw-RRF0g7xSoB9aADp6M3mbByXp59SKrQNjDtX_UlhZ0ckfsuuh31KOPV2FeyaICPowAxeeeiUlTq6wwxJgTtyVgFQ8INjma1ptVqOb4r4AyWI3u-UhVeKHoCDXL-BUa3N7movMKNK8jyms_4cPum5ijaMPMdXqGfBDpswVP3i6b1NQc1no" />
          </div>
          
          <div className="w-full md:w-1/2">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Nuestra Esencia</span>
            <h2 className="font-display text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 leading-tight">
              Diseñado para <br /> <span className="text-primary">momentos eternos</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              Nana nace de la brisa marina y los colores del atardecer. Cada prenda es un homenaje a la belleza natural, creada con materiales sostenibles que respetan el océano que tanto amamos.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="material-icons-outlined text-primary mr-3">eco</span> Materiales 100% Sostenibles
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="material-icons-outlined text-primary mr-3">handshake</span> Comercio Justo y Artesanal
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="material-icons-outlined text-primary mr-3">local_shipping</span> Envíos Carbono Neutral
              </li>
            </ul>
            <a className="inline-block border-b-2 border-primary text-primary font-bold pb-1 hover:text-orange-600 hover:border-orange-600 transition-colors" href="#">
              Leer nuestra historia
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}