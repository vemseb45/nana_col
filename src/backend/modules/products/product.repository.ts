import { ProductItem } from "@/types/product.types";
import { ALL_PRODUCTS, WOMEN_PRODUCTS, KIDS_PRODUCTS } from "@/constants/landing.data";

export interface ProductQueryFilter {
  category?: string;
  subcategory?: string;
  query?: string;
  featured?: boolean;
}

export interface IProductRepository {
  getAll(filter?: ProductQueryFilter): Promise<ProductItem[]>;
  getById(id: string): Promise<ProductItem | null>;
  getWomenCollection(): Promise<ProductItem[]>;
  getKidsCollection(): Promise<ProductItem[]>;
  getFeatured(): Promise<ProductItem[]>;
}

/**
 * Implementación del Repositorio de Productos en memoria/fuente centralizada
 * Si en el futuro se conecta a Prisma/Postgres, solo se implementa IProductRepository
 * sin cambiar los servicios ni controladores (Principio Open/Closed de SOLID).
 */
export class ProductRepository implements IProductRepository {
  async getAll(filter?: ProductQueryFilter): Promise<ProductItem[]> {
    let result = [...ALL_PRODUCTS];

    if (filter?.category) {
      const cat = filter.category.toLowerCase();
      result = result.filter((p) => p.category.toLowerCase() === cat);
    }

    if (filter?.subcategory) {
      const sub = filter.subcategory.toLowerCase();
      result = result.filter((p) => p.subcategory.toLowerCase() === sub);
    }

    if (filter?.featured !== undefined) {
      result = result.filter((p) => Boolean(p.featured) === filter.featured);
    }

    if (filter?.query) {
      const q = filter.query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.colorName.toLowerCase().includes(q) ||
          (p.theme && p.theme.toLowerCase().includes(q))
      );
    }

    return result;
  }

  async getById(id: string): Promise<ProductItem | null> {
    const cleanId = id.toLowerCase().trim();
    const found = ALL_PRODUCTS.find((p) => p.id.toLowerCase() === cleanId || p.slug.toLowerCase() === cleanId);
    return found || null;
  }

  async getWomenCollection(): Promise<ProductItem[]> {
    return WOMEN_PRODUCTS;
  }

  async getKidsCollection(): Promise<ProductItem[]> {
    return KIDS_PRODUCTS;
  }

  async getFeatured(): Promise<ProductItem[]> {
    return ALL_PRODUCTS.filter((p) => p.featured);
  }
}

// Instancia singleton para inyección limpia
export const productRepository = new ProductRepository();
