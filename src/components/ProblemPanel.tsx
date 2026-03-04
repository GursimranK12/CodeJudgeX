import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Lightbulb, 
  BookOpen, 
  Video as VideoIcon, 
  CheckCircle2, 
  ExternalLink, 
  Brain, 
  Sparkles, 
  PlayCircle, 
  SearchX 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';
import { MOCK_PROBLEM } from '../constants';

export const ProblemPanel = ({ problem }: { problem: typeof MOCK_PROBLEM }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'solutions' | 'resources' | 'videos'>('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: FileText },
    { id: 'solutions', label: 'Solutions', icon: Lightbulb },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: VideoIcon },
  ];

  return (
    <motion.div 
      className="flex flex-col h-full bg-[#282828] rounded-2xl overflow-hidden border border-[#303030] shadow-2xl"
      layout
    >
      <div className="flex items-center bg-[#1a1a1a] border-b border-[#303030] px-3 h-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 h-full text-[10px] font-black uppercase tracking-widest transition-all relative",
              activeTab === tab.id ? "text-white" : "text-gray-500 hover:text-gray-300"
            )}
          >
            <tab.icon size={14} className={activeTab === tab.id ? "text-orange-500" : ""} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full" 
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto p-10 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        <AnimatePresence mode="wait">
          {activeTab === 'description' && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center justify-between mb-8">
                <motion.h1 
                  className="text-4xl font-black text-white tracking-tighter"
                >
                  {problem.id}. {problem.title}
                </motion.h1>
                <div className="flex items-center gap-4">
                  {/* Settings icon removed as requested */}
                </div>
              </div>
              
              <div className="flex items-center gap-5 mb-10">
                <span className={cn(
                  "px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
                  problem.difficulty === 'Easy' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                  problem.difficulty === 'Medium' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                  "bg-rose-500/10 text-rose-500 border-rose-500/20"
                )}>
                  {problem.difficulty}
                </span>
                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest bg-[#1a1a1a] px-4 py-2 rounded-xl border border-[#303030]">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Solved</span>
                </div>
              </div>
              
              <div className="markdown-body">
                <ReactMarkdown>{problem.description}</ReactMarkdown>
                
                <div className="mt-12 space-y-10">
                  {problem.testCases.slice(0, 2).map((testCase, idx) => (
                    <motion.div 
                      key={idx} 
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                        Example {idx + 1}:
                      </h3>
                      <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#303030] font-mono text-sm group-hover:border-orange-500/40 transition-all group-hover:shadow-xl group-hover:shadow-orange-500/5">
                        <p className="mb-3"><span className="text-gray-500 font-black uppercase text-[10px] tracking-widest mr-3">Input</span> <span className="text-gray-200">{testCase.input}</span></p>
                        <p className="mb-3"><span className="text-gray-500 font-black uppercase text-[10px] tracking-widest mr-3">Output</span> <span className="text-emerald-400">{testCase.expectedOutput}</span></p>
                        {testCase.explanation && (
                          <p className="mt-4 pt-4 border-t border-[#303030] italic text-gray-400 text-xs leading-relaxed">
                            <span className="text-gray-500 font-black uppercase text-[10px] tracking-widest not-italic mr-3">Explanation</span> {testCase.explanation}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">Constraints:</h3>
                  <div className="bg-[#1a1a1a]/50 p-6 rounded-2xl border border-[#303030] backdrop-blur-sm">
                    <ul className="space-y-3">
                      {problem.constraints.map((c, i) => (
                        <li key={i} className="flex items-start gap-4 text-sm text-gray-400">
                          <div className="mt-2 w-1.5 h-1.5 bg-gray-700 rounded-full shrink-0" />
                          <code className="bg-transparent p-0 text-gray-300">{c}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'solutions' && (
            <motion.div
              key="solutions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-black text-white tracking-tighter mb-6">Best Solutions</h2>
              {problem.solutions.map((sol, idx) => (
                <div key={idx} className="bg-[#1a1a1a] border border-[#303030] rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 bg-[#222] border-b border-[#303030] flex items-center justify-between">
                    <span className="text-xs font-black text-orange-500 uppercase tracking-widest">{sol.language} Solution</span>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                  </div>
                  <div className="p-6">
                    <pre className="bg-[#0a0a0a] p-6 rounded-xl text-xs font-mono text-gray-300 overflow-x-auto border border-white/5 mb-6">
                      <code>{sol.code}</code>
                    </pre>
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                        <Brain size={14} className="text-orange-500" /> Explanation
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {sol.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-3xl font-black text-white tracking-tighter">Learning Resources</h2>
                <p className="text-gray-500 text-sm">Curated articles and tutorials from GeeksforGeeks and other top sources.</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {problem.resources.map((resource, idx) => (
                  <motion.a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.01, x: 5 }}
                    className="p-6 bg-[#1a1a1a] border border-[#303030] rounded-2xl flex items-center justify-between group hover:border-orange-500/40 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                        <BookOpen size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1 group-hover:text-orange-500 transition-colors">{resource.title}</h4>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{resource.source}</span>
                      </div>
                    </div>
                    <ExternalLink size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-12 p-8 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-3xl">
                <h3 className="text-lg font-black text-white mb-4 flex items-center gap-3">
                  <Sparkles size={20} className="text-orange-500" /> Pro Tip
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Always try to solve the problem yourself for at least 30 minutes before looking at the solutions. 
                  Understanding the "why" behind a solution is more important than just knowing the "how".
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-3xl font-black text-white tracking-tighter">Video Tutorials</h2>
                <p className="text-gray-500 text-sm">Step-by-step video explanations for this problem.</p>
              </div>
              
              {problem.videos && problem.videos.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {problem.videos.map((video, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] border border-[#303030] rounded-3xl overflow-hidden group hover:border-orange-500/40 transition-all">
                      <div className="aspect-video relative bg-black">
                        <iframe 
                          src={video.url}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                            <PlayCircle size={20} />
                          </div>
                          <h4 className="text-white font-bold">{video.title}</h4>
                        </div>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">YouTube</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-[#1a1a1a] border border-dashed border-[#303030] rounded-3xl">
                  <div className="p-4 bg-white/5 rounded-full mb-4">
                    <SearchX size={40} className="text-gray-600" />
                  </div>
                  <h3 className="text-white font-bold mb-2">No Videos Found</h3>
                  <p className="text-gray-500 text-sm">We're currently working on adding video content for this problem.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
