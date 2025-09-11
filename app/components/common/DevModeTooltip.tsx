import { motion } from 'framer-motion';

interface DevModeTooltipProps {
  content: string;
  isVisible: boolean;
}

export default function DevModeTooltip({ content, isVisible }: DevModeTooltipProps) {
  if (!isVisible) {
    console.log('DevModeTooltip hidden:', content); // Debug log
    return null;
  }

  console.log('DevModeTooltip rendered:', content); // Debug log
  return (
    <motion.div
      className="glassmorphism p-4 rounded-[12px] absolute z-50 max-w-xs bg-[#1B1F29] text-primary shadow-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm">{content}</p>
    </motion.div>
  );
}
