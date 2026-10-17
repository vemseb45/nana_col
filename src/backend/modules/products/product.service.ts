import { ProductItem } from "@/types/product.types";
import { IProductRepository, productRepository, ProductQueryFilter } from "./product.repository";

export class ProductService {
  constructor(private repo: IProductRepository = productRepository) {}

  async listProducts(filter?: ProductQueryFilter): Promise<ProductItem[]> {
    return this.repo.getAll(filter);
  }

  async getProduct(id: string): Promise<ProductItem | null> {
    if (!id || typeof id !== "string") {
      throw new Error("El ID del producto es inválido.");
    }
    return this.repo.getById(id);
  }

  async getWomenSwimwear(): Promise<ProductItem[]> {
    return this.repo.getWomenCollection();
  }

  async getKidsSwimwear(): Promise<ProductItem[]> {
    return this.repo.getKidsCollection();
  }

  async getFamilySwimwear(): Promise<ProductItem[]> {
    return this.repo.getFamilySwimwearCollection();
  }

  async getFamilyTrunks(): Promise<ProductItem[]> {
    return this.repo.getFamilyTrunksCollection();
  }

  async getHeroHighlights(): Promise<ProductItem[]> {
    return this.repo.getFeatured();
  }
}

export const productService = new ProductService();
