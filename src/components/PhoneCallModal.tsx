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
              <span className="calling-label">DIRECT CONTACT</span>
              <h3 id="phone-modal-title" className="calling-title">Direct Connection: Sahil Rathee</h3>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="phone-modal-body">
          <p className="phone-intro-text">
            Connect directly with Sahil Rathee regarding Senior Software Engineer roles, distributed backend architecture, or technical collaboration:
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

            {/* Email / Meet Scheduling */}
            <a 
              href="mailto:sahil.artits.rathee@gmail.com?subject=Scheduling%20an%20Engineering%20Discussion%20with%20Sahil%20Rathee&body=Hi%20Sahil%2C%0A%0AI%20explored%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20a%20Senior%20Software%20Engineering%20opportunity.%0A%0ABest%20regards%2C"
              className="call-action-card"
              aria-label="Email Sahil Rathee"
            >
              <div className="call-icon-box">✉️</div>
              <div className="call-details">
                <span className="call-sub">Direct Email</span>
                <span className="call-main">sahil.artits.rathee@gmail.com</span>
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
            <span className="dot-green" /> Open for Senior Software Engineer Roles • New Delhi, India
          </span>
          <button type="button" className="action-btn" onClick={onClose}>
            Close [Esc]
          </button>
        </div>
      </div>
    </div>
  );
};
