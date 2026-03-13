'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import DevModeTooltip from '../common/DevModeTooltip';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { MorphingText } from '@/components/magicui/morphing-text';

interface TransitionSectionProps {
  devMode: boolean;
}

export default function TransitionSection({ devMode }: TransitionSectionProps) {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isMobile ? ['start start', 'end end'] : ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [1, 1, 1] : [0.8, 1, 1]);

  return (
    <section ref={ref} className="w-full bg-[var(--gradient-bg)]">
      <BackgroundGradientAnimation>
      <div className="absolute z-10 inset-0 flex items-center justify-center  font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <MorphingText texts={['Learn how', 'We Create', 'Your Next', 'Innovative', 'Secure', '& User-friendly', 'Digital Solution', 'Together', 'We can Achieve', 'Your Goals' ]} />
      </div>
    </BackgroundGradientAnimation>
      {!isMobile && (
        <m.div
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto px-4 text-center"
        >
          {devMode && (
            <DevModeTooltip
              content="This section uses Framer Motion's useScroll and useTransform for dynamic scroll animations."
              isVisible={devMode}
            />
          )}
        </m.div>
      )}
    </section>
  );
}