import { ProductItem } from "@/types/product.types";

/**
 * Catálogo de Vestidos de Baño para Mujer - Nana Home
 * - Precios en Pesos Colombianos (COP)
 * - Inversión de visualización: Primero se ve la MODELO (primaryImage),
 *   y en hover/toque se visualiza SOLO EL VESTIDO (hoverImage).
 */
export const WOMEN_PRODUCTS: ProductItem[] = [
  {
    id: "vestido-rojo",
    name: "Vestido de Baño Rojo Pasión",
    slug: "vestido-rojo-pasion",
    category: "mujer",
    subcategory: "vestido_bano",
    colorName: "Rojo Pasión",
    price: "$145.000 COP",
    originalPrice: "$175.000 COP",
    description: "Enterizo estilizado de corte vanguardista con soporte interno y escote sofisticado. Diseñado para moldear la silueta con total comodidad y elegancia bajo el sol.",
    material: "Lycra colombiana pesada con tecnología de secado rápido y protección solar UV 50+.",
    features: [
      "Protección solar UPF 50+",
      "Copas removibles ergonómicas",
      "Resistente al cloro y salitre marino",
      "Doble forro suave al tacto"
    ],
    sizes: ["XS", "S", "M", "L"],
    // Primero la MODELO
    primaryImage: "/img/modelo_vestido_rojo.jpeg",
    // Al pasar el mouse / toque: Solo el VESTIDO
    hoverImage: "/img/vestido_rojo.jpeg",
    badge: "Bestseller",
    badgeColor: "bg-primary text-white",
    isNew: false,
    featured: true
  },
  {
    id: "vestido-azul",
    name: "Vestido de Baño Azul Océano",
    slug: "vestido-azul-oceano",
    category: "mujer",
    subcategory: "vestido_bano",
    colorName: "Azul Caribe",
    price: "$150.000 COP",
    originalPrice: null,
    description: "Inspirado en la inmensidad del mar caribeño. Confeccionado con tejido texturizado que proporciona un ajuste firme y una sensación de frescura inigualable.",
    material: "Poliamida reciclada de alta elasticidad con tacto ultra sedoso.",
    features: [
      "Tejido ecológico regenerado",
      "Costuras reforzadas invisibles",
      "Control de abdomen ligero",
      "Protección contra rayos UV"
    ],
    sizes: ["S", "M", "L", "XL"],
    // Primero la MODELO
    primaryImage: "/img/modelo_vestido_azul.jpeg",
    // Al pasar el mouse / toque: Solo el VESTIDO
    hoverImage: "/img/vestido_azul.jpeg",
    badge: "Nuevo",
    badgeColor: "bg-emerald-600 text-white",
    isNew: true,
    featured: true
  },
  {
    id: "vestido-blanco",
    name: "Vestido de Baño Blanco Perla",
    slug: "vestido-blanco-perla",
    category: "mujer",
    subcategory: "vestido_bano",
    colorName: "Blanco Perla",
    price: "$160.000 COP",
    originalPrice: null,
    description: "La cumbre de la sofisticación costera. Su tono blanco radiante cuenta con doble forro ultra opaco que garantiza cero transparencias dentro o fuera del agua.",
    material: "Microfibra premium con tecnología anti-manchas por bloqueador solar.",
    features: [
      "100% Cero transparencias (doble forro)",
      "Detalles dorados antioxidables",
      "Ajuste moldeador",
      "Secado ultrarrápido"
    ],
    sizes: ["XS", "S", "M", "L"],
    // Primero la MODELO
    primaryImage: "/img/modelo_vestido_blanco.jpeg",
    // Al pasar el mouse / toque: Solo el VESTIDO
    hoverImage: "/img/vestido_blanco.jpeg",
    badge: "Exclusivo",
    badgeColor: "bg-amber-600 text-white",
    isNew: false,
    featured: true
  },
  {
    id: "vestido-flores",
    name: "Vestido de Baño Flores Silvestres",
    slug: "vestido-flores-silvestres",
    category: "mujer",
    subcategory: "vestido_bano",
    colorName: "Flores Silvestres",
    price: "$155.000 COP",
    originalPrice: "$180.000 COP",
    description: "Estampado botánico exclusivo de Nana.col que rinde tributo a la flora tropical costera. Colores vivos que se mantienen intactos con el paso del tiempo.",
    material: "Poliéster ecológico texturizado y elastano de grado marino.",
    features: [
      "Estampado digital eco-friendly de alta definición",
      "No destiñe con el sol ni el lavado",
      "Tirantes graduables multifuncionales",
      "Alta cobertura solar"
    ],
    sizes: ["S", "M", "L"],
    // Primero la MODELO
    primaryImage: "/img/modelo_vestido_flores.jpeg",
    // Al pasar el mouse / toque: Solo el VESTIDO
    hoverImage: "/img/vestido_flores.jpeg",
    badge: "-15% OFF",
    badgeColor: "bg-rose-500 text-white",
    isNew: false,
    featured: true
  },
  {
    id: "vestido-petroleo",
    name: "Vestido de Baño Verde Petróleo",
    slug: "vestido-verde-petroleo",
    category: "mujer",
    subcategory: "vestido_bano",
    colorName: "Verde Petróleo",
    price: "$148.000 COP",
    originalPrice: null,
    description: "Tono verde esmeralda profundo que resalta todos los tonos de piel bronceada. Un básico elegante imprescindible para tus días en yate o resort.",
    material: "Tejido microacanalado con memoria de forma y compresión suave.",
    features: [
      "Textura suave acanalada",
      "Corte de pierna semi-alto",
      "Protección UV UPF 50+",
      "Confección 100% artesanal"
    ],
    sizes: ["S", "M", "L", "XL"],
    // Primero la MODELO
    primaryImage: "/img/modelo_vestido_petroleo.jpeg",
    // Al pasar el mouse / toque: Solo el VESTIDO
    hoverImage: "/img/vestido_petroleo.jpeg",
    badge: "Edición Limitada",
    badgeColor: "bg-teal-700 text-white",
    isNew: false,
    featured: false
  },
  {
    id: "vestido-rosado",
    name: "Vestido de Baño Rosa Coral",
    slug: "vestido-rosa-coral",
    category: "mujer",
    subcategory: "vestido_bano",
    colorName: "Rosa Coral",
    price: "$140.000 COP",
    originalPrice: null,
    description: "Cálido y delicado como la arena al atardecer. Diseñado con silueta minimalista que ofrece máxima libertad de movimiento y comodidad total.",
    material: "Lycra suave de secado exprés y tacto terso.",
    features: [
      "Espalda descubierta estilizada",
      "Copas suaves fijas",
      "Resistente a lociones solares",
      "Protección solar UPF 50+"
    ],
    sizes: ["XS", "S", "M", "L"],
    // Primero la MODELO
    primaryImage: "/img/modelo_vestido_rosado.jpeg",
    // Al pasar el mouse / toque: Solo el VESTIDO
    hoverImage: "/img/vestido_rosado.jpeg",
    badge: "Tendencia",
    badgeColor: "bg-pink-600 text-white",
    isNew: true,
    featured: false
  },
  {
    id: "vestido-azulmarino",
    name: "Vestido de Baño Azul Marino Clásico",
    slug: "vestido-azul-marino-clasico",
    category: "mujer",
    subcategory: "vestido_bano",
    colorName: "Azul Marino",
    price: "$145.000 COP",
    originalPrice: null,
    description: "La máxima expresión del estilo náutico clásico. Silueta envolvente que brinda un realce natural del busto y estiliza la cintura a la perfección.",
    material: "Lycra premium mate de compresión inteligente.",
    features: [
      "Diseño náutico atemporal",
      "Realce natural de silueta",
      "Resistencia extrema a los lavados",
      "Protección solar UPF 50+"
    ],
    sizes: ["S", "M", "L"],
    primaryImage: "/img/modelo_vestido_azulmarino.jpeg",
    hoverImage: null, // Solo cuenta con modelo
    badge: "Atemporal",
    badgeColor: "bg-slate-700 text-white",
    isNew: false,
    featured: false
  },
  {
    id: "vestido-negro",
    name: "Vestido de Baño Negro Ébano Elegance",
    slug: "vestido-negro-ebano-elegance",
    category: "mujer",
    subcategory: "vestido_bano",
    colorName: "Negro Ébano",
    price: "$150.000 COP",
    originalPrice: null,
    description: "El infaltable traje de baño negro que define la elegancia costera. Corte estilizador con copas moldeadas y escote limpio que nunca pasa de moda.",
    material: "Tejido escultor de alta tecnología con acabado mate sedoso.",
    features: [
      "Efecto moldeador 360°",
      "Resistente al desgaste del sol y mar",
      "Soporte pectoral reforzado",
      "Protección solar UPF 50+"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    primaryImage: "/img/modelo_vestido_negro.jpeg",
    hoverImage: null, // Solo cuenta con modelo
    badge: "Elegance",
    badgeColor: "bg-zinc-900 text-white",
    isNew: false,
    featured: false
  },
  {
    id: "vestido-enterizo-blanco",
    name: "Vestido de Baño Enterizo Blanco Pure",
    slug: "vestido-enterizo-blanco-pure",
    category: "mujer",
    subcategory: "enterizo",
    colorName: "Blanco Puro",
    price: "$150.000 COP",
    originalPrice: "$180.000 COP",
    description: "Enterizo sofisticado en tono blanco puro con corte estilizador, escote cruzado y copa moldeadora. Perfecto para días soleados y elegancia en la playa o piscina.",
    material: "Lycra premium con forro doble anti-transparencia y secado ultra rápido.",
    features: [
      "Doble forro sin transparencias",
      "Protección solar UPF 50+",
      "Control suave de abdomen",
      "Resistente al cloro"
    ],
    sizes: ["S", "M", "L", "XL"],
    primaryImage: "/img/modelo_vestido_enterizo_blanco.jpeg",
    hoverImage: "/img/vestido_enterizo_blanco.jpeg",
    badge: "Nuevo",
    badgeColor: "bg-emerald-600 text-white",
    isNew: true,
    featured: true
  },
  {
    id: "vestido-enterizo-azul-flores",
    name: "Vestido de Baño Enterizo Azul Flores Tropical",
    slug: "vestido-enterizo-azul-flores",
    category: "mujer",
    subcategory: "enterizo",
    colorName: "Azul Flores Tropical",
    price: "$145.000 COP",
    originalPrice: null,
    description: "Diseño enterizo con hermoso estampado floral sobre fondo azul océano. Ajuste cómodo y silueta moldeadora para resaltar la figura con frescura veraniega.",
    material: "Poliamida elástica de alto gramaje con filtro UV 50+.",
    features: [
      "Estampado floral exclusivo",
      "Copas ergonómicas removibles",
      "Tirantes ajustables",
      "Secado rápido"
    ],
    sizes: ["S", "M", "L"],
    primaryImage: "/img/modelo_vestido_enterizo_azul_flores.jpeg",
    hoverImage: null,
    badge: "Nuevo",
    badgeColor: "bg-primary text-white",
    isNew: true,
    featured: false
  },
  {
    id: "vestido-enterizo-azul-oscuro",
    name: "Vestido de Baño Enterizo Azul Marino Royal",
    slug: "vestido-enterizo-azul-oscuro",
    category: "mujer",
    subcategory: "enterizo",
    colorName: "Azul Marino Royal",
    price: "$145.000 COP",
    originalPrice: null,
    description: "Clásico y atemporal enterizo azul marino oscuro con corte anatómico. Confeccionado para brindar seguridad, soporte y máxima comodidad al nadar.",
    material: "Microfibra de secado acelerado con acabado mate y suave.",
    features: [
      "Soporte de busto integrado",
      "Protección UV 50+",
      "Resistente al desgaste marino",
      "Control suave de figura"
    ],
    sizes: ["S", "M", "L", "XL"],
    primaryImage: "/img/modelo_vestido_enterizo_azul_oscuro.jpeg",
    hoverImage: null,
    badge: "Clásico",
    badgeColor: "bg-slate-800 text-white",
    isNew: false,
    featured: false
  },
  {
    id: "vestido-enterizo-cafe",
    name: "Vestido de Baño Enterizo Café Terracota",
    slug: "vestido-enterizo-cafe",
    category: "mujer",
    subcategory: "enterizo",
    colorName: "Café Terracota",
    price: "$145.000 COP",
    originalPrice: null,
    description: "Tonalidad cálida tierra y café terracota que resalta el bronceado de la piel. Corte moderno de pierna alta con escote estilizado para un look boho-chic.",
    material: "Lycra colombiana de primera calidad con tecnología de compresión ligera.",
    features: [
      "Tono cálido en tendencia",
      "Copas suaves removibles",
      "Protección solar UPF 50+",
      "Costuras reforzadas"
    ],
    sizes: ["S", "M", "L"],
    primaryImage: "/img/modelo_vestido_enterizo_cafe.jpeg",
    hoverImage: null,
    badge: "Tendencia",
    badgeColor: "bg-amber-700 text-white",
    isNew: true,
    featured: false
  },
  {
    id: "vestido-enterizo-negro-flores",
    name: "Vestido de Baño Enterizo Negro Floral Garden",
    slug: "vestido-enterizo-negro-flores",
    category: "mujer",
    subcategory: "enterizo",
    colorName: "Negro Flores Botánicas",
    price: "$145.000 COP",
    originalPrice: null,
    description: "La elegancia del negro combinada con un delicado diseño floral botánico. Escote favorecedor y tejido modelador que garantiza una silueta armoniosa.",
    material: "Tejido elástico en 4 direcciones resistente al cloro y protector de rayos solares.",
    features: [
      "Elegante contraste floral sobre negro",
      "Control de abdomen medio",
      "Copas moldeadoras",
      "UPF 50+"
    ],
    sizes: ["S", "M", "L", "XL"],
    primaryImage: "/img/modelo_vestido_enterizo_negro_flores.jpeg",
    hoverImage: null,
    badge: "Elegance",
    badgeColor: "bg-stone-900 text-amber-300",
    isNew: false,
    featured: false
  },
  {
    id: "vestido-enterizo-rosado",
    name: "Vestido de Baño Enterizo Rosa Flamingo",
    slug: "vestido-enterizo-rosado",
    category: "mujer",
    subcategory: "enterizo",
    colorName: "Rosa Flamingo",
    price: "$145.000 COP",
    originalPrice: null,
    description: "Vibrante y femenino traje de baño enterizo en color rosa tropical. Diseñado para irradiar energía positiva y estilizar la silueta con delicadeza.",
    material: "Poliamida satinada de tacto suave y secado rápido.",
    features: [
      "Color vivo resistente al sol",
      "Copas removibles",
      "Ajuste elástico seguro",
      "Protección UV 50+"
    ],
    sizes: ["XS", "S", "M", "L"],
    primaryImage: "/img/modelo_vestido_enterizo_rosado.jpeg",
    hoverImage: null,
    badge: "Nuevo",
    badgeColor: "bg-pink-600 text-white",
    isNew: true,
    featured: false
  },
  {
    id: "vestido-hilo-negro",
    name: "Vestido de Baño Dos Piezas Hilo Negro Minimal",
    slug: "vestido-hilo-negro",
    category: "mujer",
    subcategory: "bikini",
    colorName: "Negro Profundo",
    price: "$135.000 COP",
    originalPrice: null,
    description: "Bikini sensual de dos piezas con corte en hilo y tiras ajustables. Diseñado para un bronceado perfecto y máxima comodidad con estilo minimalista.",
    material: "Lycra texturizada ultra flexible con forro suave.",
    features: [
      "Tiras ajustables al contorno",
      "Copas triangulares suaves",
      "Secado express",
      "Protección UV 50+"
    ],
    sizes: ["XS", "S", "M", "L"],
    primaryImage: "/img/modelo_vestido_hilo_negro.jpeg",
    hoverImage: null,
    badge: "Bikini Hot",
    badgeColor: "bg-black text-white",
    isNew: true,
    featured: false
  },
  {
    id: "vestido-negro-lineas-blancas",
    name: "Vestido de Baño Negro Líneas Blancas Contour",
    slug: "vestido-negro-lineas-blancas",
    category: "mujer",
    subcategory: "enterizo",
    colorName: "Negro Líneas Blancas",
    price: "$145.000 COP",
    originalPrice: null,
    description: "Estilo deportivo de lujo con líneas geométricas blancas que afinan visualmente la cintura y alargan la silueta. Excelente soporte para actividades acuáticas.",
    material: "Tejido compresivo de grado deportivo con protección UV 50+.",
    features: [
      "Efecto visual estilizador",
      "Corte deportivo con soporte firme",
      "Copas prehormadas",
      "Resistencia extrema al cloro"
    ],
    sizes: ["S", "M", "L", "XL"],
    primaryImage: "/img/modelo_vestido_negro_lineas_blancas.jpeg",
    hoverImage: null,
    badge: "Contour",
    badgeColor: "bg-neutral-900 text-white",
    isNew: false,
    featured: false
  },
  {
    id: "vestido-negro-pantaloneta",
    name: "Vestido de Baño Enterizo Pantaloneta Sport Negro",
    slug: "vestido-negro-pantaloneta",
    category: "mujer",
    subcategory: "enterizo",
    colorName: "Negro Sport",
    price: "$145.000 COP",
    originalPrice: null,
    description: "Enterizo con corte tipo short/pantaloneta para total libertad de movimiento, cobertura extra y seguridad. Ideal para natación deportiva, aquagym y playa activa.",
    material: "Lycra de alta densidad anti-rozaduras con secado express.",
    features: [
      "Corte short ergonómico",
      "Máxima cobertura y soporte",
      "Copas integradas",
      "UPF 50+"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    primaryImage: "/img/modelo_vestido_negro_pantaloneta.jpeg",
    hoverImage: null,
    badge: "Sport",
    badgeColor: "bg-indigo-700 text-white",
    isNew: false,
    featured: false
  }
];
