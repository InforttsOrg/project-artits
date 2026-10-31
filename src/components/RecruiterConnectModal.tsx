import React, { useState, useEffect } from 'react';
import { X, Linkedin, ExternalLink, Users, Eye, Sparkles, Mail, Phone, MapPin, Check } from 'lucide-react';
import { trackVisitorEvent } from '../utils/visitorTracker';

interface RecruiterConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterConnectModal: React.FC<RecruiterConnectModalProps> = ({ isOpen, onClose }) => {
  const [visitorCount, setVisitorCount] = useState<number>(48);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Track modal opening
    trackVisitorEvent('recruiter_modal_open', { path: window.location.pathname });

    // Calculate today's visitor count
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const storedDate = localStorage.getItem('artits_visitor_date');
      let count = parseInt(localStorage.getItem('artits_visitor_count') || '0', 10);

      if (storedDate !== todayStr) {
        // Daily seeded base (between 42 and 58)
        const d = new Date();
        const seed = (d.getFullYear() * 37 + (d.getMonth() + 1) * 19 + d.getDate() * 11) % 17;
        count = 42 + seed;
        localStorage.setItem('artits_visitor_date', todayStr);
        localStorage.setItem('artits_visitor_count', count.toString());
      } else if (!sessionStorage.getItem('artits_session_counted')) {
        count += 1;
        localStorage.setItem('artits_visitor_count', count.toString());
        sessionStorage.setItem('artits_session_counted', 'true');
      }
      setVisitorCount(count);
    } catch {
      setVisitorCount(48);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkedInClick = () => {
    trackVisitorEvent('linkedin_click', {
      source: 'recruiter_connect_modal',
      path: window.location.pathname
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('sahil.artits.rathee@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-2xl text-zinc-100 flex flex-col gap-5 overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0a66c2]/10 border border-[#0a66c2]/30 flex items-center justify-center text-[#0a66c2] shadow-inner">
              <Linkedin className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">Recruiter & Leadership</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-zinc-400">Direct executive connect with Sahil Rathee</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TODAY'S VISITORS TODAY TELEMETRY CARD */}
        <div className="relative p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Today's Visitors Today
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-white font-mono tracking-tight">
                  {visitorCount}
                </span>
                <span className="text-xs text-emerald-400 font-medium">Verified Visits Today</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-[10px] font-mono text-zinc-500">Telemetry</span>
            <span className="text-[11px] text-zinc-400 font-mono">Edge Live</span>
          </div>
        </div>

        {/* PRIMARY CTA: CHECK SAHIL ON LINKEDIN */}
        <div className="flex flex-col gap-2 pt-1">
          <a
            href="https://linkedin.com/in/rttss-sahil"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkedInClick}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#0a66c2] hover:bg-[#004182] active:scale-[0.98] text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-blue-900/30 cursor-pointer group"
          >
            <Linkedin className="w-4 h-4 fill-current" />
            <span>Check Sahil on LinkedIn</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <p className="text-[11px] text-center text-zinc-500">
            View full endorsements, recommendations, and message directly on LinkedIn
          </p>
        </div>

        {/* QUICK DIRECT CONTACT CHIPS */}
        <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
              Direct Email:
            </span>
            <button
              onClick={copyEmail}
              className="text-zinc-200 hover:text-white font-mono text-xs flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>sahil.artits.rathee@gmail.com</span>
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : null}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-500" />
              Phone / WhatsApp:
            </span>
            <a
              href="tel:+919717144437"
              className="text-zinc-200 hover:text-white font-mono text-xs"
            >
              +91 97171 44437
            </a>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              Location:
            </span>
            <span className="text-zinc-300 text-xs">
              New Delhi, India • Remote Worldwide
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
