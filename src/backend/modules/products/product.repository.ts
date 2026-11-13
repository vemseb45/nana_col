import type { Product as PrismaProduct } from '@prisma/client';
import {
  ProductCategory,
  ProductItem,
  ProductSubcategory,
} from '@/types/product.types';
import {
  ALL_PRODUCTS,
  WOMEN_PRODUCTS,
  KIDS_PRODUCTS,
  FAMILY_SWIMWEAR_PRODUCTS,
  FAMILY_TRUNKS_PRODUCTS,
} from '@/constants/landing.data';
import { prisma } from '@/backend/shared/prisma';
import { ensureProductsSeeded } from './product.seed';

export interface ProductQueryFilter {
  category?: string;
  subcategory?: string;
  query?: string;
  featured?: boolean;
}

export interface ProductUpdateInput {
  name?: string;
  category?: ProductCategory;
  subcategory?: ProductSubcategory;
  theme?: string | null;
  colorName?: string;
  price?: string;
  originalPrice?: string | null;
  description?: string;
  material?: string;
  features?: string[];
  sizes?: string[];
  primaryImage?: string;
  hoverImage?: string | null;
  badge?: string | null;
  badgeColor?: string | null;
  isNew?: boolean;
  featured?: boolean;
}

export interface IProductRepository {
  getAll(filter?: ProductQueryFilter): Promise<ProductItem[]>;
  getById(id: string): Promise<ProductItem | null>;
  getWomenCollection(): Promise<ProductItem[]>;
  getKidsCollection(): Promise<ProductItem[]>;
  getFamilySwimwearCollection(): Promise<ProductItem[]>;
  getFamilyTrunksCollection(): Promise<ProductItem[]>;
  getFeatured(): Promise<ProductItem[]>;
  updateById(id: string, input: ProductUpdateInput): Promise<ProductItem | null>;
}

function mapPrismaProductToItem(row: PrismaProduct): ProductItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as ProductCategory,
    subcategory: row.subcategory as ProductSubcategory,
    theme: row.theme ?? undefined,
    colorName: row.colorName,
    price: row.price,
    originalPrice: row.originalPrice ?? null,
    description: row.description,
    material: row.material,
    features: row.features,
    sizes: row.sizes,
    primaryImage: row.primaryImage,
    hoverImage: row.hoverImage ?? null,
    badge: row.badge ?? null,
    badgeColor: row.badgeColor ?? undefined,
    isNew: row.isNew,
    featured: row.featured,
  };
}

function filterFallbackProducts(
  source: ProductItem[],
  filter?: ProductQueryFilter
): ProductItem[] {
  let result = [...source];

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

/**
 * Implementación del Repositorio de Productos con PostgreSQL / Prisma
 * y respaldo determinista en memoria si la base de datos no está disponible en build.
 */
export class ProductRepository implements IProductRepository {
  async getAll(filter?: ProductQueryFilter): Promise<ProductItem[]> {
    try {
      await ensureProductsSeeded();

      const rows = await prisma.product.findMany({
        where: {
          ...(filter?.category
            ? { category: { equals: filter.category.toLowerCase(), mode: 'insensitive' } }
            : {}),
          ...(filter?.subcategory
            ? { subcategory: { equals: filter.subcategory.toLowerCase(), mode: 'insensitive' } }
            : {}),
          ...(filter?.featured !== undefined ? { featured: filter.featured } : {}),
          ...(filter?.query
            ? {
                OR: [
                  { name: { contains: filter.query.trim(), mode: 'insensitive' } },
                  { description: { contains: filter.query.trim(), mode: 'insensitive' } },
                  { colorName: { contains: filter.query.trim(), mode: 'insensitive' } },
                  { theme: { contains: filter.query.trim(), mode: 'insensitive' } },
                ],
              }
            : {}),
        },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      });

      return rows.map(mapPrismaProductToItem);
    } catch {
      return filterFallbackProducts(ALL_PRODUCTS, filter);
    }
  }

  async getById(id: string): Promise<ProductItem | null> {
    const cleanId = id.toLowerCase().trim();
    try {
      await ensureProductsSeeded();
      const row = await prisma.product.findFirst({
        where: {
          OR: [
            { id: { equals: cleanId, mode: 'insensitive' } },
            { slug: { equals: cleanId, mode: 'insensitive' } },
          ],
        },
      });
      return row ? mapPrismaProductToItem(row) : null;
    } catch {
      const found = ALL_PRODUCTS.find(
        (p) => p.id.toLowerCase() === cleanId || p.slug.toLowerCase() === cleanId
      );
      return found || null;
    }
  }

  async getWomenCollection(): Promise<ProductItem[]> {
    const items = await this.getAll({ category: 'mujer' });
    return items.length > 0 ? items : WOMEN_PRODUCTS;
  }

  async getKidsCollection(): Promise<ProductItem[]> {
    const items = await this.getAll({ category: 'ninos' });
    return items.length > 0 ? items : KIDS_PRODUCTS;
  }

  async getFamilySwimwearCollection(): Promise<ProductItem[]> {
    const items = await this.getAll({ category: 'vestidos_familiares' });
    return items.length > 0 ? items : FAMILY_SWIMWEAR_PRODUCTS;
  }

  async getFamilyTrunksCollection(): Promise<ProductItem[]> {
    const items = await this.getAll({ category: 'pantalonetas_familiares' });
    return items.length > 0 ? items : FAMILY_TRUNKS_PRODUCTS;
  }

  async getFeatured(): Promise<ProductItem[]> {
    return this.getAll({ featured: true });
  }

  async updateById(id: string, input: ProductUpdateInput): Promise<ProductItem | null> {
    await ensureProductsSeeded();

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return null;

    let resolvedOriginalPrice =
      input.originalPrice !== undefined ? input.originalPrice : existing.originalPrice;

    // Si el administrador modifica el precio y no especificó manualmente otro precio anterior,
    // guardamos el precio previo en originalPrice para mostrarlo tachado.
    if (
      input.price !== undefined &&
      input.price.trim() !== existing.price.trim() &&
      input.originalPrice === undefined
    ) {
      resolvedOriginalPrice = existing.price;
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.category !== undefined ? { category: input.category } : {}),
        ...(input.subcategory !== undefined ? { subcategory: input.subcategory } : {}),
        ...(input.theme !== undefined ? { theme: input.theme } : {}),
        ...(input.colorName !== undefined ? { colorName: input.colorName } : {}),
        ...(input.price !== undefined ? { price: input.price } : {}),
        originalPrice: resolvedOriginalPrice,
        ...(input.description !== undefined ? { description: input.description } : {}),
        ...(input.material !== undefined ? { material: input.material } : {}),
        ...(input.features !== undefined ? { features: input.features } : {}),
        ...(input.sizes !== undefined ? { sizes: input.sizes } : {}),
        ...(input.primaryImage !== undefined ? { primaryImage: input.primaryImage } : {}),
        ...(input.hoverImage !== undefined ? { hoverImage: input.hoverImage } : {}),
        ...(input.badge !== undefined ? { badge: input.badge } : {}),
        ...(input.badgeColor !== undefined ? { badgeColor: input.badgeColor } : {}),
        ...(input.isNew !== undefined ? { isNew: input.isNew } : {}),
        ...(input.featured !== undefined ? { featured: input.featured } : {}),
      },
    });

    return mapPrismaProductToItem(updated);
  }
}

// Instancia singleton para inyección limpia
export const productRepository = new ProductRepository();
