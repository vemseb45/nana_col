import { ALL_PRODUCTS } from '@/constants/landing.data';
import { prisma } from '@/backend/shared/prisma';

let seedPromise: Promise<void> | null = null;

/**
 * Garantiza que el catálogo inicial de productos esté cargado en PostgreSQL.
 */
export async function ensureProductsSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const count = await prisma.product.count();
      if (count > 0) return;

      await prisma.product.createMany({
        data: ALL_PRODUCTS.map((item, index) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          category: item.category,
          subcategory: item.subcategory,
          theme: item.theme ?? null,
          colorName: item.colorName,
          price: item.price,
          originalPrice: item.originalPrice ?? null,
          description: item.description,
          material: item.material,
          features: item.features,
          sizes: item.sizes,
          primaryImage: item.primaryImage,
          hoverImage: item.hoverImage ?? null,
          badge: item.badge ?? null,
          badgeColor: item.badgeColor ?? null,
          isNew: Boolean(item.isNew),
          featured: Boolean(item.featured),
          sortOrder: index + 1,
        })),
        skipDuplicates: true,
      });
    })().catch((err) => {
      seedPromise = null;
      throw err;
    });
  }

  return seedPromise;
}
