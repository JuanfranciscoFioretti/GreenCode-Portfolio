'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TECHNOLOGIES } from '../../lib/constants';
import DevModeTooltip from '../common/DevModeTooltip';

interface TechnologiesSectionProps {
  devMode: boolean;
}

export default function TechnologiesSection({ devMode }: TechnologiesSectionProps) {
  return (
    <section id="technologies" className="py-20 bg-[var(--gradient-bg)]">
<motion.h2
          className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Technologies We Use
        </motion.h2>      <div className="relative overflow-hidden">
        <motion.div
          className="flex space-x-8"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
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
          {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
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