import React, { useState, useEffect } from 'react';

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
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] w-[calc(100%-32px)] max-w-3xl transition-all duration-300"
    >
      <div
        className="px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 text-sm rounded-2xl border border-zinc-700/60 shadow-2xl backdrop-blur-md"
        style={{
          background: 'rgba(11, 15, 20, 0.94)',
          boxShadow: '0 20px 48px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        <p className="text-zinc-200 text-sm leading-relaxed font-normal m-0 flex-1">
          We use cookies to improve your experience and analyse site traffic. See our{' '}
          <a
            href="https://infortts.site/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors font-medium"
          >
            Privacy Policy
          </a>
          .
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={() => handleChoice('declined')}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-zinc-200 hover:text-white bg-[#141a21] hover:bg-[#1b232c] border border-zinc-700/80 text-sm font-semibold transition-all duration-150 cursor-pointer text-center active:scale-[0.98]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold transition-all duration-150 cursor-pointer text-center border-0 shadow-lg shadow-emerald-600/30 active:scale-[0.98]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
