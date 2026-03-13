"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { TECHNOLOGIES, TECHNOLOGIES2 } from '../../lib/constants';
import DevModeTooltip from '../common/DevModeTooltip';

interface TechnologiesSectionProps {
  devMode: boolean;
}

export default function TechnologiesSection({ devMode }: TechnologiesSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Duplicate lists three times to ensure seamless infinite loop
  const listA = useMemo(() => [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES], []);
  const listB = useMemo(() => [...TECHNOLOGIES2, ...TECHNOLOGIES2, ...TECHNOLOGIES2], []);

  const rowStyle: React.CSSProperties = {
    willChange: 'transform',
    transform: 'translateZ(0)', // promote to its own layer
  };

  // Adaptive animation duration based on device
  const durationA = isMobile ? 20 : 36;
  const durationB = isMobile ? 24 : 41;

  return (
    <section id="technologies" className="w-full mt-10 bg-[var(--gradient-bg)]">
      <div className="relative overflow-hidden">
        {/* Primary marquee (left-to-right) */}
        <m.div
          aria-hidden
          className="flex space-x-8"
          style={rowStyle}
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ duration: durationA, repeat: Infinity, ease: 'linear' }}
        >
          {listA.map((tech, index) => (
            <div key={`a-${index}`} className="flex-shrink-0 flex items-center justify-center p-2">
              <Image src={tech.icon} alt={tech.name} width={72} height={72} loading="lazy" />
            </div>
          ))}
        </m.div>

        {/* Secondary marquee (right-to-left) */}
        <m.div
          aria-hidden
          className="flex space-x-8 mt-8"
          style={rowStyle}
          animate={{ x: ['-33.33%', '0%'] }}
          transition={{ duration: durationB, repeat: Infinity, ease: 'linear' }}
        >
          {listB.map((tech, index) => (
            <div key={`b-${index}`} className="flex-shrink-0 flex items-center justify-center p-2">
              <Image src={tech.icon} alt={tech.name} width={72} height={72} loading="lazy" />
            </div>
          ))}
        </m.div>
      </div>

      {devMode && (
        <DevModeTooltip
          content="This section uses a lightweight marquee implemented with Framer Motion and GPU-accelerated transforms."
          isVisible={devMode}
        />
      )}
    </section>
  );
}