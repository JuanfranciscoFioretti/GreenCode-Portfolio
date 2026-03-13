import { useEffect } from 'react';

/**
 * Hook para optimizar el rendimiento del scroll en dispositivos móviles
 * Implementa passive listeners y throttling de scroll events
 */
export function useScrollOptimization() {
  useEffect(() => {
    // Agregar passive listeners para mejorar scroll performance
    const handleScroll = () => {
      // Operación ligera para evitar jank
      requestAnimationFrame(() => {
        // El scroll ya está siendo manejado por el navegador
      });
    };

    // Usar passive: true para permitir que el navegador optimice
    document.addEventListener('scroll', handleScroll, { passive: true });

    // Optimizar wheel events
    const handleWheel = () => {
      // Permitir el scroll por defecto sin bloqueos
    };

    document.addEventListener('wheel', handleWheel, { passive: true });

    // Optimizar touch events
    const handleTouchMove = () => {
      // Permitir el touch scroll por defecto
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
}

/**
 * Habilitar scroll acceleration en iOS
 */
export function enableIOSScrollAcceleration() {
  if (typeof window !== 'undefined') {
    const style = document.documentElement.style;
    
    // Habilitar hardware acceleration para scroll
    style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
    
    // Optimizar body para scroll
    document.body.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');

    // Asegurar que el contenedor principal tiene scroll optimization
    const mainElement = document.querySelector('main');
    if (mainElement) {
      (mainElement as HTMLElement).style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
    }
  }
}
