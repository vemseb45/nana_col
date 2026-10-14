import { BrandInfo } from "@/types/product.types";

export const BRAND_DATA: BrandInfo = {
  name: "Nana Home",
  tagline: "Vestidos de Baño & Colección Tropical",
  description: "Moda playera y vestidos de baño exclusivos para mujer y niños. Diseños únicos creados con amor por el océano, telas con protección UV 50+ y confección artesanal.",
  phone: "+57 (300) 123-4567",
  whatsappNumber: "573001234567",
  whatsappDisplay: "+57 300 123 4567",
  email: "hola@nanahome.com",
  address: "Av. del Sol 45, Edificio Paraíso Tropical, Cartagena / Medellín",
  socials: {
    instagram: "https://instagram.com/nana.col",
    facebook: "https://facebook.com/nana.col",
    tiktok: "https://tiktok.com/@nana.col",
  },
};

/**
 * Función utilitaria para generar enlace directo a WhatsApp con mensaje personalizado (DRY)
 */
export function getWhatsAppProductUrl(productName: string, productPrice?: string): string {
  const message = `¡Hola Nana Home! 👋 Me encantó el modelo *${productName}*${
    productPrice ? ` (${productPrice})` : ""
  }. ¿Tienen tallas disponibles y cómo puedo coordinar la compra?`;
  return `https://wa.me/${BRAND_DATA.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppGeneralUrl(): string {
  const message = `¡Hola Nana Home! 👋 Quisiera recibir asesoría personalizada sobre sus vestidos de baño y colección actual.`;
  return `https://wa.me/${BRAND_DATA.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
