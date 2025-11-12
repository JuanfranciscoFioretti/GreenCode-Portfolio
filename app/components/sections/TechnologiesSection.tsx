"use client";

import React, { memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TECHNOLOGIES, TECHNOLOGIES2 } from '../../lib/constants';
import DevModeTooltip from '../common/DevModeTooltip';

interface TechnologiesSectionProps {
  devMode: boolean;
}

function TechnologiesSection({ devMode }: TechnologiesSectionProps) {
  // Duplicate lists only twice to reduce DOM nodes and still achieve a seamless loop
  const listA = [...TECHNOLOGIES, ...TECHNOLOGIES];
  const listB = [...TECHNOLOGIES2, ...TECHNOLOGIES2];

  const rowStyle: React.CSSProperties = {
    willChange: 'transform',
    transform: 'translateZ(0)', // promote to its own layer
  };

  return (
    <section id="technologies" className="w-full mt-10 bg-[var(--gradient-bg)]">
      <div className="text-center py-10">
        <h2 className="text-4xl md:text-5xl font-bold text-primary">Technologies We Use</h2>
      </div>
      <div className="relative overflow-hidden">
        {/* Primary marquee (left-to-right) */}
        <motion.div
          aria-hidden
          className="flex space-x-8"
          style={rowStyle}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {listA.map((tech, index) => (
            <div key={`a-${index}`} className="flex-shrink-0 flex items-center justify-center p-2">
              <Image src={tech.icon} alt={tech.name} width={72} height={72} loading="lazy" />
            </div>
          ))}
        </motion.div>

        {/* Secondary marquee (right-to-left) */}
        <motion.div
          aria-hidden
          className="flex space-x-8 mt-8"
          style={rowStyle}
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {listB.map((tech, index) => (
            <div key={`b-${index}`} className="flex-shrink-0 flex items-center justify-center p-2">
              <Image src={tech.icon} alt={tech.name} width={72} height={72} loading="lazy" />
            </div>
          ))}
        </motion.div>
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

export default memo(TechnologiesSection);