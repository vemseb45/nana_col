import { NextRequest } from "next/server";
import { productService } from "@/backend/modules/products/product.service";
import { successResponse, errorResponse } from "@/backend/shared/api-response";

/**
 * Endpoint REST: GET /api/products
 * Soporta filtros:
 * - ?category=mujer | ninos
 * - ?q=nombre_o_tema
 * - ?featured=true|false
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const subcategory = searchParams.get("subcategory") || undefined;
    const query = searchParams.get("q") || undefined;
    const featuredParam = searchParams.get("featured");
    const featured = featuredParam !== null ? featuredParam === "true" : undefined;

    const products = await productService.listProducts({
      category,
      subcategory,
      query,
      featured,
    });

    return successResponse(products, products.length);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al obtener productos";
    return errorResponse(message, 500);
  }
}
