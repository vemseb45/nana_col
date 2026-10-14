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
    colorName: "Estampado Botánico",
    price: "$155.000 COP",
    originalPrice: "$180.000 COP",
    description: "Estampado botánico exclusivo de Nana Home que rinde tributo a la flora tropical costera. Colores vivos que se mantienen intactos con el paso del tiempo.",
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
  }
];
