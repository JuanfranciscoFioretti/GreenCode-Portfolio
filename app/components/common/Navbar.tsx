import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThemeTogglerWrapper from './ThemeTogglerWrapper';
import { LOGOS } from '../../lib/constants';
import DevModeToggle from './DevModeToggle';

interface MenuAnimationProps {
  menuItems: string[];
}

function MenuAnimation({ menuItems }: MenuAnimationProps) {
  return (
    <div className="flex min-w-fit flex-col gap-8 overflow-hidden">
      {menuItems.map((item, index) => (
        <div key={index} className="group flex items-center gap-4">
          <ArrowRight className="size-10 -translate-x-full text-primary opacity-0 transition-all duration-300 ease-out hover:z-20 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
          <h1 className="z-10 -translate-x-12 cursor-pointer font-mono font-semibold text-primary transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:text-accent text-6xl">
            {item}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = ['Services', 'Contact', 'FAQ'];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (item: string) => {
    const section = `#${item.toLowerCase()}`;
    const element = document.querySelector(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 mt-0.5 w-full z-50 ${isOpen ? 'bg-transparent backdrop-blur-[12px]' : 'glassmorphism'}`} style={isOpen ? { border: 'none', borderRadius: '0', boxShadow: 'none' } : {}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Image src={LOGOS.primary} alt="Greencode Logo" width={120} height={40} priority />
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#services" className="text-primary hover:text-accent text-[16px]">Services</a>
              <a href="#contact" className="text-primary hover:text-accent text-[16px]">Contact</a>
              <a href="#faq" className="text-primary hover:text-accent text-[16px]">FAQ</a>
              <ThemeTogglerWrapper />
              <DevModeToggle />
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="focus:outline-none z-50 relative">
                <svg className="w-6 h-6 text-primary mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
              <div className={isOpen ? 'hidden' : 'relative'}>

              <ThemeTogglerWrapper />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-screen glassmorphism z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            border: 'none',
            borderRadius: '0'
          }}
        >
          {/* Spacer for navbar height */}
          <div className="h-16"></div>
          
          {/* Menu items centered and aligned */}
          <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
            <div onClick={() => handleMenuItemClick('services')}>
              <MenuAnimation menuItems={menuItems} />
            </div>
          </div>
          
          {/* Bottom section with toggles side by side */}
          <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-6">
              <ThemeTogglerWrapper />
              <DevModeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}