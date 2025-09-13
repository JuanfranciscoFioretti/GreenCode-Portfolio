import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeTogglerWrapper from './ThemeTogglerWrapper';
import { LOGOS } from '../../lib/constants';
import DevModeToggle from './DevModeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full glassmorphism z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Image src={LOGOS.primary} alt="Greencode Logo" width={120} height={40} priority />
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#hero" className="text-primary hover:text-accent text-[16px]">Home</a>
            <a href="#projects" className="text-primary hover:text-accent text-[16px]">Projects</a>
            <a href="#services" className="text-primary hover:text-accent text-[16px]">Services</a>
            <a href="#about" className="text-primary hover:text-accent text-[16px]">About</a>
            <a href="#contact" className="text-primary hover:text-accent text-[16px]">Contact</a>
            <ThemeTogglerWrapper />
            <DevModeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="md:hidden glassmorphism"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#hero" className="block text-primary hover:text-accent text-[16px]" onClick={toggleMenu}>Home</a>
            <a href="#projects" className="block text-primary hover:text-accent text-[16px]" onClick={toggleMenu}>Projects</a>
            <a href="#services" className="block text-primary hover:text-accent text-[16px]" onClick={toggleMenu}>Services</a>
            <a href="#about" className="block text-primary hover:text-accent text-[16px]" onClick={toggleMenu}>About</a>
            <a href="#contact" className="block text-primary hover:text-accent text-[16px]" onClick={toggleMenu}>Contact</a>
            <ThemeTogglerWrapper />
            <DevModeToggle />
          </div>
        </motion.div>
      )}
    </nav>
  );
}