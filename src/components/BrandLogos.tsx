import React from 'react';

interface LogoProps {
  className?: string;
}

export const GitHubLogo: React.FC<LogoProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const LinkedInLogo: React.FC<LogoProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

export const XLogo: React.FC<LogoProps> = ({ className = 'w-4.5 h-4.5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const LeetCodeLogo: React.FC<LogoProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.821 5.834 5.834 0 0 0 3.236-.454l4.132-2.383a1.377 1.377 0 1 0-1.376-2.383l-4.13 2.383a3.1 3.1 0 0 1-1.72.242 3.18 3.18 0 0 1-2.573-2.045 3.09 3.09 0 0 1-.188-.544 3.032 3.032 0 0 1-.035-1.26 2.94 2.94 0 0 1 .672-1.144l3.855-4.127 5.405-5.788A1.361 1.361 0 0 0 13.483 0z"
      fill="#FFA116"
    />
    <path
      d="M9.865 10.925a1.415 1.415 0 0 0-1.414 1.414 1.414 1.414 0 0 0 1.414 1.414h9.13a1.415 1.415 0 0 0 1.415-1.414 1.415 1.415 0 0 0-1.415-1.414h-9.13z"
      fill="#E7A41E"
    />
    <path
      d="M16.483 14.869a1.374 1.374 0 0 0-.961.438l-4.225 4.526a1.377 1.377 0 0 0 2.012 1.879l4.225-4.526a1.374 1.374 0 0 0-.051-1.879 1.36 1.36 0 0 0-1-.438z"
      fill="#8A8A8E"
    />
  </svg>
);

export const StackOverflowLogo: React.FC<LogoProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M18.986 21.865v-6.404h2.134V24H2.88v-8.539h2.134v6.404h13.972z"
      fill="#BCBBBB"
    />
    <path
      d="M7.172 17.592l10.024.004v2.134H7.172v-2.138zm.415-4.258l9.844 1.944.417-2.093-9.844-1.944-.417 2.093zm1.644-4.148l9.094 4.316.924-1.933-9.094-4.316-.924 1.933zm3.432-3.829l7.747 6.44 1.375-1.644-7.747-6.44-1.375 1.644zm5.836-4.357l-1.733 1.258 6.012 8.083 1.733-1.258-6.012-8.083z"
      fill="#F48024"
    />
  </svg>
);

export const InstagramLogo: React.FC<LogoProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const NaiBookingLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M16 110V68C16 44.8 34.8 26 58 26C81.2 26 100 44.8 100 68V110"
      stroke="currentColor"
      strokeWidth="18"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="130" cy="82" r="28" stroke="currentColor" strokeWidth="16" fill="none" />
    <path d="M158 82V110" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
    <path d="M176 26L190 26L190 40L183 36L176 40Z" fill="currentColor" />
    <rect x="177" y="50" width="12" height="60" rx="6" fill="currentColor" />
    <text
      x="100"
      y="150"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
      fontSize="18"
      fontWeight="700"
      letterSpacing="6"
      fill="currentColor"
    >
      BOOKING
    </text>
  </svg>
);

export const OrealfitLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M24 6L38 14V34L24 42L10 34V14L24 6Z"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path
      d="M18 20L24 16L30 20V28L24 32L18 28V20Z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path d="M24 16V32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const QuantTradingLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <line x1="14" y1="8" x2="14" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4" />
    <rect x="10" y="16" width="8" height="16" rx="2" fill="currentColor" />
    <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4" />
    <rect x="20" y="12" width="8" height="22" rx="2" fill="currentColor" />
    <line x1="34" y1="10" x2="34" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.4" />
    <rect x="30" y="18" width="8" height="12" rx="2" fill="currentColor" />
  </svg>
);

export const AIAgentLogo: React.FC<LogoProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="3" />
    <circle cx="10" cy="14" r="4" fill="currentColor" />
    <circle cx="38" cy="14" r="4" fill="currentColor" />
    <circle cx="10" cy="34" r="4" fill="currentColor" />
    <circle cx="38" cy="34" r="4" fill="currentColor" />
    <line x1="13.5" y1="16.5" x2="18.5" y2="20.5" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="34.5" y1="16.5" x2="29.5" y2="20.5" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="13.5" y1="31.5" x2="18.5" y2="27.5" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="34.5" y1="31.5" x2="29.5" y2="27.5" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);
