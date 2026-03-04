import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Clock, Cpu, TrendingUp } from 'lucide-react';
import { MOCK_PROBLEM } from './constants';
import LandingPage from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { ProblemPanel } from './components/ProblemPanel';
import { EditorPanel } from './components/EditorPanel';
import { AnalysisModal } from './components/AnalysisModal';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [submittedCode, setSubmittedCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (code: string) => {
    setSubmittedCode(code);
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-200 selection:bg-orange-500/30">
      <AnimatePresence>
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showAnalysis && (
          <AnalysisModal 
            isOpen={showAnalysis} 
            onClose={() => setShowAnalysis(false)} 
            code={submittedCode} 
            problem={MOCK_PROBLEM}
          />
        )}
      </AnimatePresence>

      {!loading && (
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onStart={() => setView('app')} />
            </motion.div>
          ) : (
            <motion.div 
              key="app"
              className="flex flex-col h-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Navbar onHome={() => setView('landing')} />
              
              <main className="flex-1 p-4 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                  <ProblemPanel problem={MOCK_PROBLEM} />
                  <EditorPanel problem={MOCK_PROBLEM} onSubmit={handleSubmit} />
                </div>
              </main>
              
              <footer className="h-12 bg-[#1a1a1a] border-t border-[#303030] flex items-center justify-between px-8 text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">
                <div className="flex items-center gap-10">
                  <span className="flex items-center gap-3 group cursor-help">
                    <Clock size={14} className="text-orange-500 group-hover:animate-spin" /> 
                    Latency: <span className="text-gray-300">18ms</span>
                  </span>
                  <span className="flex items-center gap-3 group cursor-help">
                    <Cpu size={14} className="text-blue-500 group-hover:animate-pulse" /> 
                    Engine: <span className="text-gray-300">V8-X Quantum</span>
                  </span>
                  <span className="flex items-center gap-3 group cursor-help">
                    <TrendingUp size={14} className="text-emerald-500" /> 
                    Uptime: <span className="text-gray-300">99.9%</span>
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                  <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                  <span className="text-orange-500 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                    © 2026 CODEJUDGE X INTERACTIVE
                  </span>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
