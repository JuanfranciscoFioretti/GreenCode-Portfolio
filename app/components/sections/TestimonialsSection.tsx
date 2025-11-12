'use client';

import { motion } from 'framer-motion';
import DevModeTooltip from '../common/DevModeTooltip';
import { TESTIMONIALS } from '../../lib/constants';
import { Meteors } from '@/components/ui/meteors';

interface TestimonialsSectionProps {
  devMode: boolean;
}

export default function TestimonialsSection({ devMode }: TestimonialsSectionProps) {
  const testimonials = TESTIMONIALS.map((item) => ({
    ...item
  }));

  return (
    <section id="testimonials" className="w-full py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="w-full flex justify-between items-center xl:flex-row flex-col mb-20 gap-8 xl:gap-0">
          <motion.h2
            className="text-6xl md:text-6xl font-bold text-foreground text-center lg:text-left"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            What people are <br className="sm:block hidden" /> saying about us
          </motion.h2>
          <motion.div
            className="w-full lg:mt-0 lg:max-w-[450px] text-center lg:text-left"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl text-foreground">
              Everything you need to achieve your business goals and maximize growth all in one place.
            </p>
          </motion.div>
        </div>

        {/* Grid responsivo: 3 en línea en lg+, 1 columna en pantallas menores */}
        <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-8 gap-8 items-center">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative w-full max-w-[400px] lg:max-w-[320px]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut", 
                delay: index * 0.15 
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Card container con overflow-hidden para Meteors */}
              <motion.div 
                className="relative h-[220px] lg:h-[200px] overflow-hidden rounded-2xl border border-[var(--glass-border)] --background-gradient backdrop-blur-sm p-6 group cursor-pointer transition-all duration-500 shadow-lg hover:scale-105 hover:shadow-xl"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                
                {/* Efecto hover con gradiente */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 via-purple-500/10 to-[var(--highlight)]/20 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={devMode ? { background: '#20c0705b' } : {}}
                />
                
                {/* Meteors effect - CLAVE: debe estar dentro del contenedor con overflow-hidden */}
                <Meteors number={12} />
                
                {/* Contenido de la card */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex-1">
                    <motion.p 
                      className="text-sm lg:text-[13px] leading-relaxed text-foreground/90 mb-4 line-clamp-3 group-hover:text-[var(--primary)] transition-colors duration-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {testimonial.text}
                    </motion.p>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <motion.img
                      src={testimonial.url}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--glass-border)] group-hover:ring-[var(--accent)]/50 transition-all duration-500"
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    />
                    <div className="ml-3">
                      <motion.h4 
                        className="text-sm font-semibold text-foreground"
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {testimonial.name}
                      </motion.h4>
                      <motion.p 
                        className="text-xs text-[var(--text-light)]"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        {testimonial.title}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {devMode && (
        <DevModeTooltip
          content="Testimonials simplificados con efecto Meteors funcional, altura reducida (200px en lg), glassmorphism sutil, y animaciones optimizadas. Los meteors requieren overflow-hidden en el contenedor padre."
          isVisible={devMode}
        />
      )}
    </section>
  );
}