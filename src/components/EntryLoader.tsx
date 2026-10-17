import React, { useState, useEffect } from 'react';

interface EntryLoaderProps {
  onComplete: () => void;
}

export const EntryLoader: React.FC<EntryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('SYNCHRONIZING INFORTTS TELEMETRY RUNTIME');
  const [isDismissing, setIsDismissing] = useState<boolean>(false);

  useEffect(() => {
    // 5-second smooth loading sequence (5000ms total)
    const startTime = Date.now();
    const duration = 4800; // ~5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current < 25) {
        setStatusText('[01/04] BOOTING DISTRIBUTED RUNTIME & IN-MEMORY IPC');
      } else if (current < 50) {
        setStatusText('[02/04] MOUNTING MITOCHONDRIA HFT RINGBUFFERS');
      } else if (current < 75) {
        setStatusText('[03/04] VERIFYING AUTONOMOUS MEESEEKS AGENT SWARMS');
      } else if (current < 100) {
        setStatusText('[04/04] SYNCHRONIZING CLUSTER TOPOLOGY • 2002 -> 2026');
      } else {
        clearInterval(interval);
        setStatusText('SYSTEMS ONLINE • REVEALING COMMAND DECK');
        setTimeout(() => {
          setIsDismissing(true);
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsDismissing(true);
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <div
      className={`entry-loader-overlay ${isDismissing ? 'dismiss' : ''}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Huyml-style Split-screen character reveal */}
      <div className={`split-left-curtain ${isDismissing ? 'open-left' : ''}`}>
        <div className="curtain-content">
          <span className="split-brand-half left">SAHIL</span>
        </div>
      </div>

      <div className={`split-right-curtain ${isDismissing ? 'open-right' : ''}`}>
        <div className="curtain-content">
          <span className="split-brand-half right">RATHEE</span>
        </div>
      </div>

      {/* Center Illustrated Pushing Character (Huyml aesthetic) */}
      <div className="loader-center-stage">
        {/* Animated Figure Pushing the Wall */}
        <div className="pushing-figure-container">
          <svg
            className="pushing-character-svg"
            viewBox="0 0 200 240"
            width="180"
            height="216"
          >
            {/* Pushing Character Silhouette */}
            {/* Cap */}
            <path d="M70,55 Q100,45 130,52 Q150,56 160,65 L125,65 Z" fill="#38bdf8" stroke="#020617" strokeWidth="2.5" />
            <path d="M125,65 Q155,68 175,72 Q145,78 125,72 Z" fill="#00d2ff" stroke="#020617" strokeWidth="2" />
            {/* Head */}
            <circle cx="105" cy="78" r="24" fill="#ffffff" stroke="#020617" strokeWidth="2.5" />
            {/* Glasses */}
            <rect x="96" y="70" width="16" height="12" rx="2" fill="none" stroke="#020617" strokeWidth="2" />
            <rect x="116" y="70" width="16" height="12" rx="2" fill="none" stroke="#020617" strokeWidth="2" />
            <line x1="112" y1="76" x2="116" y2="76" stroke="#020617" strokeWidth="2" />
            {/* Pushing Arm 1 */}
            <path d="M95,115 L145,108 L170,105" fill="none" stroke="#020617" strokeWidth="6" strokeLinecap="round" />
            {/* Pushing Arm 2 */}
            <path d="M90,122 L140,118 L168,115" fill="none" stroke="#020617" strokeWidth="6" strokeLinecap="round" />
            {/* Hands on wall */}
            <circle cx="172" cy="104" r="5" fill="#ffffff" stroke="#020617" strokeWidth="2" />
            <circle cx="170" cy="115" r="5" fill="#ffffff" stroke="#020617" strokeWidth="2" />
            {/* Torso / Shirt */}
            <path d="M80,100 L125,98 L115,160 L65,155 Z" fill="#00d2ff" stroke="#020617" strokeWidth="2.5" />
            {/* Shorts */}
            <path d="M65,155 L115,160 L110,190 L85,188 L80,195 L55,185 Z" fill="#0f172a" stroke="#020617" strokeWidth="2.5" />
            {/* Legs straining */}
            <path d="M60,185 L45,215 L35,225" fill="none" stroke="#020617" strokeWidth="5" strokeLinecap="round" />
            <path d="M100,190 L95,220 L110,228" fill="none" stroke="#020617" strokeWidth="5" strokeLinecap="round" />
            {/* Shoes */}
            <ellipse cx="32" cy="226" rx="14" ry="6" fill="#ffffff" stroke="#020617" strokeWidth="2" />
            <ellipse cx="112" cy="230" rx="14" ry="6" fill="#ffffff" stroke="#020617" strokeWidth="2" />
            {/* Wall Line */}
            <line x1="174" y1="10" x2="174" y2="235" stroke="#00d2ff" strokeWidth="3" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Counter and Telemetry */}
        <div className="loader-inner-container">
          <div className="loader-header-row">
            <span className="loader-brand-tag">SAHIL RATHEE // ARCHITECT // BORN 2002</span>
            <button type="button" className="loader-skip-btn" onClick={handleSkip}>
              SKIP [ENTER] ↗
            </button>
          </div>

          {/* 5-second Counter */}
          <div className="loader-counter-wrapper">
            <span className="loader-counter-number">
              {progress < 10 ? `0${progress}` : progress}
            </span>
            <span className="loader-counter-symbol">%</span>
          </div>

          {/* Progress bar */}
          <div className="loader-progress-track">
            <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Checkpoint text */}
          <div className="loader-footer-row">
            <div className="loader-status-text">
              <span className="loader-pulse-dot" />
              <span>{statusText}</span>
            </div>
            <span className="loader-meta-stamp">5.0s BOOT SEQUENCE • NEW DELHI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
