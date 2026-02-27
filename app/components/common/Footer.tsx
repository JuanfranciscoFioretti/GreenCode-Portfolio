"use client";

import Image from 'next/image';
import { LOGOS } from '../../lib/constants';
import { useTheme } from '../../lib/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? '/images/logo-primary-black.webp' : LOGOS.primary;
  return (
    <footer
      className="pt-10 pb-20 bg-[var(--gradient-bg)]"
      style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Image src={logoSrc} alt="Sostentia Logo" width={120} height={40} />
        <p className="mt-4">© 2025 Sostentia. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://www.instagram.com/sostentia/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary-color)]">Instagram</a>
          <a href="https://www.linkedin.com/company/sostentia/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary-color)]">LinkedIn</a>
          <a href="https://github.com/JuanfranciscoFioretti" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary-color)]">GitHub</a>
        </div>
      </div>
    </footer>
  );
}