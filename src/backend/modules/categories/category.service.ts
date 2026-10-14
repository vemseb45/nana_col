import { CategoryItem } from "@/types/product.types";
import { CATEGORIES } from "@/constants/landing.data";

export class CategoryService {
  async getAll(): Promise<CategoryItem[]> {
    return CATEGORIES;
  }

  async getBySlug(slug: string): Promise<CategoryItem | null> {
    const found = CATEGORIES.find((c) => c.slug === slug || c.id === slug);
    return found || null;
  }
}

export const categoryService = new CategoryService();
