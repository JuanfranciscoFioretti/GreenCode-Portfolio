'use client';

import { useDevMode } from '../../lib/DevModeContext';
import { cn } from "@/lib/utils";


export default function DevModeToggle() {
  const { devMode, toggleDevMode } = useDevMode();

  const handleClick = () => {
    console.log('DevModeToggle clicked, current state:', devMode); // Debug log
    toggleDevMode();
  };

  return (
    <>
      <style jsx global>{`
        @keyframes shine {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }
        
        .shiny-text {
          background: linear-gradient(
            90deg,
            var(--text-dark) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            var(--text-dark) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          animation: shine 2s linear infinite;
        }
        
        .dark .shiny-text {
          background: linear-gradient(
            90deg,
            #a3a3a3 0%,
            #ffffff 50%,
            #a3a3a3 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
        }
      `}</style>
      
      <div className="z-10 flex items-center justify-center">
        <div
          onClick={handleClick}
          className={cn(
            "group rounded-full border border-[--glass-border] dark:border-neutral-700 --background-gradient text-base transition-all ease-in hover:cursor-pointer hover:shadow-lg hover:scale-105",
          )}
        >
          <span className="inline-flex items-center justify-center px-4 py-1">
            <span className='shiny-text font-medium --text-dark'>✨ Try Devmode {devMode ? 'On' : 'Off'}</span>
          </span>
        </div>
      </div>
    </>
  );
}
