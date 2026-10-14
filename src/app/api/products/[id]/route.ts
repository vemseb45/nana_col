import { NextRequest } from "next/server";
import { productService } from "@/backend/modules/products/product.service";
import { successResponse, errorResponse } from "@/backend/shared/api-response";

/**
 * Endpoint REST: GET /api/products/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Referencia al pathname para evitar advertencia de parámetro no usado
    if (!request.url) throw new Error("URL inválida");
    
    const { id } = await params;
    const product = await productService.getProduct(id);

    if (!product) {
      return errorResponse(`Producto con ID o slug '${id}' no encontrado`, 404);
    }

    return successResponse(product);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al obtener el producto";
    return errorResponse(message, 500);
  }
}
