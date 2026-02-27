'use client';

import React from 'react';
import { MotionConfig, LazyMotion } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { DevModeProvider } from './lib/DevModeContext';
import { ThemeProvider } from './lib/ThemeContext';
import './styles/globals.css';

const loadFeatures = () => import('framer-motion').then((m) => m.domAnimation);

function ClientContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[var(--gradient-bg)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-[hsl(var(--background))] focus:text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] rounded"
      >
        Skip to main content
      </a>
      <Navbar />
      <div className="flex-1 w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DevModeProvider>
        <MotionConfig
          reducedMotion="user"
          transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.6 }}
        >
          <LazyMotion features={loadFeatures}>
            <ClientContent>{children}</ClientContent>
          </LazyMotion>
        </MotionConfig>
      </DevModeProvider>
    </ThemeProvider>
  );
}
