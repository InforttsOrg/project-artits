import React, { useEffect, useRef } from 'react';

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  characterDistance?: number;
}

export const PhoneCallModal: React.FC<PhoneCallModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Play ringing sound on open
  useEffect(() => {
    if (!isOpen) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        // Two-tone telephone ring (440Hz + 480Hz)
        [440, 480].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Ring pattern: ring 0.4s, pause 0.2s, ring 0.4s
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.setValueAtTime(0.08, now + 0.4);
          gain.gain.setValueAtTime(0, now + 0.41);
          gain.gain.setValueAtTime(0.08, now + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 1.0);
        });
      }
    } catch {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="phone-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-modal-title"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="phone-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="phone-modal-header">
          <div className="phone-calling-indicator">
            <span className="phone-icon-pulse">📞</span>
            <div>
              <span className="calling-label">QUANTUM RELAY TERMINAL</span>
              <h3 id="phone-modal-title" className="calling-title">Direct Connection: Sahil Rathee</h3>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close terminal"
          >
            ✕
          </button>
        </div>

        <div className="phone-modal-body">
          <p className="phone-intro-text">
            You successfully navigated across the gravitational fields to the quantum phone booth! 
            Connect with Sahil directly for Senior & Staff engineering discussions, AI architecture, or full-time roles:
          </p>

          <div className="call-actions-grid">
            {/* Direct Phone Call */}
            <a 
              href="tel:+919625213480" 
              className="call-action-card highlight"
              aria-label="Direct Phone Call to +91 9625213480"
            >
              <div className="call-icon-box">📱</div>
              <div className="call-details">
                <span className="call-sub">Direct Voice & WhatsApp</span>
                <span className="call-main">+91 9625213480</span>
              </div>
              <span className="action-hint">Dial ↗</span>
            </a>

            {/* Google Calendar / Meet Scheduling */}
            <a 
              href="mailto:contact@infortts.site?subject=Scheduling%20an%20Engineering%20Discussion%20with%20Sahil%20Rathee&body=Hi%20Sahil%2C%0A%0AI%20explored%20your%20interactive%20systems%20portfolio%20and%20would%20like%20to%20schedule%20a%20call%20regarding%20a%20Senior%2FStaff%20Software%20Engineering%20role.%0A%0ABest%20regards%2C"
              className="call-action-card"
              aria-label="Email or Schedule Meeting"
            >
              <div className="call-icon-box">📅</div>
              <div className="call-details">
                <span className="call-sub">Instant Dispatch</span>
                <span className="call-main">Schedule Calendar Meeting</span>
              </div>
              <span className="action-hint">Email ↗</span>
            </a>

            {/* LinkedIn Connection */}
            <a 
              href="https://linkedin.com/in/rttss-sahil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="call-action-card"
              aria-label="LinkedIn Profile (opens in new tab)"
            >
              <div className="call-icon-box">💼</div>
              <div className="call-details">
                <span className="call-sub">Professional Network</span>
                <span className="call-main">LinkedIn: rttss-sahil</span>
              </div>
              <span className="action-hint">Connect ↗</span>
            </a>

            {/* X / Twitter */}
            <a 
              href="https://x.com/rttss_sahil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="call-action-card"
              aria-label="X / Twitter Profile (opens in new tab)"
            >
              <div className="call-icon-box">💬</div>
              <div className="call-details">
                <span className="call-sub">Direct Message</span>
                <span className="call-main">X: @rttss_sahil</span>
              </div>
              <span className="action-hint">DM ↗</span>
            </a>
          </div>
        </div>

        <div className="phone-modal-footer">
          <span className="terminal-status">
            <span className="dot-green" /> Terminal Active • Encrypted via Infortts Core
          </span>
          <button type="button" className="action-btn" onClick={onClose}>
            Back to Map [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
