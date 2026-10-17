import { CategoryItem, ProductItem } from "@/types/product.types";
import { WOMEN_PRODUCTS } from "./products.data";
import { KIDS_PRODUCTS } from "./kids-products.data";
import { FAMILY_SWIMWEAR_PRODUCTS, FAMILY_TRUNKS_PRODUCTS } from "./family-products.data";

export { WOMEN_PRODUCTS } from "./products.data";
export { KIDS_PRODUCTS } from "./kids-products.data";
export { FAMILY_SWIMWEAR_PRODUCTS, FAMILY_TRUNKS_PRODUCTS } from "./family-products.data";

/**
 * Catálogo completo unificado de productos Nana.col
 */
export const ALL_PRODUCTS: ProductItem[] = [
  ...WOMEN_PRODUCTS,
  ...FAMILY_SWIMWEAR_PRODUCTS,
  ...FAMILY_TRUNKS_PRODUCTS,
  ...KIDS_PRODUCTS,
];

/**
 * Categorías principales de la marca utilizando imágenes reales de la colección
 */
export const CATEGORIES: CategoryItem[] = [
  {
    id: "cat-mujer",
    title: "Vestidos de Baño Mujer",
    slug: "vestidos-bano-mujer",
    desc: "Siluetas vanguardistas, moldeadoras y cortes clásicos con soporte premium.",
    img: "/img/modelo_vestido_flores.jpeg",
    radius: "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
    tag: "Colección Mujer",
    targetId: "collection-mujer",
  },
  {
    id: "cat-familia-vestidos",
    title: "Vestidos de Baño en Familia",
    slug: "vestidos-bano-familia",
    desc: "Sets playeros coordinados para mamá, papá e hijos con doble escena fotográfica.",
    img: "/img/modelos_vestidos_familiares_rosado_cangrejos.jpeg",
    radius: "rounded-[50%_50%_60%_40%/50%_60%_40%_50%]",
    tag: "Sets Familiares",
    targetId: "collection-familia-vestidos",
  },
  {
    id: "cat-familia-pantalonetas",
    title: "Pantalonetas en Familia",
    slug: "pantalonetas-familia",
    desc: "Pantalonetas a juego para toda la familia con secado rápido y protección solar.",
    img: "/img/pantalonetas_familiares_azul_marino.jpeg",
    radius: "rounded-[60%_40%_50%_50%/40%_50%_50%_60%]",
    tag: "Estilo Playero",
    targetId: "collection-familia-pantalonetas",
  },
  {
    id: "cat-kids",
    title: "Línea Infantil (Niños & Niñas)",
    slug: "linea-infantil",
    desc: "Personajes favoritos (Spiderman, Batman, Hulk, Gatita) con protección UV 50+.",
    img: "/img/niño_spiderman.jpeg",
    radius: "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
    tag: "Protección Solar",
    targetId: "collection-kids",
  },
  {
    id: "cat-exclusivos",
    title: "Ediciones Exclusivas & Resort",
    slug: "ediciones-exclusivas",
    desc: "Piezas de edición limitada elaboradas a mano con tejidos sostenibles.",
    img: "/img/modelo_vestido_blanco.jpeg",
    radius: "rounded-[50%_50%_50%_50%/60%_60%_40%_40%]",
    tag: "Edición Limitada",
    targetId: "about",
  },
];

/**
 * Enlaces de navegación principal
 */
export const NAV_LINKS = [
  { label: "Mujer", href: "#collection-mujer" },
  { label: "Vestidos Familia", href: "#collection-familia-vestidos" },
  { label: "Pantalonetas Familia", href: "#collection-familia-pantalonetas" },
  { label: "Niños & Niñas", href: "#collection-kids" },
  { label: "Categorías", href: "#categorias" },
];

/**
 * Pilares de marca (Beneficios garantizados)
 */
export const BRAND_PILLARS = [
  {
    icon: "wb_sunny",
    title: "Protección UV 50+",
    desc: "Bloquea hasta el 98% de los rayos UVA y UVB dañinos.",
  },
  {
    icon: "water_drop",
    title: "Secado Ultrarrápido",
    desc: "Tejidos hidrofóbicos que evitan la acumulación de humedad.",
  },
  {
    icon: "eco",
    title: "Materiales Sostenibles",
    desc: "Fibras de grado marino y empaques 100% biodegradables.",
  },
  {
    icon: "chat",
    title: "Asesoría por WhatsApp",
    desc: "Atención personalizada para elegir tu talla y modelo ideal.",
  },
];