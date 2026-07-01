'use client';

import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export default function CursorToggle() {
  const { isEnabled, toggleCursor } = useCursor();

  console.log('CursorToggle rendered, isEnabled:', isEnabled);

  return (
    <motion.button
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 5.5, duration: 0.5 }}
      onClick={toggleCursor}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      title={isEnabled ? "Disable Fluid Cursor" : "Enable Fluid Cursor"}
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
        <span className="text-sm font-medium text-muted-foreground">
          Fluid Cursor
        </span>
      </div>
      <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${isEnabled ? 'bg-primary' : 'bg-gray-600'} relative`}>
        <motion.div
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
          animate={{ left: isEnabled ? '20px' : '4px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </motion.button>
  );
}
