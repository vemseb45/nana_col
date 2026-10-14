<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Nana Home — Arquitectura del Proyecto & Principios de Desarrollo

Documento maestro para guiar el desarrollo, mantenimiento y escalabilidad del proyecto web de **Nana Home** (Moda playera, vestidos de baño para mujer y trajes de baño infantiles).


## 2. Estructura de Directorios

```
nana_col/
├── public/
│   ├── favicon.ico                   # Favicon oficial con el logo real
│   ├── logo.png                      # Logo oficial de alta resolución de Nana Home
│   └── img/                          # Banco de imágenes (prenda y modelo)
│       ├── modelo_vestido_*.jpeg     # Fotografía puesta en modelo
│       ├── vestido_*.jpeg            # Fotografía exclusiva de la prenda
│       ├── niño_*.jpeg               # Trajes infantiles de niños (Spiderman, Batman, etc.)
│       └── niña_*.jpeg               # Vestidos de niñas (Gatita, Mumis, Cisne)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── categories/route.ts   # Endpoint REST: GET /api/categories
│   │   │   ├── products/route.ts     # Endpoint REST: GET /api/products
│   │   │   ├── products/[id]/route.ts# Endpoint REST: GET /api/products/[id]
│   │   │   └── graphql/route.ts      # Endpoint GraphQL: POST /api/graphql
│   │   ├── globals.css               # Estilos globales Tailwind v4 y animaciones
│   │   ├── icon.png                  # Icono de aplicación generado a partir de logo.png
│   │   ├── layout.tsx                # Layout raíz con metadataBase, favicon y fuentes
│   │   └── page.tsx                  # Ensamblador de Next.js (delega a LandingView)
│   ├── backend/
│   │   ├── modules/
│   │   │   ├── categories/           # CategoryService
│   │   │   └── products/             # IProductRepository, ProductRepository, ProductService
│   │   └── shared/
│   │       └── api-response.ts       # Utilidad estandarizada de respuestas API
│   ├── constants/
│   │   ├── brand.data.ts             # Datos de contacto, WhatsApp y generadores de mensajes
│   │   ├── kids-products.data.ts     # Catálogo de vestidos y trajes infantiles
│   │   ├── landing.data.ts           # Categorías principales y pilares de marca
│   │   └── products.data.ts          # Catálogo femenino con parejas (modelo / prenda)
│   ├── frontend/
│   │   ├── components/
│   │   │   ├── ProductCard.tsx       # Tarjeta de producto con cambio modelo <-> prenda
│   │   │   ├── ProductDetailModal.tsx# Modal de vista rápida y asesoría
│   │   │   ├── SearchModal.tsx       # Búsqueda reactiva por nombre, color o personaje
│   │   │   ├── ThemeToggle.tsx       # Modo oscuro/claro con useSyncExternalStore
│   │   │   └── WhatsAppFloatingButton.tsx # Botón flotante de atención en vivo
│   │   └── modules/landing/
│   │       ├── LandingView.tsx       # Orquestador del frontend
│   │       └── components/           # Navbar, Hero, Categories, Collection, KidsCollection,
│   │                                 # FeaturesBanner, About, Newsletter, Footer
│   ├── proxy.ts                      # Proxy oficial de Next.js 16 con cabeceras de seguridad
│   └── types/
│       └── product.types.ts          # Definición de interfaces de TypeScript
├── AGENTS.md                         # Documentación maestra y reglas de desarrollo
└── tsconfig.json
```



