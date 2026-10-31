import React from 'react';

interface TechSkillBadgeProps {
  name: string;
}

export const TechSkillBadge: React.FC<TechSkillBadgeProps> = ({ name }) => {
  const norm = name.trim().toLowerCase();

  // Return specific authentic brand logo SVG and colors
  const getBrandDetails = (): { icon: React.ReactNode; color: string; bg: string; border: string } => {
    // 1. Angular
    if (norm.includes('angular')) {
      return {
        color: '#DD0031',
        bg: 'rgba(221, 0, 49, 0.08)',
        border: 'rgba(221, 0, 49, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.5L2.5 5.86 3.96 17.5 12 21.5l8.04-4L21.5 5.86 12 2.5zm0 2.45l6.32 2.24-1.07 9.09L12 18.7l-5.25-2.42-1.07-9.09L12 4.95zm0 3.05l-3.2 7.15h1.47l.65-1.63h2.16l.65 1.63h1.47L12 8zm0 2.22l.74 1.85h-1.48l.74-1.85z" />
          </svg>
        )
      };
    }

    // 2. React Native
    if (norm.includes('react native')) {
      return {
        color: '#61DAFB',
        bg: 'rgba(97, 218, 251, 0.08)',
        border: 'rgba(97, 218, 251, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          </svg>
        )
      };
    }

    // 3. React
    if (norm.includes('react')) {
      return {
        color: '#61DAFB',
        bg: 'rgba(97, 218, 251, 0.08)',
        border: 'rgba(97, 218, 251, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          </svg>
        )
      };
    }

    // 4. Node.js
    if (norm.includes('node')) {
      return {
        color: '#5FA04E',
        bg: 'rgba(95, 160, 78, 0.08)',
        border: 'rgba(95, 160, 78, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 10.125c-.27 0-.53-.08-.75-.24L7.5 7.15a1.44 1.44 0 0 1-.65-1.22V3.75c0-.49.25-.94.65-1.22l3.75-2.73c.44-.32 1.06-.32 1.5 0l3.75 2.73c.4.28.65.73.65 1.22v2.18c0 .5-.25.95-.65 1.22l-3.75 2.74c-.22.15-.48.24-.75.24zm0-8.25L9.38 3.75 12 5.66l2.63-1.91L12 1.875zM12 24c-.27 0-.53-.08-.75-.24l-8.5-6.19a1.44 1.44 0 0 1-.65-1.22v-9.7c0-.49.25-.94.65-1.22l3.75-2.73a1.44 1.44 0 0 1 1.5 0l3.75 2.73c.4.28.65.73.65 1.22v2.18c0 .5-.25.95-.65 1.22L8.25 12.8v3.42l3.75 2.73 3.75-2.73V12.8l-3.5-2.55.9-1.24 3.75 2.73c.4.28.65.73.65 1.22v3.7a1.44 1.44 0 0 1-.65 1.22l-8.5 6.19c-.22.15-.48.24-.75.24z" />
          </svg>
        )
      };
    }

    // 5. RabbitMQ
    if (norm.includes('rabbitmq')) {
      return {
        color: '#FF6600',
        bg: 'rgba(255, 102, 0, 0.08)',
        border: 'rgba(255, 102, 0, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.5 15.5c-.3 0-.6-.1-.8-.3l-3.2-3.2c-.4-.4-.4-1.1 0-1.5l3.2-3.2c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5l-2.4 2.4 2.4 2.4c.4.4.4 1.1 0 1.5-.2.3-.5.4-.7.4zm-14.8-1c-.5 0-1-.3-1.3-.7L4.1 9.9c-.3-.5-.3-1.1 0-1.6l2.3-3.9c.3-.5.8-.7 1.3-.7h4.6c.5 0 1 .3 1.3.7l2.3 3.9c.3.5.3 1.1 0 1.6l-2.3 3.9c-.3.5-.8.7-1.3.7H7.7zm2.3-9.5L8.5 7.7l1.5 2.7 1.5-2.7L10 5z" />
          </svg>
        )
      };
    }

    // 6. Redis
    if (norm.includes('redis')) {
      return {
        color: '#DC382D',
        bg: 'rgba(220, 56, 45, 0.08)',
        border: 'rgba(220, 56, 45, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.08 12.08l-8.58 4.96a2.98 2.98 0 0 1-3 0L1.92 12.08a1.5 1.5 0 0 1 0-2.6l8.58-4.96a2.98 2.98 0 0 1 3 0l8.58 4.96a1.5 1.5 0 0 1 0 2.6z" />
            <path d="M1.92 14.58l8.58 4.96a2.98 2.98 0 0 0 3 0l8.58-4.96a1.5 1.5 0 0 1 .75 1.3 1.5 1.5 0 0 1-.75 1.3l-8.58 4.96a2.98 2.98 0 0 1-3 0L1.92 22.18a1.5 1.5 0 0 1-.75-1.3 1.5 1.5 0 0 1 .75-1.3z" opacity="0.6" />
          </svg>
        )
      };
    }

    // 7. Postman
    if (norm.includes('postman')) {
      return {
        color: '#FF6C37',
        bg: 'rgba(255, 108, 55, 0.08)',
        border: 'rgba(255, 108, 55, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="#FF6C37" />
            <path d="M16.5 8.2c-.3-.4-.8-.6-1.3-.6H9.2c-.5 0-1 .2-1.3.6L5.3 12l2.6 3.8c.3.4.8.6 1.3.6h6c.5 0 1-.2 1.3-.6l2.6-3.8-2.6-3.8zm-1.8 4.3h-4.4v-1h4.4v1z" fill="#FFF" />
          </svg>
        )
      };
    }

    // 8. k3s
    if (norm.includes('k3s')) {
      return {
        color: '#C85B28',
        bg: 'rgba(200, 91, 40, 0.08)',
        border: 'rgba(200, 91, 40, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M7 8h10M7 12h7M7 16h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      };
    }

    // 9. Kubernetes / k8s / k8
    if (norm.includes('kubernetes') || norm.includes('k8s') || norm === 'k8') {
      return {
        color: '#326CE5',
        bg: 'rgba(50, 108, 229, 0.08)',
        border: 'rgba(50, 108, 229, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.96 0L1.77 5.88v12.24L11.96 24l10.27-5.88V5.88L11.96 0zm0 2.35l7.98 4.57v8.94l-7.98 4.57-7.98-4.57V6.92l7.98-4.57zm-.14 4.14a5.51 5.51 0 1 0 0 11.02 5.51 5.51 0 0 0 0-11.02zm0 1.96a3.55 3.55 0 1 1 0 7.1 3.55 3.55 0 0 1 0-7.1z" />
          </svg>
        )
      };
    }

    // 10. Docker
    if (norm.includes('docker')) {
      return {
        color: '#2496ED',
        bg: 'rgba(36, 150, 237, 0.08)',
        border: 'rgba(36, 150, 237, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M23.76 9.89c-.365-2.03-1.62-3.23-2.98-3.23-.27 0-.53.05-.77.14-.64-1.35-1.92-2.1-3.37-2.1H.88C.39 4.7 0 5.1 0 5.58v11.75c0 3.7 3.01 6.67 6.72 6.67h10.56c3.71 0 6.72-2.97 6.72-6.67 0-.53-.06-1.05-.18-1.55.97-.8 1.48-1.84 1.48-2.95 0-.96-.4-2.06-1.54-2.94z" />
          </svg>
        )
      };
    }

    // 11. Flutter / Dart
    if (norm.includes('flutter') || norm.includes('dart')) {
      return {
        color: '#02569B',
        bg: 'rgba(2, 86, 155, 0.08)',
        border: 'rgba(2, 86, 155, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM14.28 10.82l-5.7 5.7L12.3 20.2l5.7-5.7-3.72-3.68zm7.4 3.7l-3.7 3.7 3.7 3.7 3.72-3.7-3.72-3.7z" />
          </svg>
        )
      };
    }

    // 12. Go / Golang
    if (norm.includes('go') || norm.includes('golang')) {
      return {
        color: '#00ADD8',
        bg: 'rgba(0, 173, 216, 0.08)',
        border: 'rgba(0, 173, 216, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.811 10.231c.147-.563.456-.849.927-.858.468-.009 1.139.296 2.012.915.222.158.411.31.567.456.096.09.16.14.193.151.107-.156.289-.481.546-.976.386-.743.834-1.399 1.345-1.968.511-.569 1.056-.99 1.636-1.264.579-.273 1.157-.367 1.733-.281.576.086 1.085.344 1.527.773.442.43.714.977.816 1.642.102.665.006 1.408-.288 2.229-.294.821-.735 1.685-1.323 2.593-.588.908-1.272 1.8-2.052 2.676-.78.876-1.583 1.635-2.409 2.277-.826.642-1.589 1.042-2.289 1.2-.7.158-1.268.046-1.704-.336-.436-.382-.647-.946-.633-1.692.014-.746.257-1.62.729-2.622.472-1.002 1.111-2.03 1.917-3.084.806-1.054 1.691-2.001 2.655-2.841-.301-.215-.658-.337-1.071-.366-.413-.029-.86.046-1.341.225-.481.179-.968.463-1.461.852-.493.389-.961.868-1.404 1.437-.193-.309-.321-.575-.384-.798z" />
          </svg>
        )
      };
    }

    // 13. PHP / Laravel
    if (norm.includes('php') || norm.includes('laravel')) {
      return {
        color: '#FF2D20',
        bg: 'rgba(255, 45, 32, 0.08)',
        border: 'rgba(255, 45, 32, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.633 6.136L12.72.032a1.44 1.44 0 0 0-1.44 0L.367 6.136a1.44 1.44 0 0 0-.73 1.248v12.232c0 .52.277.999.73 1.248l10.913 6.104a1.44 1.44 0 0 0 1.44 0l10.913-6.104a1.44 1.44 0 0 0 .73-1.248V7.384a1.44 1.44 0 0 0-.73-1.248zM12 2.448l9.143 5.111-3.642 2.038-9.143-5.11 3.642-2.039zm-1.08 18.665l-9.143-5.11V7.892l9.143 5.111v8.11zm2.16 0v-8.11l9.143-5.111v8.111l-9.143 5.11z" />
          </svg>
        )
      };
    }

    // 14. AWS DynamoDB
    if (norm.includes('dynamodb')) {
      return {
        color: '#4053D6',
        bg: 'rgba(64, 83, 214, 0.08)',
        border: 'rgba(64, 83, 214, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="8" height="8" rx="1.5" />
            <rect x="13" y="3" width="8" height="8" rx="1.5" />
            <rect x="3" y="13" width="8" height="8" rx="1.5" />
            <rect x="13" y="13" width="8" height="8" rx="1.5" />
          </svg>
        )
      };
    }

    // 15. GraphDB / Neptune
    if (norm.includes('graphdb') || norm.includes('neptune')) {
      return {
        color: '#27711C',
        bg: 'rgba(39, 113, 28, 0.08)',
        border: 'rgba(39, 113, 28, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="8" r="3" />
            <circle cx="12" cy="18" r="3" />
            <line x1="8.5" y1="7" x2="15.5" y2="7.5" />
            <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" />
            <line x1="16.5" y1="10.5" x2="13.5" y2="15.5" />
          </svg>
        )
      };
    }

    // 16. AWS CodePipeline
    if (norm.includes('codepipeline') || norm.includes('pipeline')) {
      return {
        color: '#8C4FFF',
        bg: 'rgba(140, 79, 255, 0.08)',
        border: 'rgba(140, 79, 255, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="6" width="6" height="12" rx="2" />
            <rect x="16" y="6" width="6" height="12" rx="2" />
            <path d="M8 12h8m-3-3l3 3-3 3" />
          </svg>
        )
      };
    }

    // 17. AWS Serverless / Amazon Serverless / AWS
    if (norm.includes('serverless') || norm.includes('aws')) {
      return {
        color: '#FF9900',
        bg: 'rgba(255, 153, 0, 0.08)',
        border: 'rgba(255, 153, 0, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.784 15.184c-.382-.26-.88-.415-1.393-.415-.815 0-1.54.407-1.92.99l-1.07-1.07c.69-.99 1.79-1.63 3.06-1.63.83 0 1.63.29 2.27.79l1.42-1.42V17h-4.57l1.62-1.63-.42-.18zM6.3 11.23c-.7 0-1.3.26-1.74.72-.45.45-.7 1.07-.7 1.76 0 .68.25 1.29.7 1.74.45.45 1.05.7 1.74.7.7 0 1.3-.25 1.74-.7.45-.45.7-1.06.7-1.74 0-.69-.25-1.31-.7-1.76-.44-.46-1.04-.72-1.74-.72zm15.7 6.42c-2.3 2.1-5.6 3.35-9.2 3.35-4.8 0-8.9-2.2-11.4-5.6-.4-.5-.2-1.2.3-1.5.5-.4 1.2-.2 1.5.3 2.1 2.9 5.6 4.7 9.6 4.7 3.1 0 6-1.1 8-2.9.4-.4 1.1-.3 1.5.1.4.5.3 1.2-.3 1.55z" />
          </svg>
        )
      };
    }

    // 18. Distributed Systems / Microservices
    if (norm.includes('distributed') || norm.includes('microservice')) {
      return {
        color: '#10B981',
        bg: 'rgba(16, 185, 129, 0.08)',
        border: 'rgba(16, 185, 129, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <circle cx="4" cy="6" r="2" />
            <circle cx="20" cy="6" r="2" />
            <circle cx="4" cy="18" r="2" />
            <circle cx="20" cy="18" r="2" />
            <path d="M6 7l4 3.5m4 3l4 3.5m-8-6.5l4-3.5m-8 6.5l4 3.5" />
          </svg>
        )
      };
    }

    // 19. TypeScript
    if (norm.includes('typescript')) {
      return {
        color: '#3178C6',
        bg: 'rgba(49, 120, 198, 0.08)',
        border: 'rgba(49, 120, 198, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12.75 14.85h-2.1v6.3h-2.4v-6.3h-2.1v-2.1h6.6v2.1zm8.7 1.8c0 2.85-2.1 4.5-5.1 4.5-1.8 0-3.3-.6-4.2-1.5l1.35-1.95c.75.6 1.8 1.05 2.85 1.05 1.5 0 2.4-.75 2.4-1.8 0-1.05-.75-1.65-2.25-2.25-2.25-.9-3.45-2.1-3.45-3.9 0-2.55 1.95-4.2 4.65-4.2 1.65 0 2.85.45 3.75 1.2l-1.35 1.95c-.6-.45-1.5-.75-2.4-.75-1.35 0-2.1.75-2.1 1.65 0 .9.75 1.5 2.25 2.1 2.4.9 3.6 2.1 3.6 3.9z" />
          </svg>
        )
      };
    }

    // 20. Python
    if (norm.includes('python')) {
      return {
        color: '#3776AB',
        bg: 'rgba(55, 118, 171, 0.08)',
        border: 'rgba(55, 118, 171, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.914 0C5.825 0 6.2 2.656 6.2 2.656l.006 2.752h5.814v.826H3.94S0 5.767 0 11.884c0 6.116 3.44 5.922 3.44 5.922h2.053v-2.88c0-3.308 2.802-3.308 2.802-3.308h5.787s2.693.044 2.693-2.645V3.44S17.382 0 11.914 0zM8.738 1.83a1.031 1.031 0 1 1 0 2.063 1.031 1.031 0 0 1 0-2.062z" />
          </svg>
        )
      };
    }

    // 21. PostgreSQL
    if (norm.includes('postgres')) {
      return {
        color: '#336791',
        bg: 'rgba(51, 103, 145, 0.08)',
        border: 'rgba(51, 103, 145, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        )
      };
    }

    // 22. Next.js
    if (norm.includes('next')) {
      return {
        color: '#FFFFFF',
        bg: 'rgba(255, 255, 255, 0.08)',
        border: 'rgba(255, 255, 255, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M9 8v8m0 0l7-9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      };
    }

    // 23. Cloudflare Workers
    if (norm.includes('cloudflare')) {
      return {
        color: '#F38020',
        bg: 'rgba(243, 128, 32, 0.08)',
        border: 'rgba(243, 128, 32, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.42 10.43c-.45-.04-.89.04-1.3.22-.38-2.61-2.6-4.65-5.32-4.65-2.28 0-4.22 1.44-4.99 3.49-.39-.14-.81-.22-1.24-.22-1.92 0-3.48 1.56-3.48 3.48 0 .15.01.29.04.43C.88 13.56 0 14.92 0 16.5 0 18.98 2.02 21 4.5 21h13.92c3.08 0 5.58-2.5 5.58-5.58 0-2.82-2.1-5.14-4.87-5.5-.23-.04-.47-.07-.71-.07v.58z" />
          </svg>
        )
      };
    }

    // 24. C++
    if (norm.includes('c++')) {
      return {
        color: '#00599C',
        bg: 'rgba(0, 89, 156, 0.08)',
        border: 'rgba(0, 89, 156, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.25 10.75h-1.5V9.25a.75.75 0 0 0-1.5 0v1.5h-1.5a.75.75 0 0 0 0 1.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a.75.75 0 0 0 0-1.5zm-5 0h-1.5V9.25a.75.75 0 0 0-1.5 0v1.5h-1.5a.75.75 0 0 0 0 1.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a.75.75 0 0 0 0-1.5zM8.5 3C4.36 3 1 6.36 1 10.5S4.36 18 8.5 18c2.65 0 4.97-1.38 6.29-3.48a.75.75 0 1 0-1.28-.78C12.39 15.51 10.57 16.5 8.5 16.5 5.19 16.5 2.5 13.81 2.5 10.5S5.19 4.5 8.5 4.5c2.07 0 3.89.99 5.01 2.26a.75.75 0 0 0 1.28-.78C13.47 4.38 11.15 3 8.5 3z" />
          </svg>
        )
      };
    }

    // 25. NATS JetStream / Kafka
    if (norm.includes('nats') || norm.includes('kafka')) {
      return {
        color: '#27AAE1',
        bg: 'rgba(39, 170, 225, 0.08)',
        border: 'rgba(39, 170, 225, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 7.2v9.6L6 24V0L0 7.2zm9 0v9.6l6 7.2V0l-6 7.2zm9 0v9.6l6 7.2V0l-6 7.2z" />
          </svg>
        )
      };
    }

    // 26. Quant / Algorithmic Trading / HFT
    if (norm.includes('quant') || norm.includes('trading') || norm.includes('hft') || norm.includes('metatrader')) {
      return {
        color: '#10B981',
        bg: 'rgba(16, 185, 129, 0.08)',
        border: 'rgba(16, 185, 129, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="M19 9l-5 5-4-4-3 3" />
          </svg>
        )
      };
    }

    // 27. AI Agents / Multi-Agent / Swarms / AST / LLM
    if (norm.includes('agent') || norm.includes('swarm') || norm.includes('ast') || norm.includes('llm') || norm.includes('vector')) {
      return {
        color: '#A855F7',
        bg: 'rgba(168, 85, 247, 0.08)',
        border: 'rgba(168, 85, 247, 0.25)',
        icon: (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="18" r="3" />
            <path d="M9 6h6M6 9v6M18 9v6M9 18h6" />
          </svg>
        )
      };
    }

    // Default Fallback
    return {
      color: '#A1A1AA',
      bg: 'rgba(161, 161, 170, 0.06)',
      border: 'rgba(161, 161, 170, 0.2)',
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )
    };
  };

  const { icon, color, bg, border } = getBrandDetails();

  return (
    <span
      style={{ backgroundColor: bg, borderColor: border }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all duration-200 hover:scale-[1.03] select-none shadow-sm cursor-default"
    >
      <span style={{ color }} className="shrink-0 flex items-center justify-center">
        {icon}
      </span>
      <span className="text-zinc-200 font-medium">
        {name}
      </span>
    </span>
  );
};
