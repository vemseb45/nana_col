import { NextRequest } from 'next/server';
import { authService } from '@/backend/modules/auth/auth.service';
import { getAuthCookieName } from '@/backend/modules/auth/auth.cookies';
import { productService } from '@/backend/modules/products/product.service';
import { errorResponse, successResponse } from '@/backend/shared/api-response';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(getAuthCookieName())?.value;
    const admin = await authService.verifySessionToken(token);

    if (!admin) {
      return errorResponse('No autorizado', 401);
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const query = searchParams.get('q') || undefined;

    const products = await productService.listProducts({ category, query });
    return successResponse(products, products.length);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error al cargar catálogo';
    return errorResponse(message, 500);
  }
}
