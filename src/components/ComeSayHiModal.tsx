import React, { useState } from 'react';

interface ComeSayHiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPhoneCall: () => void;
}

export const ComeSayHiModal: React.FC<ComeSayHiModalProps> = ({
  isOpen,
  onClose,
  onOpenPhoneCall,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const email = 'sahil.artits.rathee@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="say-hi-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="say-hi-card-slideup" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="say-hi-header">
          <h2 className="say-hi-title">COME SAY HI</h2>
          <button type="button" className="say-hi-close-btn" onClick={onClose} aria-label="Close dialog">
            Close ✕
          </button>
        </div>

        {/* Sections */}
        <div className="say-hi-body">
          {/* Email row */}
          <div className="say-hi-group">
            <span className="say-hi-label">Drop me a line</span>
            <div className="say-hi-email-row">
              <a href={`mailto:${email}`} className="say-hi-email-link">
                {email}
              </a>
              <button type="button" className="say-hi-copy-btn" onClick={handleCopy}>
                {copied ? '✓ Copied' : 'Copy ❐'}
              </button>
            </div>
          </div>

          {/* Direct Phone */}
          <div className="say-hi-group">
            <span className="say-hi-label">Direct connection & consultation</span>
            <div className="say-hi-phones-row">
              <button
                type="button"
                className="say-hi-phone-trigger"
                onClick={() => {
                  onClose();
                  onOpenPhoneCall();
                }}
              >
                📞 Call Primary (+91 9625213480)
              </button>
              <a href="tel:+919992396866" className="say-hi-phone-trigger secondary">
                📱 Meta Direct (+91 9992396866)
              </a>
            </div>
          </div>

          {/* Official Organizations & Companies */}
          <div className="say-hi-group">
            <span className="say-hi-label">Commercial Organizations & Portfolios</span>
            <div className="say-hi-links-list">
              <a href="https://www.linkedin.com/company/infortts-inc/" target="_blank" rel="noopener noreferrer">
                🌐 Infortts Inc. (LinkedIn) ↗
              </a>
              <a href="https://www.linkedin.com/company/bighitsports/" target="_blank" rel="noopener noreferrer">
                ⚽ BigHit Sports (LinkedIn) ↗
              </a>
              <a href="https://www.linkedin.com/company/gym-wise/" target="_blank" rel="noopener noreferrer">
                🏋️ Gym Wise India (LinkedIn) ↗
              </a>
            </div>
          </div>

          {/* Code & Repos */}
          <div className="say-hi-group">
            <span className="say-hi-label">Explore production code & swarms</span>
            <div className="say-hi-links-list">
              <a href="https://github.com/InforttsOrg" target="_blank" rel="noopener noreferrer">
                🐙 InforttsOrg GitHub
              </a>
              <a href="https://github.com/rttss-sahil" target="_blank" rel="noopener noreferrer">
                💻 Sahil Rathee Personal GitHub
              </a>
            </div>
          </div>

          {/* Socials & Professional */}
          <div className="say-hi-group">
            <span className="say-hi-label">Professional Profiles & Resume</span>
            <div className="say-hi-links-list">
              <a href="https://linkedin.com/in/rttss-sahil" target="_blank" rel="noopener noreferrer">
                💼 Sahil Rathee LinkedIn Profile
              </a>
              <a href="/Sahil-Rathee-Resume.pdf" target="_blank" rel="noopener noreferrer">
                ⬇ Download Resume PDF
              </a>
            </div>
          </div>
        </div>

        {/* Footer stamp */}
        <div className="say-hi-footer">
          <span>NEW DELHI, INDIA • BORN 2002 • OPEN TO SENIOR SOFTWARE ENGINEER ROLES</span>
        </div>
      </div>
    </div>
  );
};
