import { ProductItem } from '@/types/product.types';
import {
  IProductRepository,
  productRepository,
  ProductQueryFilter,
  ProductUpdateInput,
} from './product.repository';

export class ProductService {
  constructor(private repo: IProductRepository = productRepository) {}

  async listProducts(filter?: ProductQueryFilter): Promise<ProductItem[]> {
    return this.repo.getAll(filter);
  }

  async getProduct(id: string): Promise<ProductItem | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('El ID del producto es inválido.');
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

  async updateProduct(id: string, input: ProductUpdateInput): Promise<ProductItem | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('El ID del producto es inválido.');
    }
    return this.repo.updateById(id, input);
  }
}

export const productService = new ProductService();
