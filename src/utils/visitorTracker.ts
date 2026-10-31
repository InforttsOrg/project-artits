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
