'use client'

import { motion } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { GridBeams } from "@/components/ui/grid-beams";

 
export function RobotSection() {
  return (
    <section className="w-full h-screen relative overflow-hidden border-0">
      <GridBeams>
        {/* Robot container - Always on the right, larger to prevent clipping */}
        <div className="absolute right-0 top-0 w-full lg:w-3/5 xl:w-2/3 h-full z-10">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        
        {/* Text container - Responsive positioning with pointer-events control */}
        <div className="relative z-20 h-full pointer-events-none">
        <div className="flex flex-col justify-end pb-20 lg:justify-center h-full p-6 md:p-8 lg:p-12">
          <div className="max-w-lg lg:max-w-2xl pointer-events-auto">
            <motion.h1 
              className="text-5xl md:text-5xl lg:text-6xl font-bold text-[color:var(--text-dark)] opacity-90"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.2 
              }}
            >
                Innovate, Transform<br /> & Succeed Digitally
            </motion.h1>
            <motion.p 
              className="max-w-2xl text-lg md:text-2xl mt-8 text-[color:var(--text-dark)] opacity-85"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: 0.6 
              }}
            >
                In Sostentia we transform ideas into reality with custom web, mobile, and automation solutions, delivering innovative technology to power your business forward.
            </motion.p>
          </div>
        </div>          {/* Bottom gradient effects */}
          <div className="w-full h-40 relative">
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[3px] w-3/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-3/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-3/4" />
          </div>
        </div>
      </GridBeams>
    </section>
  )
}