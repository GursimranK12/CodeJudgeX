import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export const InteractiveLogo = ({ size = 18, className = "" }: { size?: number, className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={cn("flex items-center gap-2 cursor-pointer group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl relative overflow-hidden shadow-lg shadow-orange-500/20"
        animate={{ 
          rotate: isHovered ? [0, -15, 15, 0] : 0,
          boxShadow: isHovered ? "0 0 30px rgba(249,115,22,0.6)" : "0 0 10px rgba(249,115,22,0.2)"
        }}
        transition={{ duration: 0.6, ease: "backOut" }}
      >
        <Code2 size={size} className="text-white relative z-10" />
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-1 -left-1 text-white/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Sparkles size={12} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="flex flex-col">
        <span className="font-black text-base tracking-tighter leading-none flex items-center gap-1 text-white">
          CODEJUDGE 
          <motion.span 
            className="text-orange-500"
            animate={{ 
              scale: isHovered ? [1, 1.3, 1] : 1,
              textShadow: isHovered ? "0 0 15px rgba(249,115,22,0.8)" : "none"
            }}
          >
            X
          </motion.span>
        </span>
        <motion.span 
          className="text-[9px] font-black text-orange-500/60 tracking-[0.3em] uppercase"
          animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 2 : 0 }}
        >
          Interactive Engine
        </motion.span>
      </div>
    </motion.div>
  );
};
