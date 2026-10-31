import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Mail, FileText, ShieldCheck } from 'lucide-react';
import { ArchitectPortfolioView } from './components/ArchitectPortfolioView';
import { ProjectCaseStudyView } from './components/ProjectCaseStudyView';
import { HrVerificationView } from './components/HrVerificationView';
import { NavigationBar } from './components/NavigationBar';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { CustomCursor } from './components/CustomCursor';
import {
  GitHubLogo,
  LinkedInLogo,
  XLogo,
  LeetCodeLogo,
  StackOverflowLogo,
  InstagramLogo,
} from './components/BrandLogos';
import { trackVisitorEvent } from './utils/visitorTracker';

// Automatic scroll-to-top and route telemetry
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackVisitorEvent('page_view', { path: pathname });
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white flex flex-col relative bg-grid-boxes">
      <ScrollToTop />
      <CustomCursor />

      {/* Global Navigation Bar */}
      <NavigationBar />

      {/* Routed Content View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ArchitectPortfolioView />} />
          <Route path="/verify" element={<HrVerificationView />} />
          <Route path="/work/:slug" element={<ProjectCaseStudyView />} />
          <Route path="*" element={<ArchitectPortfolioView />} />
        </Routes>
      </main>

      {/* Global Clean Editorial Colophon Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Identity & Availability */}
            <div className="flex flex-col gap-3">
              <span className="font-display font-bold text-lg text-white">Sahil Rathee</span>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                Senior Systems & Infrastructure Engineer specializing in resilient distributed backends, quantitative execution, and autonomous agentic workflows.
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Senior & Staff Roles • New Delhi (Remote Worldwide)</span>
              </div>
            </div>

            {/* Column 2: Documents & Dossier */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Dossier & Resumes
              </span>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href="/Sahil-Rathee-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    <span>1-Page Resume (PDF)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/Sahil-Rathee-Resume-Full.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Full Detailed Resume (PDF)</span>
                  </a>
                </li>
                <li>
                  <Link
                    to="/verify"
                    className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>HR & Employment Verification</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5 text-xs font-mono"
                  >
                    <span>Web Resume (HTML) ↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Verified Channels */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Verified Channels
              </span>
              <div className="flex flex-col gap-2 text-sm">
                <a
                  href="mailto:sahil.artits.rathee@gmail.com"
                  className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span className="font-mono text-xs">sahil.artits.rathee@gmail.com</span>
                </a>
                <a
                  href="https://github.com/rttss-sahil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <GitHubLogo className="w-4 h-4" />
                  <span>GitHub: @rttss-sahil</span>
                </a>
                <a
                  href="https://linkedin.com/in/rttss-sahil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-[#0A66C2] transition-colors inline-flex items-center gap-2"
                >
                  <LinkedInLogo className="w-4 h-4" />
                  <span>LinkedIn: @rttss-sahil</span>
                </a>
                <a
                  href="https://x.com/rttss_sahil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <XLogo className="w-3.5 h-3.5" />
                  <span>X (Twitter): @rttss_sahil</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Colophon Bar */}
          <div className="pt-6 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <span>© 2026 Sahil Rathee • Systems & Infrastructure Architect</span>
            <span>Hosted on Cloudflare Pages via GitHub Actions</span>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />

      {/* Persistent Theme Switcher */}
      <ThemeSwitcher />
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
