import { motion } from 'framer-motion';
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { SERVICES } from '../../lib/constants';
import { useDevMode } from '../../lib/DevModeContext';

export default function ServicesSection() {
  const { devMode } = useDevMode();

  return (
    <section id="services" className={`py-20 bg-[var(--background)] ${devMode ? 'border-2 border-gray-50' : ''}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2> */}
        
        {/* Container con backdrop blur unificado */}
        <div className="relative">
          {/* Backdrop blur layer con contenido para blur - detrás de todas las cards */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-500/20 blur-[200px]" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-20"
              >
                <NeonGradientCard 
                  className="max-w-[450px] min-h-[200px] flex items-center justify-center text-center [&>div]:!bg-[var(--background)]"
                  borderSize={3}
                  borderRadius={16}
                  neonColors={{
                    firstColor: "var(--accent)",
                    secondColor: "var(--highlight)"
                  }}
                >
                  <h3 className="pointer-events-none h-full whitespace-pre-wrap bg-gradient-to-br from-[#01f19d] from-50% to-[rgb(0,217,244)] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    {service.title}
                  </h3>
                </NeonGradientCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}