import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage access gracefully handled
    }
  }, []);

  const handleChoice = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem('cookie_consent', choice);
      if (choice === 'accepted') {
        // Trigger Method C: Official LinkedIn Insight Tag
        (window as any).initializeLinkedInInsightTag?.();
      }

      // Dispatch event to Cloudflare Serverless Tracker
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'cookie_consent',
          consentChoice: choice,
          path: window.location.pathname,
          ref: new URLSearchParams(window.location.search).get('ref') || new URLSearchParams(window.location.search).get('utm_source'),
          screen: `${window.innerWidth}x${window.innerHeight}`,
          referrer: document.referrer || 'Direct'
        })
      }).catch(() => {});
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-[99999] w-full border-t border-zinc-800 bg-zinc-950/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl transition-all duration-300 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 text-sm">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal m-0">
            We use cookies to improve your experience and analyse site traffic. See our{' '}
            <a
              href="https://infortts.site/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors font-medium"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={() => handleChoice('declined')}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-100 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer text-center active:scale-[0.98]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="flex-1 sm:flex-initial px-5 py-2 rounded-xl text-zinc-950 bg-white hover:bg-zinc-100 text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer text-center border-0 shadow-md shadow-white/10 active:scale-[0.98]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
