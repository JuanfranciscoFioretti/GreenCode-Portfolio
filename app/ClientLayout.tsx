'use client';

import React from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { DevModeProvider } from './lib/DevModeContext';
import { ThemeProvider } from './lib/ThemeContext';
import './styles/globals.css';

function ClientContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col">
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
        <ClientContent>{children}</ClientContent>
      </DevModeProvider>
    </ThemeProvider>
  );
}
