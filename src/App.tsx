import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SpacetimePlaygroundView } from './components/SpacetimePlaygroundView';
import { ArchitectPortfolioView } from './components/ArchitectPortfolioView';
import { ProjectCaseStudyView } from './components/ProjectCaseStudyView';

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
    <div className="w-screen h-screen overflow-hidden bg-[#050508] text-zinc-100 font-mono">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SpacetimePlaygroundView />} />
        <Route path="/classic" element={<ArchitectPortfolioView />} />
        <Route path="/work/:slug" element={<ProjectCaseStudyView />} />
        <Route path="*" element={<SpacetimePlaygroundView />} />
      </Routes>
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
