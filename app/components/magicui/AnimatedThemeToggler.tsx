import { motion } from 'framer-motion';
import { useTheme } from '../../lib/ThemeContext';

interface AnimatedThemeTogglerProps {
  className?: string;
}

export const AnimatedThemeToggler: React.FC<AnimatedThemeTogglerProps> = ({ className }) => {
  const { theme } = useTheme();

  const sunVariants = {
    dark: { scale: 0, opacity: 0, rotate: -45 },
    light: { scale: 1, opacity: 1, rotate: 0 },
  };

  const moonVariants = {
    dark: { scale: 1, opacity: 1, rotate: 0 },
    light: { scale: 0, opacity: 0, rotate: 45 },
  };

  return (
    <div className={`relative w-6 h-6 ${className}`}>
      <motion.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute w-full h-full"
        variants={sunVariants}
        animate={theme}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-14a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm0 14a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm-8-7a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm14 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2.829-5.657a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707l-1.414-1.414a.5.5 0 0 1 0-.707zm-8.486 12.728a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707l-1.414-1.414a.5.5 0 0 1 0-.707zm12.728-8.486a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-12.728 8.486a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0z" />
      </motion.svg>
      <motion.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute w-full h-full"
        variants={moonVariants}
        animate={theme}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9 9 0 0 0 20.354 15.354z" />
      </motion.svg>
    </div>
  );
};