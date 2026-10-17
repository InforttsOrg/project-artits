import React, { useState, useEffect, useCallback } from 'react';

interface EntryLoaderProps {
  onComplete: () => void;
}

export const EntryLoader: React.FC<EntryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('SYNCHRONIZING INFORTTS TELEMETRY RUNTIME');
  const [isDismissing, setIsDismissing] = useState<boolean>(false);

  const handleFinish = useCallback(() => {
    setIsDismissing(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Keyboard shortcut listener: Enter, Space, or Escape immediately skips
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  useEffect(() => {
    // 5-second smooth loading sequence (4800ms total)
    const startTime = Date.now();
    const duration = 4800; // 5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current < 25) {
        setStatusText('[01/04] LOADING PRODUCTION CASE STUDIES & ARCHITECTURE');
      } else if (current < 50) {
        setStatusText('[02/04] INITIALIZING LIVE TOPOLOGY & SYSTEM BENCHMARKS');
      } else if (current < 75) {
        setStatusText('[03/04] PREPARING INTERACTIVE DEMOS & CODEBASE GRAPH');
      } else if (current < 100) {
        setStatusText('[04/04] VERIFYING PRODUCTION SYSTEMS • NEW DELHI // 2002');
      } else {
        clearInterval(interval);
        setStatusText('SYSTEMS READY // PORTFOLIO LOADED');
        setTimeout(() => {
          handleFinish();
        }, 350);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [handleFinish]);

  return (
    <div
      className={`cyber-entry-loader ${isDismissing ? 'dismissing' : ''}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      onClick={handleFinish}
      title="Click anywhere or press Enter to skip"
    >
      {/* Background Matrix Blueprint Grid */}
      <div className="loader-bg-grid" />
      <div className="loader-radial-glow" />

      {/* Cinematic Dual Split Shutters for 100% Reveal */}
      <div className={`shutter shutter-left ${isDismissing ? 'open-left' : ''}`} />
      <div className={`shutter shutter-right ${isDismissing ? 'open-right' : ''}`} />

      {/* Central Holographic Stage */}
      <div className="loader-central-stage" onClick={(e) => e.stopPropagation()}>
        {/* Holographic Infortts Emblem with Orbiting Rings */}
        <div className="hologram-emblem-wrap">
          <svg className="hologram-rings-svg" viewBox="0 0 220 220" width="220" height="220">
            {/* Outer dashed spinning ring */}
            <circle
              cx="110"
              cy="110"
              r="102"
              fill="none"
              stroke="#00f3ff"
              strokeWidth="1.5"
              strokeDasharray="8 14"
              className="ring-spin-clockwise"
            />
            {/* Middle counter-spinning ring */}
            <circle
              cx="110"
              cy="110"
              r="88"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="4 8"
              opacity="0.6"
              className="ring-spin-counter"
            />
            {/* Inner target ticks */}
            <circle
              cx="110"
              cy="110"
              r="76"
              fill="none"
              stroke="#00d2ff"
              strokeWidth="1"
              strokeDasharray="2 12"
              opacity="0.8"
            />
          </svg>

          {/* Real Official Infortts Emblem */}
          <div className="hologram-logo-core">
            <img
              src="/companies/infortts.png"
              alt="Infortts Emblem"
              className="hologram-infortts-img"
            />
            {/* Vertical scanning laser beam */}
            <div className="hologram-scanline" />
          </div>
        </div>

        {/* Architectural Identity Typography */}
        <div className="loader-typography-block">
          <div className="loader-name-row">
            <span className="loader-first-name">SAHIL</span>
            <span className="loader-last-name">RATHEE</span>
          </div>
          <div className="loader-architect-subtitle">
            <span className="cyan-prefix">&gt;</span> SOFTWARE ENGINEER // BORN 2002 // INFORTTS INC.
          </div>
        </div>

        {/* Real-Time Digital Millisecond Counter */}
        <div className="loader-counter-block">
          <span className="loader-counter-digits">
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span className="loader-counter-percent">%</span>
        </div>

        {/* Glowing Progress Track */}
        <div className="loader-track-wrapper">
          <div className="loader-track-fill" style={{ width: `${progress}%` }} />
          <div className="loader-track-glow-head" style={{ left: `${progress}%` }} />
        </div>

        {/* Telemetry Status Strip */}
        <div className="loader-status-strip">
          <div className="loader-status-left">
            <span className="loader-pulse-dot" />
            <span className="loader-status-msg">{statusText}</span>
          </div>
          <button
            type="button"
            className="loader-skip-action-btn"
            onClick={handleFinish}
          >
            SKIP [ENTER] ↗
          </button>
        </div>
      </div>
    </div>
  );
};
