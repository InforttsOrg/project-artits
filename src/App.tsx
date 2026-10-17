import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArchitectPortfolioView } from './components/ArchitectPortfolioView';
import { ProjectCaseStudyView } from './components/ProjectCaseStudyView';
import { NavigationBar } from './components/NavigationBar';

// Automatic scroll-to-top on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white flex flex-col">
      <ScrollToTop />

      {/* Global Navigation Bar */}
      <NavigationBar />

      {/* Routed Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ArchitectPortfolioView />} />
          <Route path="/work/:slug" element={<ProjectCaseStudyView />} />
          <Route path="*" element={<ArchitectPortfolioView />} />
        </Routes>
      </main>

      {/* Global Clean Colophon Footer */}
      <footer className="border-t border-zinc-800/60 bg-zinc-950/80 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold text-zinc-300">Sahil Rathee</span>
            <span>•</span>
            <span>New Delhi, India</span>
            <span>•</span>
            <span className="font-mono text-xs">rttss-sahil</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="mailto:sahil.artits.rathee@gmail.com"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/rttss_sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              X
            </a>
            <a
              href="https://leetcode.com/u/rttss-sahil/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              LeetCode
            </a>
            <a
              href="https://stackoverflow.com/users/14934835/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Stack Overflow
            </a>
            <a
              href="https://www.instagram.com/rttss_sahil/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Instagram
            </a>
            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Resume PDF
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
