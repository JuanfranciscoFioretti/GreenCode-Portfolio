'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TECHNOLOGIES, TECHNOLOGIES2 } from '../../lib/constants';
import DevModeTooltip from '../common/DevModeTooltip';

interface TechnologiesSectionProps {
  devMode: boolean;
}

export default function TechnologiesSection({ devMode }: TechnologiesSectionProps) {
  return (
    <section id="technologies" className="w-full mt-10 bg-[var(--gradient-bg)]">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-8"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
            <div key={index} className="flex-shrink-0">
              <Image src={tech.icon} alt={tech.name} width={80} height={80} />
              {/* <p className="text-center mt-2">{tech.name}</p> */}
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex space-x-8 mt-8"
          animate={{ x: ['-100%', '0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...TECHNOLOGIES2, ...TECHNOLOGIES2, ...TECHNOLOGIES2].map((tech, index) => (
            <div key={index} className="flex-shrink-0">
              <Image src={tech.icon} alt={tech.name} width={80} height={80} />
              {/* <p className="text-center mt-2">{tech.name}</p> */}
            </div>
          ))}
        </motion.div>
      </div>
      {devMode && (
        <DevModeTooltip
          content="This section uses Framer Motion for infinite horizontal scrolling animations."
          isVisible={devMode}
        />
      )}
    </section>
  );
}