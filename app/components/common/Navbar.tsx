// import Image from 'next/image';
import { useEffect, useMemo, useRef, useState, useCallback, memo } from 'react';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThemeTogglerWrapper from './ThemeTogglerWrapper';
// import { LOGOS } from '../../lib/constants';
// import DevModeToggle from './DevModeToggle';

interface MenuItem { id: string; label: string }
interface MenuAnimationProps { menuItems: MenuItem[]; onSelect: (id: string) => void }

const MenuAnimation = memo(function MenuAnimation({ menuItems, onSelect }: MenuAnimationProps) {
  return (
    <ul className="flex min-w-fit flex-col gap-8 overflow-hidden" role="menu" aria-label="Primary">
      {menuItems.map((item) => (
        <li key={item.id} role="none">
          <button
            type="button"
            role="menuitem"
            onClick={() => onSelect(item.id)}
            className="group flex items-center gap-4"
          >
            <ArrowRight className="size-10 -translate-x-full text-primary opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
            <span className="z-10 -translate-x-12 font-mono font-semibold text-primary transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:text-accent text-6xl">
              {item.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
});

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const menuItems = useMemo<MenuItem[]>(() => ([
    { id: 'services', label: 'Services' },
    { id: 'sostentia-desk', label: 'Product' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' },
  ]), []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      html.classList.add('overflow-hidden');
      body.classList.add('overflow-hidden');
    } else {
      html.classList.remove('overflow-hidden');
      body.classList.remove('overflow-hidden');
    }

    return () => {
      html.classList.remove('overflow-hidden');
      body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Highlight current section in navbar with debounced updates
  useEffect(() => {
    const sections = menuItems.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Debounce the state update to prevent excessive re-renders
        if (debounceRef.current) clearTimeout(debounceRef.current);
        
        debounceRef.current = setTimeout(() => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => (b.intersectionRatio - a.intersectionRatio))[0];
          if (visible && visible.target.id !== currentSection) {
            setCurrentSection(visible.target.id);
          }
        }, 50);
      },
      {
        root: null,
        threshold: [0.4, 0.6, 0.8],
        rootMargin: '-64px 0px -55% 0px',
      }
    );

    sections.forEach((sec) => observerRef.current?.observe(sec));
    
    return () => {
      observerRef.current?.disconnect();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [menuItems, currentSection]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleMenuItemClick = useCallback((id: string) => {
    const section = `#${id}`;
    const element = document.querySelector(section);
    setIsOpen(false);
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 mt-0.5 w-full z-50 ${isOpen ? 'bg-transparent backdrop-blur-[12px]' : 'glassmorphism'}`}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          ...(isOpen ? { border: 'none', borderRadius: '0', boxShadow: 'none' } : {}),
        }}
        role="navigation"
        aria-label="Primary"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* <Image src={LOGOS.primary} alt="Sostentia Logo" width={70} height={40} priority /> */}
              {/* <div className="w-40 h-20 bg-no-repeat bg-contain" style={{ backgroundImage: 'var(--primary-logo)' }}/> */}
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#services" aria-current={currentSection === 'services' ? 'true' : undefined} className="text-primary hover:text-accent text-[16px]">Services</a>
              <a href="#sostentia-desk" aria-current={currentSection === 'sostentia-desk' ? 'true' : undefined} className="text-primary hover:text-accent text-[16px]">Product</a>
              <a href="#contact" aria-current={currentSection === 'contact' ? 'true' : undefined} className="text-primary hover:text-accent text-[16px]">Contact</a>
              <a href="#faq" aria-current={currentSection === 'faq' ? 'true' : undefined} className="text-primary hover:text-accent text-[16px]">FAQ</a>
              <ThemeTogglerWrapper />
              {/* <DevModeToggle /> */}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="z-50 relative"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <svg className="w-6 h-6 text-primary mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
                <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
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
        <m.div
          className="fixed top-0 left-0 w-full h-[100svh] glassmorphism z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            border: 'none',
            borderRadius: '0',
            paddingBottom: 'env(safe-area-inset-bottom)'
          }}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          {/* Spacer for navbar height */}
          <div className="h-16"></div>
          
          {/* Menu items centered and aligned */}
          <div className="flex justify-center items-center h-[calc(100svh-12rem)]">
            <MenuAnimation menuItems={menuItems} onSelect={handleMenuItemClick} />
          </div>
          
          {/* Bottom section with toggles side by side */}
          <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-6">
              <ThemeTogglerWrapper />
              {/* <DevModeToggle /> */}
            </div>
          </div>
        </m.div>
      )}
    </>
  );
}