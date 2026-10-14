import { categoryService } from "@/backend/modules/categories/category.service";
import { successResponse, errorResponse } from "@/backend/shared/api-response";

/**
 * Endpoint REST: GET /api/categories
 */
export async function GET() {
  try {
    const categories = await categoryService.getAll();
    return successResponse(categories, categories.length);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error al obtener categorías";
    return errorResponse(message, 500);
  }
}
