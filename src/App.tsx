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
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
            <a
              href="mailto:sahil.artits.rathee@gmail.com"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <a
              href="https://github.com/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="GitHub"
            >
              <GitHubLogo className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="LinkedIn"
            >
              <LinkedInLogo className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://x.com/rttss_sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="X"
            >
              <XLogo className="w-3 h-3" />
              <span>X</span>
            </a>
            <a
              href="https://leetcode.com/u/rttss-sahil/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="LeetCode"
            >
              <LeetCodeLogo className="w-3.5 h-3.5" />
              <span>LeetCode</span>
            </a>
            <a
              href="https://stackoverflow.com/users/14934835/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Stack Overflow"
            >
              <StackOverflowLogo className="w-3.5 h-3.5" />
              <span>Stack Overflow</span>
            </a>
            <a
              href="https://www.instagram.com/rttss_sahil/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Instagram"
            >
              <InstagramLogo className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Resume PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
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
