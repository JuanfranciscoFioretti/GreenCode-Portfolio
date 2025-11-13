'use client';

import { motion } from 'framer-motion';
import DevModeTooltip from '../common/DevModeTooltip';

interface AboutUsSectionProps {
  devMode: boolean;
}

export default function AboutUsSection({ devMode }: AboutUsSectionProps) {
  return (
    <section id="about" className="w-full py-20 bg-[var(--gradient-bg)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 text-center"
      >
        {devMode && (
          <DevModeTooltip
            content="This section uses server-side rendering for SEO and Framer Motion for scroll animations."
            isVisible={devMode}
          />
        )}
      </motion.div>
    </section>
  );
}