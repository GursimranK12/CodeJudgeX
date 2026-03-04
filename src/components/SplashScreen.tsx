import React from 'react';
import { motion } from 'motion/react';
import { Code2, Zap, Cpu, Sparkles, Brain } from 'lucide-react';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <motion.div 
            className="p-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] shadow-[0_0_60px_rgba(249,115,22,0.3)] mb-6 relative overflow-hidden"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 size={80} className="text-white relative z-10" />
            <motion.div 
              className="absolute inset-0 bg-white/20"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          
          <div className="text-center">
            <motion.h1 
              className="text-8xl font-black tracking-tighter text-white flex items-center gap-3"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "backOut" }}
            >
              CODEJUDGE <span className="text-orange-500">X</span>
            </motion.h1>
            <motion.div
              className="flex items-center justify-center gap-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="h-px w-12 bg-gray-800" />
              <p className="text-gray-500 font-mono text-sm tracking-[0.6em] uppercase">
                Interactive Engine
              </p>
              <div className="h-px w-12 bg-gray-800" />
            </motion.div>
          </div>
        </motion.div>
        
        <div className="w-80 h-2 bg-gray-900 rounded-full overflow-hidden relative shadow-inner">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 2.5, ease: "circInOut" }}
          />
        </div>
        
        <div className="mt-12 flex gap-12">
          {[Zap, Cpu, Sparkles, Brain].map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + (i * 0.15), type: "spring" }}
              className="p-3 bg-white/5 rounded-2xl border border-white/5"
            >
              <Icon size={24} className="text-gray-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
