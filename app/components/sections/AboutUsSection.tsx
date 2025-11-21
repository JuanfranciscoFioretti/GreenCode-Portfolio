'use client';

import { m } from 'framer-motion';
import DevModeTooltip from '../common/DevModeTooltip';

interface AboutUsSectionProps {
  devMode: boolean;
}

export default function AboutUsSection({ devMode }: AboutUsSectionProps) {
  return (
    <section id="about" className="w-full py-20 bg-[var(--gradient-bg)]">
      <m.div
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
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">About Us</h2>
        <p className="text-lg text-secondary max-w-3xl mx-auto">
          We are a team of passionate developers and designers dedicated to creating innovative digital solutions.
        </p>
      </m.div>
    </section>
  );
}