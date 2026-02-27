'use client';

import { m } from 'framer-motion';
import DevModeTooltip from '../common/DevModeTooltip';

interface AboutUsSectionProps {
  devMode: boolean;
}

export default function AboutUsSection({ devMode }: AboutUsSectionProps) {
  return (
    <section id="about" className="w-full pt-40 pb-20 bg-[var(--gradient-bg)]">
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
          At Sostentia, we specialize in transforming ideas into powerful digital solutions. Our team combines expertise in web development, mobile applications, AI-powered automations, and digital marketing to help businesses thrive in the modern landscape. We&apos;re committed to delivering secure, scalable, and user-friendly solutions that drive real results and exceed expectations.
        </p>
      </m.div>
    </section>
  );
}