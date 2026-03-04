import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Award, 
  Activity, 
  Clock, 
  Cpu, 
  Brain, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  BookOpen,
  Video as VideoIcon,
  Play,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_PROBLEM } from '../constants';

export const AnalysisModal = ({ isOpen, onClose, code, problem }: { isOpen: boolean, onClose: () => void, code: string, problem: typeof MOCK_PROBLEM }) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnalyzing(true);
      // Simple heuristic to check if the code is a valid Two Sum solution
      const correct = 
        code.includes('HashMap') && 
        code.includes('containsKey') && 
        (code.includes('target - nums[i]') || code.includes('target - nums[j]') || code.includes('complement'));
      
      setIsCorrect(correct);
      const timer = setTimeout(() => setAnalyzing(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, code]);

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-[#1a1a1a] border border-[#303030] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-orange-500/10"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="p-6 border-b border-[#303030] flex items-center justify-between bg-gradient-to-r from-orange-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className={cn("p-2 rounded-lg", isCorrect ? "bg-emerald-500" : "bg-rose-500")}>
              {isCorrect ? <CheckCircle2 size={20} className="text-white" /> : <AlertCircle size={20} className="text-white" />}
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                {analyzing ? "Analyzing Submission..." : isCorrect ? "Submission Accepted" : "Submission Failed"}
              </h2>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">CodeJudge X Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#333] rounded-full transition-colors text-gray-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            {analyzing ? (
              <motion.div 
                key="analyzing"
                className="flex flex-col items-center justify-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="relative w-24 h-24 mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 border-4 border-orange-500/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-orange-500 rounded-full" />
                  <div className="absolute inset-4 border-4 border-blue-500/20 rounded-full" />
                  <div className="absolute inset-4 border-4 border-b-blue-500 rounded-full" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">Analyzing Code Patterns...</h3>
                <p className="text-gray-500 text-sm animate-pulse">Calculating complexity and identifying heuristics</p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                className="space-y-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {!isCorrect && (
                  <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
                    <h4 className="text-rose-500 font-black text-sm uppercase tracking-widest mb-2">Logic Error Detected</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Your solution seems to be missing key components of the optimal Two Sum algorithm. 
                      Make sure you are using a <span className="text-white font-bold">HashMap</span> for O(n) complexity and checking for the <span className="text-white font-bold">complement</span> of each number.
                    </p>
                  </div>
                )}

                {/* Complexity Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#222] p-5 rounded-2xl border border-[#303030] group hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase mb-3">
                      <Clock size={12} className="text-orange-500" /> Time Complexity
                    </div>
                    <div className="text-3xl font-black text-white tracking-tighter">{isCorrect ? "O(n)" : "O(n²)"}</div>
                    <p className="text-xs text-gray-500 mt-2">
                      {isCorrect ? "Linear scan through the input array." : "Nested loops detected or suboptimal search."}
                    </p>
                  </div>
                  <div className="bg-[#222] p-5 rounded-2xl border border-[#303030] group hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase mb-3">
                      <Cpu size={12} className="text-blue-500" /> Space Complexity
                    </div>
                    <div className="text-3xl font-black text-white tracking-tighter">{isCorrect ? "O(n)" : "O(1)"}</div>
                    <p className="text-xs text-gray-500 mt-2">
                      {isCorrect ? "Hash map stores up to n elements." : "No additional data structures used."}
                    </p>
                  </div>
                </div>

                {/* Strength & Weakness */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Brain size={16} className="text-purple-500" /> Skill Assessment
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl">
                      <div className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase mb-3">
                        <TrendingUp size={14} /> Strengths
                      </div>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Efficient Hash Map usage</li>
                        <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-500" /> Single-pass logic</li>
                      </ul>
                    </div>
                    <div className="bg-rose-500/5 border border-rose-500/20 p-5 rounded-2xl">
                      <div className="flex items-center gap-2 text-rose-500 text-xs font-black uppercase mb-3">
                        <AlertCircle size={14} /> Weaknesses
                      </div>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> Variable naming clarity</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> Missing null checks</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Recommended Topics & Content */}
                <div className="space-y-6">
                  <div className="bg-[#222] p-6 rounded-2xl border border-[#303030]">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Target size={16} className="text-orange-500" /> Recommended Topics
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { name: 'Hash Tables', url: 'https://www.geeksforgeeks.org/hashing-data-structure/', type: 'resource' },
                        { name: 'Two Pointers', url: 'https://www.youtube.com/results?search_query=two+pointers+technique+java', type: 'video' },
                        { name: 'Sliding Window', url: 'https://www.geeksforgeeks.org/window-sliding-technique/', type: 'resource' },
                        { name: 'Array Sorting', url: 'https://www.youtube.com/results?search_query=sorting+algorithms+java+striver', type: 'video' }
                      ].map((topic) => (
                        <a 
                          key={topic.name} 
                          href={topic.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-orange-500/50 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            {topic.type === 'video' ? <VideoIcon size={12} className="text-red-500" /> : <BookOpen size={12} className="text-blue-500" />}
                            <span>{topic.name}</span>
                          </div>
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#222] p-6 rounded-2xl border border-[#303030]">
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <BookOpen size={14} className="text-blue-500" /> Recommended Reading
                      </h4>
                      <div className="space-y-3">
                        {problem.resources.slice(0, 2).map((res, i) => (
                          <a 
                            key={i} 
                            href={res.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-3 bg-[#1a1a1a] border border-[#333] rounded-xl hover:border-blue-500/30 transition-all group"
                          >
                            <p className="text-xs font-bold text-gray-300 group-hover:text-white truncate">{res.title}</p>
                            <p className="text-[9px] text-gray-500 uppercase mt-1">{res.source}</p>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#222] p-6 rounded-2xl border border-[#303030]">
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <VideoIcon size={14} className="text-red-500" /> Recommended Videos
                      </h4>
                      <div className="space-y-3">
                        {problem.videos.slice(0, 2).map((vid, i) => (
                          <a 
                            key={i} 
                            href={vid.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-3 bg-[#1a1a1a] border border-[#333] rounded-xl hover:border-red-500/30 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 shrink-0">
                                <Play size={12} className="fill-current" />
                              </div>
                              <p className="text-xs font-bold text-gray-300 group-hover:text-white line-clamp-1">{vid.title}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  <Award size={18} /> Continue Learning
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
