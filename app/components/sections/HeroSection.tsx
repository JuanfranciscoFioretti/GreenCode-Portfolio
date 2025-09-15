import { motion, useAnimationControls, Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { LOGOS } from '../../lib/constants';
import DevModeTooltip from '../common/DevModeTooltip';
// import { useDevMode } from '../../lib/DevModeContext';
import { AuroraText } from "@/components/magicui/aurora-text";


interface HeroSectionProps {
  devMode: boolean;
}

// const titleVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.05, duration: 0.5 },
//   }),
// };

const particleVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    transition: {
      duration: 3 + Math.random() * 2,
      delay: i * 0.2,
      repeat: Infinity,
      repeatType: 'loop',
    },
  }),
};

export default function HeroSection({ devMode }: HeroSectionProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const titleText = 'Greencode';
  const particles = Array.from({ length: 10 });

  return (
    <section id="hero" className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
    
  </div>
      <div className="absolute inset-0">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            initial="initial"
            animate="animate"
            custom={i}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-5xl mx-auto px-4 z-10"
      >
        <div className="mb-6">
          <Image src={LOGOS.primary} alt="Greencode Logo" width={200} height={80} priority />
        </div>
        {/* <h1 className="text-5xl md:text-[56px] gradient-text font-bold mt-4"> */}
        <h1 className="text-5xl md:text-[56px] font-bold mt-4">
          Welcome to <AuroraText> {titleText} </AuroraText>
          {/* {titleText.split('').map((char, i) => (
            <motion.span key={i} custom={i} variants={titleVariants} initial="hidden" animate={controls}>
              {char}
            </motion.span>
          ))} */}
        </h1>
        <p className="text-lg md:text-[18px] text-secondary mt-4">
          Building innovative and secure digital solutions.
        </p>
        {devMode && (
          <DevModeTooltip
            content="This Hero section uses Framer Motion for staggered text and particle animations."
            isVisible={devMode}
          />
        )}
      </motion.div>
    </section>
  );
}