import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Zap, 
  Brain, 
  Target, 
  ChevronRight, 
  Trophy, 
  Users, 
  Globe,
  Sparkles,
  Cpu,
  BarChart3,
  Shield
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  const features = [
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Get instant feedback on your code complexity and logic patterns.",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      icon: Brain,
      title: "AI-Powered Growth",
      description: "Personalized skill assessments and topic recommendations.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Target,
      title: "Targeted Practice",
      description: "Curated problems designed to strengthen your specific weaknesses.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Trophy,
      title: "Competitive Edge",
      description: "Compete in global contests and track your progress on the leaderboard.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  const stats = [
    { label: "Active Users", value: "100K+", icon: Users },
    { label: "Problems Solved", value: "5M+", icon: CheckCircleIcon },
    { label: "Global Reach", value: "150+", icon: Globe },
  ];

  function CheckCircleIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-500 text-xs font-black uppercase tracking-widest mb-8"
            >
              <Sparkles size={14} />
              <span>Next-Gen Coding Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]"
            >
              MASTER THE ART OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600">
                COMPETITIVE CODING
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-gray-400 text-lg md:text-xl mb-12 leading-relaxed"
            >
              CodeJudge X is the ultimate interactive engine for developers. 
              Analyze complexity, identify weaknesses, and level up your skills with real-time feedback.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <button
                onClick={onStart}
                className="group relative px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl shadow-orange-500/20 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span>Start Solving</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center gap-3">
                <Globe size={20} />
                <span>Explore Problems</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-8 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-[#141414] border border-white/5 hover:border-orange-500/30 transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3", feature.bg)}>
                  <feature.icon size={28} className={feature.color} />
                </div>
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Section */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 leading-tight">
              WHY CHOOSE <br />
              <span className="text-orange-500">CODEJUDGE X?</span>
            </h2>
            <div className="space-y-6">
              {[
                { icon: Cpu, text: "Advanced V8-X Quantum Execution Engine" },
                { icon: BarChart3, text: "Deep Complexity & Heuristic Analysis" },
                { icon: Shield, text: "Secure & Sandboxed Code Environment" },
                { icon: Users, text: "Vibrant Community of 100K+ Developers" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <item.icon size={20} className="text-orange-500" />
                  </div>
                  <span className="text-gray-300 font-bold">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-[3rem] p-1">
              <div className="w-full h-full bg-[#141414] rounded-[2.9rem] overflow-hidden border border-white/10 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-orange-500/40 animate-bounce">
                  <Code2 size={48} className="text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Ready to Level Up?</h3>
                <p className="text-gray-500 mb-8 max-w-sm">
                  Join thousands of developers who are already mastering data structures and algorithms on CodeJudge X.
                </p>
                <button
                  onClick={onStart}
                  className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-orange-500 hover:text-white transition-all"
                >
                  Join Now
                </button>
              </div>
            </div>
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -right-8 p-6 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl"
            >
              <Trophy size={32} className="text-yellow-500" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-8 -left-8 p-6 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl"
            >
              <Brain size={32} className="text-blue-500" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex p-4 bg-white/5 rounded-2xl mb-6">
                  <stat.icon size={32} className="text-orange-500" />
                </div>
                <div className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
                <div className="text-gray-500 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <Code2 size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-white tracking-tighter">CODEJUDGE X</span>
              <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Interactive Engine</span>
            </div>
          </div>
          <div className="flex gap-8 text-gray-500 font-bold uppercase tracking-widest text-xs">
            <a href="#" className="hover:text-white transition-colors">Problems</a>
            <a href="#" className="hover:text-white transition-colors">Contests</a>
            <a href="#" className="hover:text-white transition-colors">Discuss</a>
            <a href="#" className="hover:text-white transition-colors">Store</a>
          </div>
          <div className="text-gray-600 text-xs font-bold">
            © 2026 CODEJUDGE X. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
