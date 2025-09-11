'use client';

import { motion } from 'framer-motion';
import DevModeTooltip from '../common/DevModeTooltip';
import { TESTIMONIALS } from '../../lib/constants';

interface TestimonialsSectionProps {
  devMode: boolean;
}

export default function TestimonialsSection({ devMode }: TestimonialsSectionProps) {
  const testimonials = TESTIMONIALS.map((item) => ({
    ...item,
    title: `CEO, Company ${item.name.split(' ')[0]}`,
  }));

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Esfera de fondo mejorada con gradiente verdoso-violeta */}
      <div className="absolute z-0 w-[80%] h-[80%] -right-[40%] top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--accent)]/30 via-purple-500/20 to-[var(--highlight)]/25 filter blur-[80px] animate-pulse" />
      
      {/* Esfera secundaria para más profundidad */}
      <div className="absolute z-0 w-[60%] h-[60%] -right-[30%] top-1/3 rounded-full bg-gradient-to-tl from-violet-400/20 to-cyan-400/15 filter blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="w-full flex justify-between items-center md:flex-row flex-col mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-foreground text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What people are <br className="sm:block hidden" /> saying about us
          </motion.h2>
          <motion.div
            className="w-full md:mt-0 mt-6 md:max-w-[450px] text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-foreground">
              Everything you need to accept card payments and grow your business anywhere on the planet
            </p>
          </motion.div>
        </div>
          {/* Grid responsive mejorado */}
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 place-items-center">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glassmorphism p-8 rounded-2xl w-full max-w-[380px] min-h-[280px] border border-[var(--glass-border)] relative group cursor-pointer transform-gpu transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-50/10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Efecto hover mejorado con gradiente neon */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-purple-500/10 to-[var(--highlight)]/20 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={devMode ? { background: '#20c0705b' } : {}}
                />
                
                {/* Borde neon sutil en hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent)]/50 to-[var(--highlight)]/50 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <motion.img
                      src="/images/testimonials/quotes.svg"
                      alt="quotes"
                      className="w-[42px] h-[27px] object-contain mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    />
                    <p className="font-poppins font-normal text-[16px] leading-[28px] text-foreground mb-8 line-clamp-4 group-hover:text-[var(--primary)] transition-colors duration-300">
                      {testimonial.text}
                    </p>
                  </div>
                  
                  <div className="flex flex-row items-center">
                    <motion.img
                      src={testimonial.url}
                      alt={testimonial.name}
                      className="w-[50px] h-[50px] rounded-full object-cover ring-2 ring-[var(--glass-border)] group-hover:ring-[var(--accent)]/50 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="flex flex-col ml-4">
                      <h4 className="font-poppins font-semibold text-[18px] leading-[28px] text-foreground transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="font-poppins font-normal text-[14px] leading-[22px] text-[var(--text-light)] transition-colors duration-300">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      {devMode && (
        <DevModeTooltip
          content="Testimonials use glassmorphism styling, Framer Motion animations, gradient neon background spheres, responsive grid layout, and enhanced hover effects with neon accents."
          isVisible={devMode}
        />
      )}
    </section>
  );
}