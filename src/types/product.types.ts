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
  primaryImage: string; // Enfoque solicitado: Primero la MODELO
  hoverImage?: string | null; // Segundo enfoque: Solo el VESTIDO (si aplica)
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
  whatsappNumber: string;
  whatsappDisplay: string;
  address: string;
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
}
