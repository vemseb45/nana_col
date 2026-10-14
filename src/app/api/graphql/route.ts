import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/backend/modules/products/product.service";
import { categoryService } from "@/backend/modules/categories/category.service";

/**
 * GraphQL Handler para Nana Home
 * Provee resolución para consultas GraphQL como:
 * {
 *   products(category: "mujer") { id name price primaryImage hoverImage }
 *   product(id: "vestido-rojo") { id name description material sizes }
 *   categories { id title desc img }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { query, variables } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { errors: [{ message: "Debe proporcionar una consulta GraphQL válida en 'query'." }] },
        { status: 400 }
      );
    }

    const trimmed = query.trim();

    // Resolvers en base al AST simple de la consulta
    const data: Record<string, unknown> = {};

    // 1. Resolver: products
    if (trimmed.includes("products")) {
      // Extraer posible argumento category
      let category = variables?.category;
      if (!category) {
        const matchCat = trimmed.match(/products\s*\(\s*category:\s*["']([^"']+)["']/i);
        if (matchCat) category = matchCat[1];
      }

      const products = await productService.listProducts({ category });
      data.products = products;
    }

    // 2. Resolver: product(id: "...")
    if (trimmed.includes("product(")) {
      let id = variables?.id;
      if (!id) {
        const matchId = trimmed.match(/product\s*\(\s*id:\s*["']([^"']+)["']/i);
        if (matchId) id = matchId[1];
      }

      if (id) {
        data.product = await productService.getProduct(id);
      } else {
        data.product = null;
      }
    }

    // 3. Resolver: categories
    if (trimmed.includes("categories")) {
      data.categories = await categoryService.getAll();
    }

    return NextResponse.json({
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error procesando consulta GraphQL";
    return NextResponse.json(
      { errors: [{ message }] },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "GraphQL endpoint activo",
    supportedQueries: [
      "{ products { id name price primaryImage } }",
      "{ products(category: \"mujer\") { id name price } }",
      "{ products(category: \"ninos\") { id name theme } }",
      "{ product(id: \"vestido-rojo\") { id name description features } }",
      "{ categories { id title desc } }",
    ],
  });
}
