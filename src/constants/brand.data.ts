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
 * Dominio canónico oficial. Determinista en servidor y cliente (evita mismatch de hidratación).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nana-col.vercel.app").replace(/\/$/, "");

/**
 * Ruta pública de la página individual de cada prenda (usada para la vista previa en WhatsApp).
 */
export function getProductPagePath(productId: string): string {
  return `/p/${productId}`;
}

/**
 * Código de referencia corto para que el asesor identifique la prenda (ej. NC-VESTIDO-AZUL).
 */
export function getProductReference(productId: string): string {
  return `NC-${productId.toUpperCase()}`;
}

/**
 * Miniatura liviana (< 300 KB) generada por `npm run og:images` para la tarjeta de WhatsApp.
 * Debe aplicar la misma normalización ASCII que scripts/generate-og-images.mjs.
 */
export function getOgImagePath(imagePath: string): string {
  const fileName = imagePath.split("/").pop() ?? "";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const asciiName = baseName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return `/og/${asciiName}.jpg`;
}

/**
 * Generador de enlace directo a WhatsApp con la prenda seleccionada (DRY).
 * WhatsApp no permite adjuntar imágenes desde un enlace wa.me, por eso el mensaje
 * termina con la página de la prenda: WhatsApp la convierte en una tarjeta con la foto.
 */
export function getWhatsAppProductUrl(product: {
  id: string;
  name: string;
  price?: string;
  colorName?: string;
}): string {
  const message = [
    `¡Hola Nana.col! 👋 Me encantó este diseño y quiero asesoría personalizada:`,
    ``,
    `🔖 *Ref:* ${getProductReference(product.id)}`,
    `👙 *Prenda:* ${product.name}`,
    product.colorName ? `🎨 *Color:* ${product.colorName}` : null,
    product.price ? `💰 *Precio:* ${product.price}` : null,
    ``,
    `¿Tienen disponibilidad de tallas y cómo puedo coordinar la entrega? ¡Muchas gracias!`,
    ``,
    `${SITE_URL}${getProductPagePath(product.id)}`,
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
