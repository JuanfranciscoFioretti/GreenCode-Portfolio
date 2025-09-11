import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import { useTheme } from '../../lib/ThemeContext';

export default function ThemeTogglerWrapper() {
  const { theme, toggleTheme } = useTheme();
  const controls = useAnimationControls();

  const handleToggle = async () => {
    await controls.start({
      opacity: [1, 0.8, 1],
      scale: [1, 1.1, 1],
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    });
    toggleTheme();
  };

  useEffect(() => {
    console.log('ThemeTogglerWrapper theme:', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <motion.div
      onClick={handleToggle}
      className="glassmorphism p-2 rounded-[12px] flex items-center justify-center cursor-pointer"
      animate={controls}
    >
      <AnimatedThemeToggler className="text-accent hover:text-highlight w-6 h-6" />
    </motion.div>
  );
}