'use client';

import { useState } from 'react';
import { ProductItem } from '@/types/product.types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesBanner from './components/FeaturesBanner';
import Categories from './components/Categories';
import Collection from './components/Collection';
import FamilySwimwearCollection from './components/FamilySwimwearCollection';
import FamilyTrunksCollection from './components/FamilyTrunksCollection';
import KidsCollection from './components/KidsCollection';
import About from './components/About';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductDetailModal from '@/frontend/components/ProductDetailModal';
import SearchModal from '@/frontend/components/SearchModal';
import WhatsAppFloatingButton from '@/frontend/components/WhatsAppFloatingButton';

/**
 * LandingView Component
 * Orquestador principal modular del frontend para Nana Home.
 * Principio SOLID: Single Responsibility & Inversión de Control.
 */
export default function LandingView() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-background-light text-text-light flex flex-col justify-between selection:bg-primary/20 selection:text-primary">
      {/* Barra de Navegación con logo oficial /logo.png */}
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />

      {/* Contenido Principal */}
      <main className="flex-1">
        {/* Sección Hero Tropical */}
        <Hero />

        {/* Pilares de Marca (Garantías UV 50+, Secado Rápido, Asesoría) */}
        <FeaturesBanner />

        {/* Categorías Principales */}
        <Categories />

        {/* Colección Mujer - Vestidos de Baño con Parejas Prenda / Modelo */}
        <Collection onOpenQuickView={(prod) => setSelectedProduct(prod)} />

        {/* Sección Familiar - Vestidos de Baño en Familia (Doble Escena) */}
        <FamilySwimwearCollection onOpenQuickView={(prod) => setSelectedProduct(prod)} />

        {/* Sección Familiar - Pantalonetas en Familia */}
        <FamilyTrunksCollection onOpenQuickView={(prod) => setSelectedProduct(prod)} />

        {/* Colección Infantil - Vestidos y Trajes de Baño Niños y Niñas */}
        <KidsCollection onOpenQuickView={(prod) => setSelectedProduct(prod)} />

        {/* Nuestra Esencia / Sostenibilidad */}
        <About />

        {/* Boletín de Novedades */}
        <Newsletter />
      </main>

      {/* Pie de Página Oficial */}
      <Footer />

      {/* Modales de Experiencia Visual */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      {/* Botones de Acción Global */}
      <WhatsAppFloatingButton />
    </div>
  );
}
