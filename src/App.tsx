import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Mail, FileText } from 'lucide-react';
import { ArchitectPortfolioView } from './components/ArchitectPortfolioView';
import { ProjectCaseStudyView } from './components/ProjectCaseStudyView';
import { NavigationBar } from './components/NavigationBar';
import {
  GitHubLogo,
  LinkedInLogo,
  XLogo,
  LeetCodeLogo,
  StackOverflowLogo,
  InstagramLogo,
} from './components/BrandLogos';

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
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="mailto:sahil.artits.rathee@gmail.com"
              className="w-9 h-9 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-105 shadow-sm"
              title="Email (sahil.artits.rathee@gmail.com)"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-105 shadow-sm"
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <GitHubLogo className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#0A66C2] transition-all hover:scale-105 shadow-sm"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <LinkedInLogo className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/rttss_sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-105 shadow-sm"
              title="X Profile"
              aria-label="X"
            >
              <XLogo className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://leetcode.com/u/rttss-sahil/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#FFA116] transition-all hover:scale-105 shadow-sm"
              title="LeetCode Profile"
              aria-label="LeetCode"
            >
              <LeetCodeLogo className="w-4 h-4" />
            </a>
            <a
              href="https://stackoverflow.com/users/14934835/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#F48024] transition-all hover:scale-105 shadow-sm"
              title="Stack Overflow Profile"
              aria-label="Stack Overflow"
            >
              <StackOverflowLogo className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/rttss_sahil/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#E4405F] transition-all hover:scale-105 shadow-sm"
              title="Instagram Profile"
              aria-label="Instagram"
            >
              <InstagramLogo className="w-4 h-4" />
            </a>
            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-emerald-400 transition-all hover:scale-105 shadow-sm"
              title="Download Resume PDF"
              aria-label="Resume PDF"
            >
              <FileText className="w-4 h-4" />
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
