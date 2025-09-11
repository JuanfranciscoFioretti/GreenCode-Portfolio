'use client';

import { motion } from 'framer-motion';
import DevModeTooltip from '../common/DevModeTooltip';

interface AboutUsSectionProps {
  devMode: boolean;
}

export default function AboutUsSection({ devMode }: AboutUsSectionProps) {
  return (
    <section id="about" className="py-20 bg-[var(--gradient-bg)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 text-center"
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Us
        </motion.h2>
        <p className="text-lg">
            Greencode is a passionate team dedicated to delivering innovative, secure, and user-friendly digital solutions. We specialize in web and mobile app development, AI automation, Marketing campaigns and much more.
        </p>
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