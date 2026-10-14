import { ProductItem } from "@/types/product.types";

/**
 * Catálogo de Vestidos y Trajes de Baño Infantiles - Nana Kids
 * Diseñados para máxima diversión en el agua y cuidado total de la piel infantil.
 * Protección UV 50+, tela suave anti-rozaduras y estampados favoritos.
 */
export const KIDS_PRODUCTS: ProductItem[] = [
  {
    id: "nino-spiderman",
    name: "Traje de Baño Enterizo Niño Spiderman",
    slug: "nino-spiderman",
    category: "ninos",
    subcategory: "nino",
    theme: "spiderman",
    colorName: "Rojo & Azul Arácnido",
    price: "$58.00",
    originalPrice: "$68.00",
    description: "Enterizo acuático de manga ranglan con el estampado de su superhéroe favorito: Spiderman. Cuenta con cierre frontal suave protegido para evitar pellizcos.",
    material: "Poliéster y spandex ultra elástico con certificación solar UPF 50+.",
    features: [
      "Máxima protección solar certificada UPF 50+",
      "Cremallera frontal con solapa anti-roce",
      "Secado ultrarrápido",
      "Tejido elástico en 4 direcciones"
    ],
    sizes: ["2T", "4T", "6T", "8T", "10T"],
    primaryImage: "/img/niño_spiderman.jpeg",
    hoverImage: null, // Foto única con modelo infantil
    badge: "Superhéroe Favorito",
    badgeColor: "bg-red-600 text-white",
    isNew: false,
    featured: true
  },
  {
    id: "nino-batman",
    name: "Traje de Baño Enterizo Niño Batman",
    slug: "nino-batman",
    category: "ninos",
    subcategory: "nino",
    theme: "batman",
    colorName: "Negro & Amarillo Gotham",
    price: "$58.00",
    originalPrice: null,
    description: "Diseño ergonómico y heroico inspirado en el Caballero de la Noche. Perfecto para nadar, jugar en la arena y saltar en las olas sin perder comodidad.",
    material: "Tejido de grado acuático resistente a la decoloración solar y salina.",
    features: [
      "Protección solar UPF 50+",
      "Costuras planas anti-fricción",
      "Cuello redondo suave",
      "Apto para agua dulce y salada"
    ],
    sizes: ["2T", "4T", "6T", "8T"],
    primaryImage: "/img/niño_batman.jpeg",
    hoverImage: null,
    badge: "Nuevo",
    badgeColor: "bg-slate-900 text-amber-400",
    isNew: true,
    featured: true
  },
  {
    id: "nino-hulk",
    name: "Traje de Baño Enterizo Niño Hulk",
    slug: "nino-hulk",
    category: "ninos",
    subcategory: "nino",
    theme: "hulk",
    colorName: "Verde Fuerza & Morado",
    price: "$55.00",
    originalPrice: null,
    description: "Lleno de energía y poder para los pequeños más aventureros. Su tejido resistente previene el desgaste en toboganes y bordes de piscina.",
    material: "Microfibra elástica de alta densidad con protección UV.",
    features: [
      "Protección solar UPF 50+",
      "Cremallera de deslizamiento fácil",
      "Material anti-enganche de alta resistencia",
      "Libre de sustancias irritantes"
    ],
    sizes: ["4T", "6T", "8T", "10T"],
    primaryImage: "/img/niño_hulk.jpeg",
    hoverImage: null,
    badge: "Resistente",
    badgeColor: "bg-emerald-600 text-white",
    isNew: false,
    featured: true
  },
  {
    id: "nino-tiburon",
    name: "Traje de Baño Enterizo Niño Tiburón Aventura",
    slug: "nino-tiburon",
    category: "ninos",
    subcategory: "nino",
    theme: "tiburon",
    colorName: "Azul Marino & Celeste Océano",
    price: "$52.00",
    originalPrice: null,
    description: "Divertido estampado de tiburones exploradores del fondo marino. Su diseño protege hombros, pecho y espalda durante horas bajo el sol radiante.",
    material: "Poliamida ligera de secado exprés y tacto extrasuave.",
    features: [
      "Protección solar UPF 50+",
      "Tejido transpirable y fresco",
      "Cremallera protegida con tope de tela",
      "No absorbe olores"
    ],
    sizes: ["2T", "4T", "6T", "8T"],
    primaryImage: "/img/niño_tiburon.jpeg",
    hoverImage: null,
    badge: "Aventura",
    badgeColor: "bg-cyan-600 text-white",
    isNew: false,
    featured: true
  },
  {
    id: "nina-gato",
    name: "Vestido de Baño Niña Gatita Marina",
    slug: "nina-gatita-marina",
    category: "ninos",
    subcategory: "nina",
    theme: "gato",
    colorName: "Rosa Pastel & Aguamarina",
    price: "$54.00",
    originalPrice: null,
    description: "Tierno vestido de baño enterizo con ilustración de gatita playera. Ajuste delicado que no aprieta ni marca la piel de las más consentidas.",
    material: "Lycra suave de tacto aterciopelado con doble forro higiénico.",
    features: [
      "Protección solar UPF 50+",
      "Tirantes anchos confortables",
      "Doble forro interior ultra suave",
      "Colores vivos no tóxicos"
    ],
    sizes: ["2T", "4T", "6T", "8T"],
    primaryImage: "/img/niña_gato.jpeg",
    hoverImage: null,
    badge: "Más Querido",
    badgeColor: "bg-pink-500 text-white",
    isNew: false,
    featured: true
  },
  {
    id: "nina-mumis",
    name: "Vestido de Baño Niña Mumis Tropical",
    slug: "nina-mumis-tropical",
    category: "ninos",
    subcategory: "nina",
    theme: "mumis",
    colorName: "Multicolor Tropical",
    price: "$56.00",
    originalPrice: null,
    description: "Una explosión de alegría y colores vibrantes. Confeccionado con elástico suave en piernas y cintura para que juegue sin molestias todo el día.",
    material: "Microfibra premium con secado instantáneo y filtro UV.",
    features: [
      "Protección solar UPF 50+",
      "Resistente a la arena y salitre",
      "Diseño ergonómico infantil",
      "Fácil de poner y retirar"
    ],
    sizes: ["2T", "4T", "6T", "8T", "10T"],
    primaryImage: "/img/niña_mumis.jpeg",
    hoverImage: null,
    badge: "Colorido",
    badgeColor: "bg-fuchsia-600 text-white",
    isNew: true,
    featured: true
  },
  {
    id: "nina-sisne",
    name: "Vestido de Baño Niña Cisne Encantado",
    slug: "nina-cisne-encantado",
    category: "ninos",
    subcategory: "nina",
    theme: "sisne",
    colorName: "Rosa Perla & Dorado",
    price: "$58.00",
    originalPrice: null,
    description: "Inspirado en la gracia y encanto de los cisnes en lagos mágicos. Detalles delicados pensados para momentos inolvidables en familia.",
    material: "Lycra de alta gama con sutil brillo satinado y protección UV 50+.",
    features: [
      "Protección solar UPF 50+",
      "Elegantes acabados de costura",
      "Tacto extrasuave libre de etiquetas rasposas",
      "Secado rápido"
    ],
    sizes: ["2T", "4T", "6T", "8T"],
    primaryImage: "/img/niña_sisne.jpeg",
    hoverImage: null,
    badge: "Exclusivo Kids",
    badgeColor: "bg-rose-600 text-white",
    isNew: false,
    featured: true
  }
];

export const ALL_PRODUCTS: ProductItem[] = [
  ...KIDS_PRODUCTS,
];
