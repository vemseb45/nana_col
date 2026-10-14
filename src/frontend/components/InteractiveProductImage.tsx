'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface InteractiveProductImageProps {
  src: string;
  alt: string;
  badge?: string | null;
  badgeColor?: string;
  className?: string;
}

/**
 * InteractiveProductImage Component
 * 
 * Permite al usuario mover las fotos hacia los lados (izquierda/derecha) y arriba/abajo,
 * esencial para vestidos o trajes infantiles que contienen 4 fotos combinadas en una sola
 * imagen o formatos panorámicos que de otro modo saldrían cortados.
 * 
 * Características:
 * - Arrastre fluido táctil en celulares (Touch swipe/drag).
 * - Arrastre con clic en PC (Mouse drag con cursor grab/grabbing).
 * - Botones de navegación rápida (Izquierda, Centro, Derecha).
 * - Alternador de vista: "Modo Detalle / Arrastrar" vs "Ver Completa (Sin cortes)".
 */
export default function InteractiveProductImage({
  src,
  alt,
  badge,
  badgeColor,
  className = '',
}: InteractiveProductImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Desplazamiento actual (X, Y)
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [startOffset, setStartOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // Modo de visualización: 'pan' (Detalle deslizable) o 'contain' (Foto completa sin cortes)
  const [viewMode, setViewMode] = useState<'pan' | 'contain'>('pan');

  // Reiniciar posición al cambiar de imagen sin efectos secundarios en cascada (React 19 / Clean Code)
  const [prevSrc, setPrevSrc] = useState<string>(src);
  if (prevSrc !== src) {
    setPrevSrc(src);
    setOffset({ x: 0, y: 0 });
  }

  // Límites dinámicos de arrastre
  const maxDragX = 500;
  const maxDragY = 300;

  // Manejo de Mouse Drag (PC)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode === 'contain') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setStartOffset(offset);
    setHasInteracted(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    const newX = Math.max(-maxDragX, Math.min(maxDragX, startOffset.x + deltaX));
    const newY = Math.max(-maxDragY, Math.min(maxDragY, startOffset.y + deltaY));

    setOffset({ x: newX, y: newY });
  }, [isDragging, dragStart, startOffset]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Manejo Táctil (Móviles y Tablets)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (viewMode === 'contain') return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      setStartOffset(offset);
      setHasInteracted(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;

    const newX = Math.max(-maxDragX, Math.min(maxDragX, startOffset.x + deltaX));
    const newY = Math.max(-maxDragY, Math.min(maxDragY, startOffset.y + deltaY));

    setOffset({ x: newX, y: newY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Botones de desplazamiento rápido
  const panLeft = () => {
    setOffset((prev) => ({ ...prev, x: Math.min(maxDragX, prev.x + 160) }));
    setHasInteracted(true);
  };

  const panRight = () => {
    setOffset((prev) => ({ ...prev, x: Math.max(-maxDragX, prev.x - 160) }));
    setHasInteracted(true);
  };

  const resetPan = () => {
    setOffset({ x: 0, y: 0 });
    setHasInteracted(true);
  };

  return (
    <div className={`relative flex flex-col gap-2 ${className}`}>
      {/* Contenedor Principal de la Imagen */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-orange-50/70 border border-orange-100/80 shadow-inner select-none ${
          viewMode === 'pan' ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
        }`}
      >
        {/* Imagen con transform interactivo */}
        <div
          className="w-full h-full flex items-center justify-center transition-transform"
          style={{
            transform:
              viewMode === 'pan'
                ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
                : 'none',
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
          }}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            className={`pointer-events-none ${
              viewMode === 'contain'
                ? 'max-h-full max-w-full object-contain'
                : 'min-w-[125%] min-h-[125%] object-cover object-center scale-110'
            }`}
          />
        </div>

        {/* Badge del Producto */}
        {badge && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span
              className={`${
                badgeColor || 'bg-primary text-white'
              } text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md`}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Botón Superior Derecho: Alternar "Ver Completa" vs "Detalle / Arrastrar" */}
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setViewMode((prev) => (prev === 'pan' ? 'contain' : 'pan'));
              resetPan();
            }}
            title={viewMode === 'pan' ? 'Ver foto completa sin recortes' : 'Modo detalle deslizable'}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-white/90 hover:bg-white text-gray-800 text-[11px] font-bold rounded-full shadow-md backdrop-blur-md border border-orange-100 transition-all hover:scale-105"
          >
            <span className="material-icons-outlined text-sm text-primary">
              {viewMode === 'pan' ? 'aspect_ratio' : 'pan_tool'}
            </span>
            <span className="hidden sm:inline">
              {viewMode === 'pan' ? 'Ver Completa' : 'Deslizar'}
            </span>
          </button>
        </div>

        {/* Flechas flotantes laterales para navegar fotos en collage */}
        {viewMode === 'pan' && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                panLeft();
              }}
              aria-label="Ver lado izquierdo de la imagen"
              title="Mover a la izquierda"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-white/85 hover:bg-white text-gray-800 rounded-full shadow-md border border-orange-100/70 transition-all hover:scale-110 active:scale-95"
            >
              <span className="material-icons-outlined text-base sm:text-lg">chevron_left</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                panRight();
              }}
              aria-label="Ver lado derecho de la imagen"
              title="Mover a la derecha"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 sm:p-2 bg-white/85 hover:bg-white text-gray-800 rounded-full shadow-md border border-orange-100/70 transition-all hover:scale-110 active:scale-95"
            >
              <span className="material-icons-outlined text-base sm:text-lg">chevron_right</span>
            </button>
          </>
        )}

        {/* Banner de Ayuda Visual */}
        {viewMode === 'pan' && !hasInteracted && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none animate-bounce">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/70 text-white text-[10px] sm:text-[11px] font-medium rounded-full shadow-md backdrop-blur-xs">
              <span className="material-icons-outlined text-xs">pan_tool</span>
              Arrastra para mover la foto
            </span>
          </div>
        )}
      </div>

      {/* Barra Inferior de Controles de Movimiento */}
      {viewMode === 'pan' && (
        <div className="flex items-center justify-between px-2 py-1 bg-orange-50/60 rounded-xl border border-orange-100/80 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={panLeft}
              className="px-2 py-1 bg-white hover:bg-orange-100 rounded-lg border border-orange-200/60 font-semibold text-[11px] flex items-center gap-0.5 transition-colors"
            >
              <span className="material-icons-outlined text-xs">arrow_back</span>
              <span>Izq</span>
            </button>

            <button
              type="button"
              onClick={resetPan}
              className="px-2 py-1 bg-white hover:bg-orange-100 rounded-lg border border-orange-200/60 font-semibold text-[11px] flex items-center gap-0.5 transition-colors"
            >
              <span className="material-icons-outlined text-xs">center_focus_strong</span>
              <span>Centro</span>
            </button>

            <button
              type="button"
              onClick={panRight}
              className="px-2 py-1 bg-white hover:bg-orange-100 rounded-lg border border-orange-200/60 font-semibold text-[11px] flex items-center gap-0.5 transition-colors"
            >
              <span>Der</span>
              <span className="material-icons-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
            Mueve ↔ ↕ con clic o dedo
          </span>
        </div>
      )}
    </div>
  );
}
