// 'use client';

// import { useDevMode } from '../../lib/DevModeContext';
// import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
// // import { ArrowRightIcon } from "@radix-ui/react-icons";
// import { cn } from "@/lib/utils";


// export default function DevModeToggle() {
//   const { devMode, toggleDevMode } = useDevMode();

//   const handleClick = () => {
//     console.log('DevModeToggle clicked, current state:', devMode); // Debug log
//     toggleDevMode();
//   };

//   return (
//     // <button
//     //   onClick={handleClick}
//     //   className={`button-secondary ${devMode ? 'bg-accent text-primary' : 'text-accent'}`}
//     // >
//     //   {`</Dev Mode`} {devMode ? 'On' : 'Off'}{`>`}
//     // </button>


//     // <AnimatedShinyText onClick={handleClick}>{`</Dev Mode`} {devMode ? 'On' : 'Off'}{`>`}</AnimatedShinyText>

//     <div className="z-10 flex items-center justify-center">
//       <div
//         className={cn(
//           "group rounded-full border border-black/5 --background-gradient text-base text-white transition-all ease-in  hover:cursor-pointer dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
//         )}
//       >
//         <AnimatedShinyText onClick={handleClick} className="border-solid inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 ">
//           <span className='text-[--text-dark]'>✨ Try Devmode</span>
//           {/* <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /> */}
//         </AnimatedShinyText>
//       </div>
//     </div>
//   );
// }
'use client';

import { useDevMode } from '../../lib/DevModeContext';
// import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
// import { ArrowRightIcon } from "@radix-ui/react-icons";
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
