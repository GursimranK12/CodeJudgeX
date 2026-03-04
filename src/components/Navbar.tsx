import React from 'react';
import { motion } from 'motion/react';
import { InteractiveLogo } from './InteractiveLogo';

export const Navbar = ({ onHome }: { onHome: () => void }) => {
  return (
    <nav className="h-16 border-b border-[#303030] bg-[#1a1a1a]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-12">
        <div onClick={onHome}>
          <InteractiveLogo size={24} />
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-black uppercase tracking-widest text-gray-500">
          <span className="hover:text-white cursor-pointer transition-all hover:scale-105" onClick={onHome}>Home</span>
          <span className="text-white relative h-16 flex items-center px-1">
            Problems
            <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full" layoutId="navUnderline" />
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Auth buttons removed as requested */}
      </div>
    </nav>
  );
};
