// 'use client';

// import { motion } from 'framer-motion';
// // import HeroSection from './components/sections/HeroSection';
// // import ProjectsSection from './components/sections/ProjectsSection';
// import TechnologiesSection from './components/sections/TechnologiesSection';
// import ServicesSection from './components/sections/ServicesSection';
// import TransitionSection from './components/sections/TransitionSection';
// import ContactSection from './components/sections/ContactSection';
// import FAQSection from './components/sections/FAQSection';
// import AboutUsSection from './components/sections/AboutUsSection';
// import TestimonialsSection from './components/sections/TestimonialsSection';
// import AnalyticsDashboard from './components/sections/AnalyticsDashboard';
// import { useDevMode } from './lib/DevModeContext';
// import DevModeToggle from './components/common/DevModeToggle';
// import { HeroParallaxDemo } from './components/sections/HeroParallaxDemo';

// export default function Home() {
//   const { devMode } = useDevMode();

//   return (
//     <main>
//       {/* <HeroSection devMode={devMode} /> */}
//       <HeroParallaxDemo />
//       <TechnologiesSection devMode={devMode} />
//       <TransitionSection devMode={devMode} />
//       <ServicesSection />
//       <AboutUsSection devMode={devMode} />
//       <TestimonialsSection devMode={devMode} />
//       <ContactSection devMode={devMode} />
//       {!devMode && (
//         <motion.div
//           className="text-center py-10"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <h2 className="text-[24px] gradient-text">Haven’t tried devMode yet?</h2>
//           <p className="text-secondary">Enable devMode to explore technical details!</p>
//           <div className='flex justify-center mt-4'>
//           <DevModeToggle/>

//           </div>
//         </motion.div>
//       )}
//       {devMode && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <AnalyticsDashboard />
//         </motion.div>
//       )}
//       <FAQSection devMode={devMode} />
//     </main>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import TechnologiesSection from './components/sections/TechnologiesSection';
import ServicesSection from './components/sections/ServicesSection';
// import TransitionSection from './components/sections/TransitionSection';
import ContactSection from './components/sections/ContactSection';
import FAQSection from './components/sections/FAQSection';
import AboutUsSection from './components/sections/AboutUsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import AnalyticsDashboard from './components/sections/AnalyticsDashboard';
import { useDevMode } from './lib/DevModeContext';
import DevModeToggle from './components/common/DevModeToggle';
import { HeroParallaxDemo } from './components/sections/HeroParallaxDemo';
import { RobotSection } from './components/sections/RobotSection';
// import { SparklesGradientSection } from './components/sections/SparklesGradientSection';

export default function Home() {
  const { devMode } = useDevMode();

  return (
    <main className="w-full min-h-screen">

      <div className="w-full">
        <RobotSection />
      </div>
      
      <div className="w-full">
        <HeroParallaxDemo />
      </div>
      
      <div className="w-full">
        <ServicesSection />
      </div>

      <div className="w-full">
        <TechnologiesSection devMode={devMode} />
      </div>
      
      <div className="w-full">
        <AboutUsSection devMode={devMode} />
      </div>
      
      <div className="w-full">
        <TestimonialsSection devMode={devMode} />
      </div>
      
      <div className="w-full">
        <ContactSection devMode={devMode} />
      </div>
      
      {!devMode && (
        <motion.div
          className="w-full text-center py-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[24px] gradient-text">Haven’t tried devMode yet?</h2>
          <p className="text-secondary">Enable devMode to explore technical details!</p>
          <div className='flex justify-center mt-4'>
            <DevModeToggle/>
          </div>
        </motion.div>
      )}
      
      {devMode && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnalyticsDashboard />
        </motion.div>
      )}
      
      <div className="w-full">
        <FAQSection devMode={devMode} />
      </div>
    </main>
  );
}