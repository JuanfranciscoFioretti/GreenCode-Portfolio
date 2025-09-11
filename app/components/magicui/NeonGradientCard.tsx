// import { motion } from 'framer-motion';
// import { useTheme } from '../../lib/ThemeContext';

// interface NeonGradientCardProps {
//   title: string;
//   className?: string;
// }

// export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({ title, className = '' }) => {
//   const { theme } = useTheme();

//   return (
//     <motion.div
//       className={`relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-20 max-w-sm mx-auto ${className}`}
//       style={{
//         background: theme === 'light' ? '#f9fafb' : '#0F1117',
//       }}
//       whileHover={{ scale: 1.02 }}
//       transition={{ duration: 0.3 }}
//     >
//       <svg
//         viewBox="0 0 1024 1024"
//         className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
//         aria-hidden="true"
//       >
//         <circle cx={512} cy={512} r={512} fill="url(#neon-gradient)" fillOpacity="0.7" />
//         <defs>
//           <radialGradient id="neon-gradient">
//             <stop offset="0%" stopColor="#33BBCF" />
//             <stop offset="100%" stopColor="transparent" />
//           </radialGradient>
//         </defs>
//       </svg>
//       <div className="card-content">
//         <h3 className="card-title gradient-text">{title}</h3>
//       </div>
//     </motion.div>
//   );
// };