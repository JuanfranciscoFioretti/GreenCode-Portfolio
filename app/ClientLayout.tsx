'use client';

import React from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { DevModeProvider } from './lib/DevModeContext';
import { ThemeProvider } from './lib/ThemeContext';
import './styles/globals.css';

function ClientContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col">
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
        <MotionConfig reducedMotion="user">
          <ClientContent>{children}</ClientContent>
        </MotionConfig>
      </DevModeProvider>
    </ThemeProvider>
  );
}
