import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationBarProps {
  onOpenPhoneCall: () => void;
  onOpenSayHi?: () => void;
  onReplayIntro?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onOpenPhoneCall,
  onOpenSayHi,
  onReplayIntro,
}) => {
  const location = useLocation();

  return (
    <header className="site-nav-header">
      <div className="nav-container">
        {/* Left: Brand Identity */}
        <Link to="/" className="nav-brand">
          <span className="brand-dot" />
          <span className="brand-name">SAHIL RATHEE</span>
          <span className="brand-role">// ARCHITECT // 2002</span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Work
          </Link>
          <Link to="/playground" className={`nav-link ${location.pathname === '/playground' ? 'active' : ''}`}>
            Playground ⚡
          </Link>
          <a href="/#topology" className="nav-link">
            Topology
          </a>
          {onOpenSayHi && (
            <button type="button" className="nav-link-btn" onClick={onOpenSayHi}>
              Come Say Hi 👋
            </button>
          )}
        </nav>

        {/* Right: Direct Actions */}
        <div className="nav-actions">
          {onReplayIntro && (
            <button
              type="button"
              className="nav-action-btn secondary intro-replay-btn"
              onClick={onReplayIntro}
              title="Replay 5s Entry Loading Animation"
            >
              ↺ Intro
            </button>
          )}
          {onOpenSayHi && (
            <button
              type="button"
              className="nav-action-btn secondary mobile-visible"
              onClick={onOpenSayHi}
            >
              👋 Say Hi
            </button>
          )}
          <a
            href="/Sahil-Rathee-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-action-btn secondary"
          >
            ⬇ Resume
          </a>
          <button
            type="button"
            className="nav-action-btn primary"
            onClick={onOpenPhoneCall}
          >
            📞 Call Sahil
          </button>
        </div>
      </div>
    </header>
  );
};
