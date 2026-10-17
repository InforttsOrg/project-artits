import React, { useState, useEffect } from 'react';
import { ArchitectRunnerGame } from './components/ArchitectRunnerGame';
import { PhoneCallModal } from './components/PhoneCallModal';
import { PortfolioDrawer } from './components/PortfolioDrawer';

const App: React.FC = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);
  const [inforttsFeedsCount, setInforttsFeedsCount] = useState<number>(40);

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

  return (
    <div className="jantar-mantar-app">
      {/* Top-Down Architect Arena Canvas Game & Sahil Rathee Portfolio Menu */}
      <ArchitectRunnerGame
        onOpenPhoneCall={() => setIsPhoneModalOpen(true)}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        inforttsFeedsCount={inforttsFeedsCount}
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

export default App;
