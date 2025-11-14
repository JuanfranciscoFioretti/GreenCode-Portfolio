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
  // Duplicate lists three times to ensure seamless infinite loop
  const listA = [...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES];
  const listB = [...TECHNOLOGIES2, ...TECHNOLOGIES2, ...TECHNOLOGIES2];

  const rowStyle: React.CSSProperties = {
    willChange: 'transform',
    transform: 'translateZ(0)', // promote to its own layer
  };

  return (
    <section id="technologies" className="w-full mt-10 bg-[var(--gradient-bg)]">
      <div className="text-center py-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ willChange: 'transform, opacity' }}
        >
          Technologies We Use
        </motion.h2>
      </div>
      <div className="relative overflow-hidden">
        {/* Primary marquee (left-to-right) */}
        <motion.div
          aria-hidden
          className="flex space-x-8"
          style={rowStyle}
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
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
          animate={{ x: ['-33.33%', '0%'] }}
          transition={{ duration: 41, repeat: Infinity, ease: 'linear' }}
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