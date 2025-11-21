import { m } from 'framer-motion';
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { SERVICES } from '../../lib/constants';
import { useDevMode } from '../../lib/DevModeContext';

export default function ServicesSection() {
  const { devMode } = useDevMode();

  return (
    <section id="services" aria-labelledby="services-heading" className={`w-full py-20 -mt-50 bg-[var(--background)] ${devMode ? 'border-2 border-gray-50' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <m.h2
          id="services-heading"
          className="text-6xl md:text-6xl lg:text-7xl font-bold text-primary text-center pb-40"
          initial={{ opacity: 0, transform: 'translateY(-20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.5 }}
          style={{ willChange: 'transform, opacity' }}
        >
          Our Services
        </m.h2> 
        {/* Container con backdrop blur unificado */}
        <div className="relative">
          {/* Backdrop blur layer con contenido para blur - detrás de todas las cards */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-[200px]" />
          </div>
          
          {/* Grid responsivo mejorado para centrar las cards en móvil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 relative z-10 place-items-center">
            {SERVICES.map((service, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, transform: 'translateY(20px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-20 w-full flex justify-center"
                style={{ willChange: 'transform, opacity' }}
              >
                <NeonGradientCard 
                  className="w-full max-w-[550px] md:max-w-[400px] min-h-[300px] md:min-h-[200px] flex items-center justify-center text-center [&>div]:!bg-[var(--background)] [&>div]:flex [&>div]:items-center [&>div]:justify-center"
                  borderSize={3}
                  borderRadius={16}
                  neonColors={{
                    firstColor: "#8c64ff",
                    secondColor: "var(--highlight-background)"
                  }}
                >
                  {/* Contenedor centrado verticalmente dentro de la card */}
                  <div className="w-full flex justify-center pt-8 pb-0 px-8 md:p-6 -translate-y-[5px] md:translate-y-0">
                    <h3 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-br from-[--accent] via-[--highlight] to-[--highlight-text-light] bg-clip-text text-center text-6xl md:text-6xl lg:text-6xl font-bold leading-[1.12] tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] pb-3">
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