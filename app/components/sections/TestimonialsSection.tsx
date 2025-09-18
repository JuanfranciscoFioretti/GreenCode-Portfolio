// 'use client';

// import { motion } from 'framer-motion';
// import DevModeTooltip from '../common/DevModeTooltip';
// import { TESTIMONIALS } from '../../lib/constants';

// interface TestimonialsSectionProps {
//   devMode: boolean;
// }

// export default function TestimonialsSection({ devMode }: TestimonialsSectionProps) {
//   const testimonials = TESTIMONIALS.map((item) => ({
//     ...item
//   }));

//   return (
//     <section id="testimonials" className="w-full py-10 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
//         <div className="w-full flex justify-between items-center xl:flex-row flex-col mb-20 gap-8 xl:gap-0">
//           <motion.h2
//             className="text-6xl md:text-6xl font-bold text-foreground text-center lg:text-left"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             What people are <br className="sm:block hidden" /> saying about us
//           </motion.h2>
//           <motion.div
//             className="w-full lg:mt-0 lg:max-w-[450px] text-center lg:text-left"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             <p className="text-2xl text-foreground">
//               Everything you need to achieve your business goals and maximize growth all in one place.
//             </p>
//           </motion.div>
//         </div>

//         {/* Grid responsivo personalizado: 3 en línea en lg+, 1 columna en pantallas menores a 1024px */}
//         <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-8 gap-14 items-center">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               className="glassmorphism p-12 lg:p-8 rounded-2xl w-full max-w-[500px] lg:max-w-[350px] lg:min-h-[280px] min-h-[300px] border border-[var(--glass-border)] relative group cursor-pointer transform-gpu transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gray-50/10"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               viewport={{ once: true }}
//             >
//               {/* Efecto hover mejorado con gradiente neon */}
//               <motion.div
//                 className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 via-purple-500/10 to-[var(--highlight)]/20 opacity-0 group-hover:opacity-100 transition-all duration-500"
//                 style={devMode ? { background: '#20c0705b' } : {}}
//               />
              
//               {/* Borde neon sutil en hover */}
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent)]/50 to-[var(--highlight)]/50 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500" />
              
//               <div className="relative z-10 h-full flex flex-col justify-between">
//                 <div>
//                   {/* <motion.img
//                     src="/images/testimonials/quotes.svg"
//                     alt="quotes"
//                     className="w-[42px] h-[27px] object-contain mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                   /> */}
//                   <p className="font-poppins font-normal text-[16px] lg:text-[15px] leading-[28px] lg:leading-[26px] text-foreground mb-8 line-clamp-4 group-hover:text-[var(--primary)] transition-colors duration-300">
//                     {testimonial.text}
//                   </p>
//                 </div>
                
//                 <div className="flex flex-row items-center">
//                   <motion.img
//                     src={testimonial.url}
//                     alt={testimonial.name}
//                     className="w-[50px] h-[50px] rounded-full object-cover ring-2 ring-[var(--glass-border)] group-hover:ring-[var(--accent)]/50 transition-all duration-500"
//                     whileHover={{ scale: 1.2 }}
//                   />
//                   <div className="flex flex-col ml-4">
//                     <h4 className="font-poppins font-semibold text-[18px] leading-[28px] text-foreground transition-colors duration-300">
//                       {testimonial.name}
//                     </h4>
//                     <p className="font-poppins font-normal text-[14px] leading-[22px] text-[var(--text-light)] transition-colors duration-300">
//                       {testimonial.title}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
      
//       {devMode && (
//         <DevModeTooltip
//           content="Testimonials use glassmorphism styling, Framer Motion animations, gradient neon background spheres, responsive layout with single column below 1024px, and enhanced hover effects with neon accents."
//           isVisible={devMode}
//         />
//       )}
//     </section>
//   );
// }

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
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What people are <br className="sm:block hidden" /> saying about us
          </motion.h2>
          <motion.div
            className="w-full lg:mt-0 lg:max-w-[450px] text-center lg:text-left"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Card container con overflow-hidden para Meteors */}
              <div className="relative h-[220px] lg:h-[200px] overflow-hidden rounded-2xl border border-[var(--glass-border)] --background-gradient backdrop-blur-sm p-6 group cursor-pointer transition-all duration-500 shadow-lg hover:scale-105 hover:shadow-xl">
                
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
                    <p className="text-sm lg:text-[13px] leading-relaxed text-foreground/90 mb-4 line-clamp-3 group-hover:text-[var(--primary)] transition-colors duration-300">
                      {testimonial.text}
                    </p>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <motion.img
                      src={testimonial.url}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--glass-border)] group-hover:ring-[var(--accent)]/50 transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-[var(--text-light)]">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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