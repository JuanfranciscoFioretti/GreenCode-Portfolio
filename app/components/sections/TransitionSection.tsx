'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import DevModeTooltip from '../common/DevModeTooltip';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { MorphingText } from '@/components/magicui/morphing-text';

interface TransitionSectionProps {
  devMode: boolean;
}

export default function TransitionSection({ devMode }: TransitionSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);

  return (
    <section ref={ref} className="w-full bg-[var(--gradient-bg)]">
      <BackgroundGradientAnimation>
      <div className="absolute z-10 inset-0 flex items-center justify-center  font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        {/* <h2 className="bg-clip-text drop-shadow-2xl bg-gradient-to-b --text-dark">
          Explore Greencode
        </h2> */}
        <MorphingText texts={['Find Out', 'What is', 'Greenrcode', 'Your Next', 'Innovative', 'Secure', '& User-friendly', 'Digital Solution', 'Together', 'We can Achieve', 'Your Business', 'Success' ]} />
      </div>
    </BackgroundGradientAnimation>
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 text-center"
      >
        
{/* <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Journey
        </motion.h2>        <p className="text-lg">
          From vision to victory, we transform ideas into reality with cutting-edge technology.
        </p> */}
        {devMode && (
          <DevModeTooltip
            content="This section uses Framer Motion’s useScroll and useTransform for dynamic scroll animations."
            isVisible={devMode}
          />
        )}
      </motion.div>
    </section>
  );
}