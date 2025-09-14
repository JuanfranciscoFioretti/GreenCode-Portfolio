import Image from 'next/image';
import { LOGOS } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="py-10 bg-[var(--gradient-bg)]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Image src={LOGOS.primary} alt="Greencode Logo" width={120} height={40} />
        <p className="mt-4">© 2025 Greencode. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary-color)]">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary-color)]">LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--tertiary-color)]">GitHub</a>
        </div>
      </div>
    </footer>
  );
}