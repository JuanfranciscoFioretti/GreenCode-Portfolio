import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';

export default function ThemeTogglerWrapper() {
  return (
    <div className="glassmorphism p-2 rounded-[12px] flex items-center justify-center">
      <AnimatedThemeToggler className="text-accent hover:text-green-400 w-6 h-6" />
    </div>
  );
}