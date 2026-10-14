import { BrandInfo } from "@/types/product.types";

/**
 * Información oficial de marca - Nana.col
 * Principio DRY: Centraliza datos de contacto y enlaces a WhatsApp
 */
export const BRAND_DATA: BrandInfo = {
  name: "Nana.col",
  tagline: "Vestidos de Baño & Colección Tropical",
  description:
    "Moda playera y vestidos de baño exclusivos para mujer y niños. Diseños únicos creados con amor por el océano, telas con protección UV 50+ y confección artesanal.",
  phone: "+57 315 8684467",
  whatsappNumber: "573158684467",
  whatsappDisplay: "+57 315 8684467",
  address: "Centro Comercial San Andresito Avenida 68 Local P1 Segundo Piso, Bogotá, Colombia",
  socials: {
    instagram: "https://instagram.com/nana.col",
    facebook: "https://facebook.com/nana.col",
    tiktok: "https://tiktok.com/@nana.col",
  },
};

/**
 * Generador de enlace directo a WhatsApp incluyendo la referencia e imagen del vestido (DRY)
 */
export function getWhatsAppProductUrl(product: {
  name: string;
  price?: string;
  colorName?: string;
  primaryImage?: string;
}): string {
  // Usar dominio base canónico para consistencia estricta entre SSR y cliente (evita mismatch de hidratación)
  // Además, WhatsApp requiere un dominio web público accesible para generar la tarjeta de vista previa enriquecida
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nana-col.vercel.app";
  const fullImageUrl = product.primaryImage
    ? `${siteUrl.replace(/\/$/, "")}${product.primaryImage}`
    : "";

  const message = [
    `¡Hola Nana.col! 👋 Me encantó este diseño y quiero asesoría personalizada:`,
    ``,
    `👙 *Prenda:* ${product.name}`,
    product.colorName ? `🎨 *Color:* ${product.colorName}` : null,
    product.price ? `💰 *Precio:* ${product.price}` : null,
    ``,
    `📸 *Foto de referencia:*`,
    fullImageUrl,
    ``,
    `¿Tienen disponibilidad de tallas y cómo puedo coordinar la entrega? ¡Muchas gracias!`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `https://wa.me/${BRAND_DATA.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Enlace directo de WhatsApp para asesoría general
 */
export function getWhatsAppGeneralUrl(): string {
  const message = `¡Hola Nana.col! 👋 Me gustaría recibir asesoría personalizada sobre sus vestidos de baño para mujer y trajes infantiles.`;
  return `https://wa.me/${BRAND_DATA.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
