import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArchitectPortfolioView } from './components/ArchitectPortfolioView';
import { ProjectCaseStudyView } from './components/ProjectCaseStudyView';
import { PlaygroundView } from './components/PlaygroundView';
import { NavigationBar } from './components/NavigationBar';
import { EntryLoader } from './components/EntryLoader';
import { PhoneCallModal } from './components/PhoneCallModal';
import { PortfolioDrawer } from './components/PortfolioDrawer';
import { ComeSayHiModal } from './components/ComeSayHiModal';

// Automatic scroll-to-top on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [isSayHiOpen, setIsSayHiOpen] = useState<boolean>(false);
  const [inforttsFeedsCount, setInforttsFeedsCount] = useState<number>(40);
  const [showLoader, setShowLoader] = useState<boolean>(() => {
    return sessionStorage.getItem('has_loaded_artits_deck') !== 'true';
  });

  // Sync live Infortts Shared Backend telemetry
  useEffect(() => {
    fetch('/api/infortts?action=health')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.telemetry && Array.isArray(data.telemetry.m5_loaded)) {
          setInforttsFeedsCount(data.telemetry.m5_loaded.length);
        }
      })
      .catch(() => {});
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('has_loaded_artits_deck', 'true');
    setShowLoader(false);
  };

  return (
    <div className="architect-deck-app">
      <ScrollToTop />

      {/* Huyml-inspired 5-second entry loader (00% -> 100%) */}
      {showLoader && <EntryLoader onComplete={handleLoaderComplete} />}

      {/* Global Navigation Bar */}
      <NavigationBar
        onOpenPhoneCall={() => setIsPhoneModalOpen(true)}
        onOpenSayHi={() => setIsSayHiOpen(true)}
      />

      {/* Routed Content View */}
      <main className="deck-main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ArchitectPortfolioView
                onOpenPhoneCall={() => setIsPhoneModalOpen(true)}
                inforttsFeedsCount={inforttsFeedsCount}
              />
            }
          />
          <Route
            path="/work/:slug"
            element={
              <ProjectCaseStudyView
                onOpenPhoneCall={() => setIsPhoneModalOpen(true)}
              />
            }
          />
          <Route
            path="/playground"
            element={
              <PlaygroundView
                onOpenPhoneCall={() => setIsPhoneModalOpen(true)}
              />
            }
          />
          <Route
            path="*"
            element={
              <ArchitectPortfolioView
                onOpenPhoneCall={() => setIsPhoneModalOpen(true)}
                inforttsFeedsCount={inforttsFeedsCount}
              />
            }
          />
        </Routes>
      </main>

      {/* Slide-Up Come Say Hi Banner Modal */}
      <ComeSayHiModal
        isOpen={isSayHiOpen}
        onClose={() => setIsSayHiOpen(false)}
        onOpenPhoneCall={() => setIsPhoneModalOpen(true)}
      />

      {/* Direct Phone Connection Modal */}
      <PhoneCallModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />

      {/* Accessible Architectural Portfolio Sheet */}
      <PortfolioDrawer
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        onOpenPhoneCall={() => setIsPhoneModalOpen(true)}
      />
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
