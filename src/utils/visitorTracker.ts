// Client-side visitor telemetry & recruiter tracking utility

export interface RecruiterIntroductionPayload {
  recruiterName: string;
  recruiterOrg: string;
  linkedinUrl: string;
  notes?: string;
}

export const trackVisitorEvent = async (event: string, payload: Record<string, any> = {}) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref') || urlParams.get('utm_source') || urlParams.get('token');

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        ref: ref || undefined,
        path: window.location.pathname,
        referrer: document.referrer || undefined,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        ...payload
      })
    });
  } catch (err) {
    // Graceful silent fallback
  }
};

export const submitRecruiterIntroduction = async (payload: RecruiterIntroductionPayload) => {
  return trackVisitorEvent('linkedin_introduction', payload);
};

export const getTodayVisitorCount = (): number => {
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
    return count || 51;
  } catch {
    return 51;
  }
};
