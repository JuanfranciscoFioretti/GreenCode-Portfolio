'use client';

import { motion } from 'framer-motion';
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import TechnologiesSection from './components/sections/TechnologiesSection';
import ServicesSection from './components/sections/ServicesSection';
import TransitionSection from './components/sections/TransitionSection';
import ContactSection from './components/sections/ContactSection';
import FAQSection from './components/sections/FAQSection';
import AboutUsSection from './components/sections/AboutUsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import AnalyticsDashboard from './components/sections/AnalyticsDashboard';
import { useDevMode } from './lib/DevModeContext';

export default function Home() {
  const { devMode } = useDevMode();

  return (
    <main>
      <HeroSection devMode={devMode} />
      <ProjectsSection devMode={devMode} />
      <TechnologiesSection devMode={devMode} />
      <ServicesSection devMode={devMode} />
      <AboutUsSection devMode={devMode} />
      <TestimonialsSection devMode={devMode} />
      {/* <TransitionSection devMode={devMode} /> */}
      <ContactSection devMode={devMode} />
      {!devMode && (
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[24px] gradient-text">Haven’t tried devMode yet?</h2>
          <p className="text-secondary">Enable devMode in the menu to explore technical details!</p>
        </motion.div>
      )}
      {devMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnalyticsDashboard />
        </motion.div>
      )}
      <FAQSection devMode={devMode} />
    </main>
  );
}