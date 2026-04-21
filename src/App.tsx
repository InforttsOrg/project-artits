import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Shield, 
  Cpu, 
  Network, 
  Terminal, 
  ExternalLink, 
  ArrowRight,
  Code2,
  BrainCircuit,
  Orbit
} from 'lucide-react';

const Portfolio = () => {
  const [step, setStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entrance animation
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      });
      
      gsap.to(".orbit", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "The Vision",
      subtitle: "Sahil Rathee",
      description: "Building the Operating System for the AI Era. I architect autonomous ecosystems that turn complex ideas into scalable SaaS economies.",
      icon: <Orbit className="w-12 h-12 text-cyan-400 orbit" />
    },
    {
      title: "The Project: Forensics",
      subtitle: "Institutional Intelligence",
      description: "The crown jewel of the Infortts Factory. A neural-powered backtesting and algorithmic trading hub designed for the next generation of institutional finance.",
      link: "https://forensics.infortts.com",
      icon: <BrainCircuit className="w-12 h-12 text-purple-400" />
    },
    {
      title: "The Swarm",
      subtitle: "Decentralized Growth",
      description: "Scaling across sectors—from Dropship Logistics and Medical Booking to high-concurrency Social platforms. One brain, many nodes.",
      icon: <Network className="w-12 h-12 text-emerald-400" />
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-cyan-500/30 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[#020617]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-0 invert"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]"></div>
      </div>

      <header ref={headerRef} className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20"></div>
          <span className="font-bold text-xl tracking-tight uppercase font-outfit">S.R. / INFT</span>
        </div>
        <nav className="flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-cyan-400 transition-colors">THE FACTORY</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">RESEARCH</a>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all flex items-center gap-2">
            CONTACT <ArrowRight className="w-4 h-4" />
          </button>
        </nav>
      </header>

      <main className="relative pt-32 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center min-h-[80vh]">
        <div className="space-y-8">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-bold text-cyan-400 tracking-widest uppercase">
              <Terminal className="w-3 h-3" /> System Architect Active
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="reveal text-7xl lg:text-8xl font-black leading-tight font-outfit tracking-tighter">
              {steps[step].title}
            </h1>
            <h2 className="reveal text-2xl lg:text-3xl text-slate-400 font-medium">
              {steps[step].subtitle}
            </h2>
          </div>

          <p className="reveal text-lg text-slate-400 leading-relaxed max-w-xl">
            {steps[step].description}
          </p>

          <div className="reveal pt-4 flex items-center gap-4">
            {steps[step].link && (
              <a 
                href={steps[step].link} 
                className="group flex items-center gap-2 px-6 py-3 bg-cyan-500 text-slate-900 font-bold rounded-xl hover:scale-105 active:scale-95 transition-all"
              >
                VISIT HUB <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
            <button 
              onClick={() => setStep((step + 1) % steps.length)}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold"
            >
              NEXT NODE
            </button>
          </div>
        </div>

        <div className="reveal relative flex justify-center items-center">
          <div className="absolute inset-0 bg-cyan-400/20 blur-[100px] rounded-full scale-75 animate-pulse"></div>
          <div className="relative w-full aspect-square glass-panel flex flex-col items-center justify-center gap-6 border-cyan-500/20 group hover:border-cyan-500/40 transition-all duration-700 overflow-hidden">
             <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="w-full h-full border-[1px] border-cyan-500/10 bg-[radial-gradient(circle_at_center,_var(--accent-glow)_0%,_transparent_70%)]"></div>
             </div>
             {steps[step].icon}
             <div className="text-center z-10">
                <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-[0.3em]">Neural Interface 0{step + 1}</p>
                <p className="text-xl font-bold mt-1 text-white uppercase tracking-widest">{steps[step].subtitle}</p>
             </div>
             
             {/* Micro-animations */}
             <div className="absolute bottom-4 left-4 flex gap-1">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`w-1 h-${i*2} bg-cyan-500/40 rounded-full animate-pulse`} style={{animationDelay: `${i*100}ms`}}></div>
                ))}
             </div>
          </div>
        </div>
      </main>

      <footer className="relative mt-20 border-t border-white/5 px-8 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-slate-500">
            © 2026 INFT / SAHIL RATHEE. ALL SYSTEMS OPERATIONAL.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">LinkedIn</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">GitHub</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">X / Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
