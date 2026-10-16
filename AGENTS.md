<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Manual y Reglas de Desarrollo — Nana.col

Este documento establece las reglas obligatorias de arquitectura, diseño, patrones de código y reglas de negocio para el desarrollo de la aplicación web de **Nana.col**. Toda modificación o nueva funcionalidad debe apegarse estrictamente a estas directrices.

---

## 1. Principios Fundamentales de Ingeniería de Software

### A. SOLID
1. **Single Responsibility Principle (SRP):**
   - Cada componente, hook y servicio debe tener una única razón para cambiar.
   - `ProductCard.tsx`: Renderizado de tarjeta de producto y alternancia táctil/hover entre modelo y prenda.
   - `ProductDetailModal.tsx`: Presentación de detalles, medidas y enlace de consulta con foto.
   - `SearchModal.tsx`: Búsqueda instantánea reactiva sin lógica de renderizado principal.
   - `ProductService.ts`: Lógica de negocio y filtrado del catálogo.
   - `ProductRepository.ts`: Acceso y consulta de datos.
   - `proxy.ts`: Seguridad, control de cabeceras HTTP y redirecciones.
2. **Open/Closed Principle (OCP):**
   - El sistema está abierto a la extensión pero cerrado a la modificación.
   - Para conectar nuevas fuentes de datos (ej. migrar de constantes a PostgreSQL / Prisma), se implementa la interfaz `IProductRepository` sin alterar los componentes de React ni las rutas API existentes.
3. **Liskov Substitution Principle (LSP):**
   - Cualquier producto (colección mujer, trajes de niños o vestidos de niñas) implementa el contrato `ProductItem`, garantizando que `ProductCard` pueda renderizarlos indistintamente sin condicionales que rompan la estructura.
4. **Interface Segregation Principle (ISP):**
   - Interfaces pequeñas, concisas y orientadas al cliente (`ProductItem`, `CategoryItem`, `BrandInfo`, `ApiResponse<T>`). No crear interfaces monolíticas con propiedades innecesarias.
5. **Dependency Inversion Principle (DIP):**
   - Los módulos de alto nivel (controladores y servicios) dependen de abstracciones (`IProductRepository`), no de implementaciones concretas acopladas.

### B. DRY (Don't Repeat Yourself)
- **Centralización de datos:** Toda la información de productos, categorías y textos reside en `src/constants/` (`products.data.ts`, `kids-products.data.ts`, `brand.data.ts`, `landing.data.ts`).
- **Generador de enlaces de WhatsApp:** Utilidad `getWhatsAppProductUrl` reutilizada transversalmente en tarjetas, modal de detalle y buscador rápido.
- **Componentes reutilizables:** `ProductCard`, `ProductDetailModal` y botones de acción se consumen modularmente.

### C. Clean Code & React 19
- Tipado estricto en TypeScript; **queda terminantemente prohibido el uso de `any`**.
- Sin efectos secundarios en cascada: nunca llamar a `setState` síncronamente dentro de un `useEffect` durante el ciclo de render.
- **Identidad Luminosa Unificada:** Modo oscuro deshabilitado; la web mantiene un diseño tropical claro continuo (`#FFF8F0` / blanco).
- **Prevención de Discrepancias de Hidratación (SSR vs Cliente):**
  - Prohibido usar bifurcaciones `typeof window !== 'undefined'` para calcular atributos HTML (`href`, `src`, `title`, etc.) en componentes renderizados en SSR.
  - La construcción de enlaces y URLs (ej. `getWhatsAppProductUrl`) debe ser determinista e idéntica en servidor y cliente utilizando el dominio canónico o `process.env.NEXT_PUBLIC_SITE_URL`.
- Código auto-documentado con nomenclatura semántica y eliminación rigurosa de código muerto.

---

## 2. Arquitectura y Estructura de Directorios

La estructura modular se divide limpiamente entre capas de presentación y lógica:

```
nana_col/
├── public/
│   ├── favicon.ico                   # Favicon oficial con el logo real de Nana.col
│   ├── logo.png                      # Logo original de alta resolución
│   ├── og/                           # Miniaturas Open Graph optimizadas (<100KB) para WhatsApp
│   └── img/                          # Banco de imágenes locales
│       ├── modelo_vestido_*.jpeg     # Fotografía en modelo (vista primaria)
│       ├── vestido_*.jpeg            # Fotografía exclusiva de la prenda (vista secundaria)
│       ├── niño_*.jpeg / nino_*.jpeg # Trajes infantiles de niños (Spiderman, Batman, etc.)
│       └── niña_*.jpeg / nina_*.jpeg # Vestidos de niñas (Gatita, Mumis, Cisne)
├── src/
│   ├── app/                          # Next.js 16 App Router (Orquestación & Rutas)
│   │   ├── api/
│   │   │   ├── categories/route.ts   # REST API: GET /api/categories
│   │   │   ├── products/route.ts     # REST API: GET /api/products
│   │   │   ├── products/[id]/route.ts# REST API: GET /api/products/[id]
│   │   │   └── graphql/route.ts      # GraphQL Endpoint: query { products, product, categories }
│   │   ├── p/[id]/page.tsx           # Vista previa enriquecida y Open Graph card para WhatsApp
│   │   ├── globals.css               # Configuración Tailwind v4 y animaciones
│   │   ├── icon.png                  # Icono nativo App Router
│   │   ├── layout.tsx                # Layout raíz con metadataBase, iconos y fuentes
│   │   └── page.tsx                  # Ensamblador de Next.js (delega a LandingView)
│   ├── backend/                      # Servicios y repositorios desacoplados
│   │   ├── modules/
│   │   │   ├── categories/           # CategoryService
│   │   │   └── products/             # IProductRepository, ProductRepository, ProductService
│   │   └── shared/
│   │       └── api-response.ts       # Respuestas estandarizadas success/error
│   ├── constants/                    # Fuente de verdad de datos (DRY)
│   │   ├── brand.data.ts             # Datos oficiales, tienda física y generador WhatsApp
│   │   ├── kids-products.data.ts     # Catálogo infantil con estampados de personajes
│   │   ├── landing.data.ts           # Categorías principales y pilares de la marca
│   │   └── products.data.ts          # Catálogo femenino con parejas modelo/prenda
│   ├── frontend/
│   │   ├── components/               # Componentes UI reutilizables y atómicos
│   │   │   ├── ProductCard.tsx       # Tarjeta con alternancia modelo/vestido (Desktop y Celular)
│   │   │   ├── ProductDetailModal.tsx# Modal de visualización rápida y guía de tallas
│   │   │   ├── SearchModal.tsx       # Buscador interactivo por nombre, color o personaje
│   │   │   └── WhatsAppFloatingButton.tsx # Botón flotante accesible
│   │   └── modules/landing/          # Ensamblador y componentes específicos de la Landing
│   │       ├── LandingView.tsx       # Orquestador del frontend
│   │       └── components/           # Navbar, Hero, Categories, Collection, KidsCollection,
│   │                                 # FeaturesBanner, About, Newsletter, Footer
│   ├── proxy.ts                      # Proxy oficial de Next.js 16 con cabeceras de seguridad
│   └── types/
│       └── product.types.ts          # Contratos e interfaces de TypeScript
├── AGENTS.md                         # Documento de reglas maestras de desarrollo
└── tsconfig.json
```

---

## 3. Reglas de Negocio Obligatorias de la Marca

1. **Modo Catálogo Visual (Sin pasarela de pago ni carrito de compras):**
   - La plataforma web opera exclusivamente como catálogo de visualización y asesoría.
   - En lugar de carritos o checkouts complejos, todas las intenciones de compra y consulta se canalizan directamente a **WhatsApp**.
2. **Visualización Invertida Obligatoria (Modelo $\rightarrow$ Prenda):**
   - **Vista Primaria (Default):** Primero debe verse la **MODELO** luciendo el vestido (`modelo_vestido_*.jpeg`).
   - **Vista Secundaria (Hover en PC / Toque en Celular):** Al pasar el cursor o dar toque táctil en móviles, cambia a la foto de **SOLO EL VESTIDO** (`vestido_*.jpeg`).
   - En prendas que solo cuentan con fotografía en modelo (`modelo_vestido_azulmarino.jpeg`, `modelo_vestido_negro.jpeg`), se aplica zoom suave sin estados rotos.
   - En dispositivos móviles, cada tarjeta incluye un botón táctil interactivo `[ Modelo | Vestido ]` y soporte de toque directo sobre la imagen.
3. **Línea Infantil Kids (Protección Solar & Personajes):**
   - Diseños inspirados en personajes favoritos: `niño_spiderman`, `niño_batman`, `niño_hulk`, `niño_tiburon`, `niña_gato`, `niña_mumis`, `niña_sisne`.
   - Garantía de protección solar certificada **UPF 50+** para proteger la piel sensible infantil.
4. **Moneda y Precios:**
   - Todos los precios deben expresarse en **Pesos Colombianos (COP)** (ejemplo: `$145.000 COP`, `$85.000 COP`).
5. **Canal de Contacto Oficial:**
   - **Teléfono y WhatsApp:** `+57 315 8684467` (`wa.me/573158684467`).
   - **ESTÁ PROHIBIDO EL USO DE CORREO ELECTRÓNICO:** No se utiliza correo electrónico en la operación ni comunicación de la marca.
6. **Ubicación de la Tienda Física:**
   - `Centro Comercial San Andresito Avenida 68 Local P1 Segundo Piso, Bogotá, Colombia`.
7. **Mensaje de Asesoría en WhatsApp con Previsualización Enriquecida (Rich Preview Card) y Referencia:**
   - Para que WhatsApp despliegue la fotografía del vestido de forma idéntica a los anuncios de Instagram/Facebook, el mensaje utiliza la URL limpia del producto (`https://nana-col.vercel.app/p/[id]`) al final del texto.
   - Cada producto cuenta con página dedicada `/p/[id]` configurada con etiquetas Open Graph (`og:image`, `og:title`, `og:description`, `twitter:card: summary_large_image`).
   - Las imágenes de previsualización residen optimizadas en `public/og/*.jpg` con peso menor a 100 KB (WhatsApp descarta imágenes superiores a 300 KB).
   - El mensaje incluye un código de referencia directo y legible (ej. `REF: NC-VESTIDO-AZUL` o `REF: NC-NINO-SPIDERMAN`), nombre de prenda, color y precio en COP. Se eliminan enlaces crudos o antiestéticos a archivos `/img/`.
8. **Logotipo y Favicon Oficial:**
   - Uso estricto de `public/logo.png`, `public/favicon.ico`, `src/app/icon.png` y `public/apple-touch-icon.png`.
   - El favicon y el logotipo deben ser **estrictamente circulares** con esquinas 100% transparentes (canal alfa), evitando que el navegador renderice recuadros o marcos cuadrados en las pestañas del navegador o dispositivos móviles. Prohibido el uso de logotipos genéricos o favicons por defecto de Next.js.
9. **Diseño Responsive Proporcional en Celulares:**
   - En dispositivos móviles, las grillas de catálogo deben utilizar **2 columnas (`grid-cols-2`)** para evitar tarjetas desproporcionadas y permitir una navegación ágil y estética.
   - Las tipografías de títulos (`Playfair Display`) y cuerpo de texto (`DM Sans`) deben escalarse proporcionalmente para no saturar la pantalla del celular.
10. **Tema Visual Único (Cálido y Luminoso — Sin Modo Oscuro):**
    - Por directriz oficial de marca, la aplicación web opera exclusivamente con un diseño cálido, veraniego y luminoso (`#FFF8F0`, `#FFFFFF`, acento coral `#E57C6F`).
    - El modo oscuro y el botón conmutador de temas han sido eliminados por completo del código y de la interfaz para preservar una identidad visual pura y consistente.
11. **Dominio Oficial y Canales de Marca (Nana.col):**
    - Dominio web oficial en Vercel: `https://nana-col.vercel.app/`.
    - Nombre y usuario oficial de marca en todos los canales y redes: **Nana.col** (`@nana.col` en Instagram, Facebook y TikTok). Prohibido el uso de nanahome.

---

## 4. Estándares de Verificación Pre-Entrega

Antes de dar por concluida cualquier tarea o responder al usuario, el agente debe verificar:
1. **Linter:** Ejecutar `npm run lint` y verificar **0 errores**.
2. **Build:** Ejecutar `npm run build` y asegurar compilación limpia con **código de salida 0**.
3. **Consistencia de Reglas:** Validar que los cambios respeten este archivo `AGENTS.md`.