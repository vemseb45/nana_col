const PRODUCTS = [
  {
    name: "Vestido Atardecer",
    material: "Seda natural",
    price: "$120.00",
    oldPrice: null,
    badge: "Nuevo",
    badgeColor: "bg-white/90 dark:bg-slate-800/90 text-gray-900 dark:text-white",
    img1: "https://lh3.googleusercontent.com/aida-public/AB6AXuCz32amSLluW9OyCsxKFkhfv5wSsnCAmXeOVF-e-a8uNXbR7GEijAq762TT_VByI2F9ob7vWOnGBT9EZujkxAgyERvo_J3y80S1-1_7aRE7PGhKv8vhLTs3qn8gs1qsnyToOEL2C7Z0TeAQu0veFWndKju3G7Pj2XbSo8w-bFgFJt1E4ZC-juDrBGQ5fm_n4vu6vC7ygLPE4Bi-_qn0ABEvWLTJNFEPqYuHVAiyaBoDyWDRz007kX7bn58G4U3K_65Nv-ycGVLlwHk",
    img2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqFZOAqeveISDdHa9QKkTC7H-1oqLc5tVwUpj6pRwM6NdazgHaHmM0IcOMwnFIfhucC_sr6IteuJvgxhyuGwUUSONqXblY5xhcWvk1YhabxX8M3s7OeHoHVA4GFtaf5ciAXBu2-RfL476u8AgjFxs0GuaFhhwzYMmcmCwqAEVXnxSbonCWpmkCmegKVfqsjlBERkxoWSDhqXACZI7Aoq5QGWla8-31hy-LFgEUXma2ZPFRJ5BDmM3X2MwmMpv2dexaaf2E3fmVxHU"
  },
  {
    name: "Top Arena",
    material: "Lino 100%",
    price: "$85.00",
    oldPrice: null,
    badge: null,
    img1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaD8dwjmUyljykrCBrQ2ms_2bGzjqh42Pz_fdwj9ZtIP7YyS68P08YBVfj_CFk7b62gOaohsDhEeAn2JN1uefJtpQCOVAj7YXQekGEbPC07UmutBrkPnGF_8BZdFtwv7yiMr9oBQxQ_53RwNpkC6M7JOM3AWOLVlZ-bvXs3ZCZIsJmx9HyjnYpi1RO7IVP4VNn8nUsVxflcCkUEtUHc62Dm03qWXMQT2OhqtYj0STrTAqpxB93eXItEDQ0X5m3dGogHqkBTA25MaA",
    img2: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9Hovmci7_xELMEo3dijnIb3ftN9yJMpoG7Xxqj112J_D5Ai-1p3ejRhW_VVWpil9OnnhALD3ZOc4QkaxbFlVt09-O3rsa1GEPx8WjxXOWc1a0UKwpLi9_Fc-TuWA-RpJIl8XfZRaGVQtd375vKZ-LMrerHsaeATMWzxbXWc2FUDNt1q20NpOsv-qB13dvcJiSqnMd2YzZQaScqwJy4Dk3boI0XLLqTuVieLGtSwPVdzKNqWRlloV-NiXivgYC8NU8DwAFC-ymDpc"
  },
  {
    name: "Bikini Flora",
    material: "Set completo",
    price: "$68.00",
    oldPrice: "$85.00",
    badge: "-20%",
    badgeColor: "bg-primary/90 text-white",
    img1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPQUVUzFZbzYsiwRXdpTO4r4MfCWnluRjknoJWzXgAscD27QlEE_NQyGpDLBonjz6nWXuvbgyjCO-NcxO_GDXc3veX0WdZxz2gWBuyWdNgYqeWoTo52a2aJw3np-pjiOguTe93wC2Anxg9lBHToR91F4JL5yziz6lL5hZiJHpRTB8zuhTMxzyqmmuS5Z_ujAeeTFLsUqW8p1VhWUufkiSQ_yI7Yf4T1GM4sJvHivFRmbFaT8R4CLHouql6fjoNeaAMdV8OIEd17Ec",
    img2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB-SAIafvw_lMIU9IDqhPdSSco95EJmzsk0ULXMxGHW7N4zb4EEyc_hpte7uywE4T03g8DaWPJQX-r5-JcZBnjMTSHfKIn05fhKKm6n-0uZHfArG0v_PuuONm0bfQRqsF1Ln-BGq72MzkgGNSNPS6lHxhsroi8OpGUUhQQOvrmgSeVssNUuX5gLi8UNKoCl7evfogLUN_6odA08iBBa5h8DHaVLxtxDZ0A_YlP2O_SzxkzrYbLAprF1QvlHfT-aIreiODDbd4uNGc"
  },
  {
    name: "Sombrero Palma",
    material: "Hecho a mano",
    price: "$55.00",
    oldPrice: null,
    badge: null,
    img1: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVFd775WHyptZd_T66HX5rhqjP6Y7LQJkdHEqiqO6kU-OltnUBUF9iHYZPM4TzY_pZPTjH5YqNkOjj7BjLESEntoIIgs_E4cc6Es3gqa0dyUKS5HVr-8JsOqtHVAazeyjZFnX4EoyyeIlTjvr3NTOk7cfcZn0E-wwEnKAMh-ITEJ_q0Fm6toI5fuQ9rP5Zh27bq6ozfHetH1cRwayepAV5AsIzOGGsJ4mi7OPacKiP3DY4p-6HYle7_QEbFhjgTI0RMiExHOZxAVc",
    img2: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFKz28cT5C1su9-DH2AB7rvlC8BXXfshbcdzWSGAD5TNRm9fOb2qg03hxcViIyUiYr_Ts4ZGKsF4uj78YIhZcdCq1y83Xc9lRRSDmYh9wrp12XyBXK_sG3BZhamKpnMAkweWZTNMwLXwUOosxILAAGp9gxFtY70Q57M_t6eQFbp2yctdVRRG6m9HK4Ec09q6EW_b4xq3pEDuSiDDS1DSCoABNTTdDO-TXH2kela_OqJ2-x-Oh75Kcu2zczREkyRrGMzZDEB-q9g0M"
  }
];

export default function Collection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900" id="collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 dark:text-white mb-2">Favoritos del Sol</h2>
            <p className="text-gray-500 dark:text-gray-400">Piezas esenciales para tu próxima escapada.</p>
          </div>
          <a className="hidden md:flex items-center text-primary font-medium hover:text-orange-600 transition-colors" href="#">
            Ver todo <span className="material-icons-outlined ml-1 text-sm">arrow_forward</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {PRODUCTS.map((prod, idx) => (
            <div key={idx} className="group relative">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-200 relative mb-4">
                <img alt={`${prod.name} Studio`} className="h-full w-full object-cover object-center" src={prod.img1} />
                <img alt={`${prod.name} Lifestyle`} className="absolute inset-0 h-full w-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" src={prod.img2} />
                
                {prod.badge && (
                  <div className="absolute top-3 left-3">
                    <span className={`${prod.badgeColor} backdrop-blur px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-sm`}>
                      {prod.badge}
                    </span>
                  </div>
                )}
                
                <button className="absolute bottom-4 left-4 right-4 bg-white dark:bg-slate-800 text-gray-900 dark:text-white py-3 rounded-xl shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium text-sm hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white">
                  Agregar al carrito
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-display text-gray-900 dark:text-white">{prod.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{prod.material}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-primary">{prod.price}</p>
                  {prod.oldPrice && <p className="text-xs text-gray-400 line-through">{prod.oldPrice}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <a className="inline-flex items-center text-primary font-medium hover:text-orange-600 transition-colors" href="#">
            Ver todo el catálogo <span className="material-icons-outlined ml-1 text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}