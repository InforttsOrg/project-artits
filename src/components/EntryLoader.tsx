import React, { useState, useEffect } from 'react';

interface EntryLoaderProps {
  onComplete: () => void;
}

export const EntryLoader: React.FC<EntryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('INITIALIZING ARCHITECTURAL RUNTIME');
  const [isDismissing, setIsDismissing] = useState<boolean>(false);

  useEffect(() => {
    // Fast, smooth counter sequence 0 -> 100% in ~1.2s
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 3;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setStatusText('INFORTTS CLUSTER SYNCHRONIZED • SYSTEM ONLINE');
        setTimeout(() => {
          setIsDismissing(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 300);
      } else {
        setProgress(current);
        if (current < 30) {
          setStatusText('[01/04] INITIALIZING ARCHITECTURAL RUNTIME');
        } else if (current < 60) {
          setStatusText('[02/04] SYNCING DISTRIBUTED TELEMETRY FEEDS');
        } else if (current < 88) {
          setStatusText('[03/04] VERIFYING AUTONOMOUS AGENT SWARMS');
        } else {
          setStatusText('[04/04] COMPILING TOPOLOGY GRAPH');
        }
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsDismissing(true);
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <div className={`entry-loader-overlay ${isDismissing ? 'dismiss' : ''}`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
      <div className="loader-inner-container">
        {/* Top telemetry indicator */}
        <div className="loader-header-row">
          <span className="loader-brand-tag">SAHIL RATHEE // ARCHITECT</span>
          <button type="button" className="loader-skip-btn" onClick={handleSkip}>
            SKIP [ENTER] ↗
          </button>
        </div>

        {/* Massive Huyml-style counter number */}
        <div className="loader-counter-wrapper">
          <span className="loader-counter-number">
            {progress < 10 ? `0${progress}` : progress}
          </span>
          <span className="loader-counter-symbol">%</span>
        </div>

        {/* Progress track */}
        <div className="loader-progress-track">
          <div className="loader-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Status checkpoints */}
        <div className="loader-footer-row">
          <div className="loader-status-text">
            <span className="loader-pulse-dot" />
            <span>{statusText}</span>
          </div>
          <span className="loader-meta-stamp">NEW DELHI • LATENCY &lt;0.8ms</span>
        </div>
      </div>
    </div>
  );
};
