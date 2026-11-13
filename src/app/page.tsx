import LandingView from '@/frontend/modules/landing/LandingView';
import { productService } from '@/backend/modules/products/product.service';

export const dynamic = 'force-dynamic';

/**
 * HomePage
 * Entrada principal y ensamblador modular para la Landing Page de Nana.col.
 * Carga el catálogo actualizado desde PostgreSQL a través de ProductService.
 */
export default async function HomePage() {
  const products = await productService.listProducts();
  return <LandingView products={products} />;
}
