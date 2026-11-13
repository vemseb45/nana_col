import { NextRequest } from 'next/server';
import { z } from 'zod';
import { authService } from '@/backend/modules/auth/auth.service';
import { getAuthCookieName } from '@/backend/modules/auth/auth.cookies';
import { productService } from '@/backend/modules/products/product.service';
import { errorResponse, successResponse } from '@/backend/shared/api-response';

const updateProductSchema = z.object({
  name: z.string().trim().min(2).max(160).optional(),
  colorName: z.string().trim().min(2).max(120).optional(),
  category: z
    .enum(['mujer', 'ninos', 'accesorios', 'vestidos_familiares', 'pantalonetas_familiares'])
    .optional(),
  subcategory: z
    .enum([
      'vestido_bano',
      'bikini',
      'enterizo',
      'nino',
      'nina',
      'familia',
      'pantaloneta',
      'resort',
    ])
    .optional(),
  theme: z.string().trim().max(80).nullable().optional(),
  price: z.string().trim().min(2).max(40).optional(),
  originalPrice: z.string().trim().max(40).nullable().optional(),
  description: z.string().trim().min(5).max(1200).optional(),
  material: z.string().trim().min(2).max(200).optional(),
  features: z.array(z.string().trim().min(1).max(160)).max(20).optional(),
  sizes: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
  primaryImage: z.string().trim().min(2).max(300).optional(),
  hoverImage: z.string().trim().max(300).nullable().optional(),
  badge: z.string().trim().max(60).nullable().optional(),
  badgeColor: z.string().trim().max(60).nullable().optional(),
  isNew: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get(getAuthCookieName())?.value;
    const admin = await authService.verifySessionToken(token);

    if (!admin) {
      return errorResponse('No autorizado', 401);
    }

    const { id } = await params;
    const body: unknown = await request.json();
    const parsed = updateProductSchema.safeParse(body);

    if (!parsed.success) {
      return errorResponse(
        parsed.error.issues[0]?.message || 'Datos de producto inválidos',
        400
      );
    }

    const updated = await productService.updateProduct(id, parsed.data);
    if (!updated) {
      return errorResponse('Producto no encontrado', 404);
    }

    return successResponse(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error al actualizar el producto';
    return errorResponse(message, 500);
  }
}
