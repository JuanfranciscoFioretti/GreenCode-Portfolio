'use client';

import { m } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { SERVICES } from '../../lib/constants';
import { useDevMode } from '../../lib/DevModeContext';

export default function ServicesSection() {
  const { devMode } = useDevMode();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Memoizar los servicios para evitar recalcular
  const servicesWithDelay = useMemo(() => 
    SERVICES.map((service, index) => ({ service, index })),
    []
  );

  return (
    <section id="services" aria-labelledby="services-heading" className={`w-full pt-20 pb-40 -mt-50 bg-[var(--background)] ${devMode ? 'border-2 border-gray-50' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <m.h2
          id="services-heading"
          className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-primary text-center pb-20 sm:pb-40"
          initial={{ opacity: 0, transform: 'translateY(-20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.5 }}
          style={{ willChange: 'transform, opacity' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Our Services
        </m.h2> 
        {/* Container con backdrop blur unificado */}
        <div className="relative">
          {/* Backdrop blur layer - optimizado para mobile */}
          <div className={`absolute inset-0 z-0 ${isMobile ? 'pointer-events-none' : ''}`}>
            <div className={`w-full h-full bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10 ${isMobile ? 'blur-[100px]' : 'blur-[400px]'}`} />
          </div>
          
          {/* Grid responsivo mejorado para centrar las cards en móvil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 relative z-10 place-items-center">
            {servicesWithDelay.map(({ service, index }) => (
              <m.div
                key={index}
                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ 
                  duration: 0.5, 
                  delay: isMobile ? 0 : index * 0.15 
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative z-20 w-full flex justify-center"
                style={{ willChange: 'transform, opacity' }}
              >
                <NeonGradientCard 
                  className="w-full max-w-[550px] md:max-w-[380px] min-h-[280px] md:min-h-[200px] flex items-center justify-center text-center [&>div]:!bg-[var(--background)] [&>div]:flex [&>div]:items-center [&>div]:justify-center"
                  borderSize={3}
                  borderRadius={16}
                  neonColors={{
                    firstColor: "#8c64ff",
                    secondColor: "var(--highlight-background)"
                  }}
                >
                  {/* Contenedor centrado verticalmente dentro de la card */}
                  <div className="w-full flex justify-center pt-6 pb-0 px-6 sm:pt-8 sm:pb-0 sm:px-8 md:p-6 md:-translate-y-[5px]">
                    <h3 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-br from-[--accent] via-[--highlight] to-[--highlight-text-light] bg-clip-text text-center text-5xl sm:text-6xl md:text-6xl lg:text-6xl font-bold leading-[1.12] tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] pb-3">
                      {service.title}
                    </h3>
                  </div>
                </NeonGradientCard>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}