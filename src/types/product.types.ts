/**
 * Definiciones de tipos para el catálogo de productos de Nana Home.
 * Principio SOLID: Interface Segregation Principle (ISP)
 */

export type ProductCategory = 'mujer' | 'ninos' | 'accesorios';

export type ProductSubcategory = 'vestido_bano' | 'bikini' | 'enterizo' | 'nino' | 'nina';

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  theme?: string;
  colorName: string;
  price: string;
  originalPrice?: string | null;
  description: string;
  material: string;
  features: string[];
  sizes: string[];
  primaryImage: string; // Prenda o imagen principal
  hoverImage?: string | null; // Imagen en modelo (si aplica)
  badge?: string | null;
  badgeColor?: string;
  isNew?: boolean;
  featured?: boolean;
}

export interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  desc: string;
  img: string;
  radius: string;
  tag: string;
  targetId: string;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsappNumber: string; // formato internacional e.g. "573001234567"
  whatsappDisplay: string;
  email: string;
  address: string;
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
}
