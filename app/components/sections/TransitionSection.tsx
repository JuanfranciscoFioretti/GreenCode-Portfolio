'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import DevModeTooltip from '../common/DevModeTooltip';

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
    <section ref={ref} className="py-20 bg-[var(--gradient-bg)]">
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 text-center"
      >
<motion.h2
          className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Journey
        </motion.h2>        <p className="text-lg">
          From vision to victory, we transform ideas into reality with cutting-edge technology.
        </p>
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