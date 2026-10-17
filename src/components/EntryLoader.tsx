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
          handleFinish();
        }, 350);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [handleFinish]);

  // Seam position: starts around 36% and pushes toward 88% as progress reaches 100%
  const seamPercent = 36 + (progress / 100) * 52;
  // Straining bobbing motion
  const strainY = Math.sin((progress / 100) * Math.PI * 18) * 3;

  return (
    <div
      className={`entry-loader-stage ${isDismissing ? 'dismiss' : ''}`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      onClick={handleFinish}
      title="Click anywhere or press Enter to skip"
    >
      {/* Split Stage: Left Light Panel with Huy ML-inspired Bold Red Typography */}
      <div
        className="loader-left-panel"
        style={{ width: `${seamPercent}%` }}
      >
        <div className="loader-left-inner">
          <div className="loader-brand-serif">
            <span className="serif-word">SAHIL</span>
            <span className="serif-word">RATHEE</span>
          </div>
          <div className="loader-architect-tag">
            <span>ARCHITECT &bull; BORN 2002 &bull; INFORTTS INC.</span>
          </div>
        </div>
      </div>

      {/* Split Stage: Right Dark Curtain that gets pushed away */}
      <div
        className="loader-right-curtain"
        style={{ left: `${seamPercent}%` }}
      >
        <div className="curtain-edge-shadow" />
      </div>

      {/* Pushing Character: Attached directly to the seam, hands pushing against the dark door */}
      <div
        className="loader-pusher-anchor"
        style={{
          left: `${seamPercent}%`,
          transform: `translate(-98%, -50%) translateY(${strainY}px)`,
        }}
      >
        <img
          src="/assets/pushing-character-transparent.png"
          alt="Pushing Character"
          className="pushing-character-img"
        />
        {/* Effort indicator */}
        <div className="push-effort-spark">
          <span>💦</span>
        </div>
      </div>

      {/* Bottom HUD Telemetry & Progress Control */}
      <div className="loader-hud-dock" onClick={(e) => e.stopPropagation()}>
        <div className="hud-top-meta">
          <div className="hud-telemetry-badge">
            <span className="live-indicator-dot" />
            <span className="hud-text-mono">{statusText}</span>
          </div>
          <button
            type="button"
            className="hud-skip-btn"
            onClick={handleFinish}
          >
            SKIP [ENTER] ↗
          </button>
        </div>

        {/* Big Counter & Bar */}
        <div className="hud-progress-row">
          <div className="hud-counter">
            <span className="counter-val">{progress < 10 ? `0${progress}` : progress}</span>
            <span className="counter-unit">%</span>
          </div>
          <div className="hud-track-bar">
            <div className="hud-track-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="hud-bottom-meta">
          <span className="hud-foot-note">5.0s ARCHITECTURAL BOOT SEQUENCE // NEW DELHI // 2002</span>
          <span className="hud-foot-note">CLICK ANYWHERE TO REVEAL</span>
        </div>
      </div>
    </div>
  );
};
