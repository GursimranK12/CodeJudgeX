import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Play, 
  Send 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_PROBLEM, TestCase } from '../constants';

export const EditorPanel = ({ problem, onSubmit }: { problem: typeof MOCK_PROBLEM, onSubmit: (code: string) => void }) => {
  const [code, setCode] = useState(problem.starterCode);
  const [language, setLanguage] = useState('Java');
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [runResults, setRunResults] = useState<TestCase[]>(problem.testCases);

  const handleRun = () => {
    setIsRunning(true);
    
    // Simple heuristic to check if the code is a valid Two Sum solution
    const isCorrectSolution = 
      code.includes('HashMap') && 
      code.includes('containsKey') && 
      (code.includes('target - nums[i]') || code.includes('target - nums[j]') || code.includes('complement'));

    setTimeout(() => {
      setRunResults(prev => prev.map(tc => {
        const isCorrect = isCorrectSolution; 
        return {
          ...tc,
          status: isCorrect ? 'passed' : 'failed',
          actualOutput: isCorrect ? tc.expectedOutput : 'Wrong Answer: Expected ' + tc.expectedOutput + ', but got something else.'
        };
      }));
      setIsRunning(false);
    }, 1500);
  };

  return (
    <motion.div 
      className="flex flex-col h-full bg-[#282828] rounded-2xl overflow-hidden border border-[#303030] shadow-2xl"
      layout
    >
      <div className="flex items-center justify-between bg-[#1a1a1a] border-b border-[#303030] px-5 h-12">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-3 px-5 py-2 bg-[#333] hover:bg-[#444] rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all border border-white/5 group">
            <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:animate-pulse" />
            {language}
          </button>
        </div>
        <div className="flex items-center gap-5">
          {/* Editor header icons removed as requested */}
        </div>
      </div>
      
      <div className="flex-1 relative font-mono text-sm overflow-hidden flex flex-col">
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex">
            <div className="w-16 bg-[#1a1a1a] border-r border-[#303030] flex flex-col items-center pt-8 text-gray-600 select-none font-black text-[9px] tracking-tighter">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="h-6 leading-6">{i + 1}</div>
              ))}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-8 resize-none outline-none text-gray-200 caret-orange-500 leading-6 font-mono selection:bg-orange-500/30"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Test Case Panel */}
        <div className="h-2/5 bg-[#1a1a1a] border-t border-[#303030] flex flex-col shadow-inner">
          <div className="flex items-center px-6 h-12 border-b border-[#303030] bg-[#222]/50">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
              <Terminal size={14} className="text-orange-500" /> Test case Result
            </span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
            <div className="flex gap-3 mb-6">
              {runResults.map((tc, i) => (
                <button
                  key={tc.id}
                  onClick={() => setActiveTestCase(i)}
                  className={cn(
                    "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border flex items-center gap-3",
                    activeTestCase === i 
                      ? "bg-orange-500/10 text-white border-orange-500/50 shadow-lg shadow-orange-500/5" 
                      : "bg-[#1a1a1a] text-gray-500 border-[#303030] hover:border-gray-600"
                  )}
                >
                  {tc.status === 'passed' && <CheckCircle2 size={14} className="text-emerald-500" />}
                  {tc.status === 'failed' && <AlertCircle size={14} className="text-rose-500" />}
                  Case {i + 1}
                </button>
              ))}
            </div>
            
            <div className="space-y-6">
              {runResults[activeTestCase].status === 'failed' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle size={20} className="text-rose-500" />
                  <div>
                    <p className="text-rose-500 font-black text-xs uppercase tracking-widest">Wrong Answer</p>
                    <p className="text-rose-500/70 text-[10px]">Your output did not match the expected result.</p>
                  </div>
                </motion.div>
              )}
              <div className="group">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-3 group-hover:text-gray-400 transition-colors">Input Parameters</p>
                <div className="bg-[#282828] p-4 rounded-xl border border-[#303030] text-xs font-mono text-gray-300 group-hover:border-[#444] transition-colors">
                  {runResults[activeTestCase].input}
                </div>
              </div>
              {runResults[activeTestCase].status && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="group"
                >
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-3 group-hover:text-gray-400 transition-colors">Standard Output</p>
                  <div className={cn(
                    "p-4 rounded-xl border text-xs font-mono group-hover:shadow-lg transition-all",
                    runResults[activeTestCase].status === 'passed' 
                      ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 group-hover:border-emerald-500/40" 
                      : "bg-rose-500/5 border-rose-500/20 text-rose-400 group-hover:border-rose-500/40"
                  )}>
                    {runResults[activeTestCase].actualOutput}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-16 bg-[#1a1a1a] border-t border-[#303030] flex items-center justify-between px-8">
        <button className="flex items-center gap-3 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105">
          <Terminal size={18} />
          Console
        </button>
        <div className="flex items-center gap-5">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRun}
            disabled={isRunning}
            className={cn(
              "flex items-center gap-3 px-8 py-2.5 bg-[#333] hover:bg-[#444] rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all border border-white/5 shadow-xl shadow-black/20",
              isRunning && "opacity-50 cursor-not-allowed"
            )}
          >
            {isRunning ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RotateCcw size={16} />
              </motion.div>
            ) : (
              <Play size={16} className="fill-current" />
            )}
            Run
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(16,185,129,0.3)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSubmit(code)}
            className="flex items-center gap-3 px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-emerald-600/20"
          >
            <Send size={16} />
            Submit
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
