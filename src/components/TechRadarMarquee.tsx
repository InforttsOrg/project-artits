import React from 'react';

interface TechItem {
  name: string;
  category: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
}

// Track 1: Core Runtimes & Languages (Left to Right)
const track1Languages: TechItem[] = [
  {
    name: 'Go',
    category: 'High-Concurrency Systems',
    color: '#00ADD8',
    bg: 'rgba(0, 173, 216, 0.08)',
    border: 'rgba(0, 173, 216, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.811 10.231c.147-.563.456-.849.927-.858.468-.009 1.139.296 2.012.915.222.158.411.31.567.456.096.09.16.14.193.151.107-.156.289-.481.546-.976.386-.743.834-1.399 1.345-1.968.511-.569 1.056-.99 1.636-1.264.579-.273 1.157-.367 1.733-.281.576.086 1.085.344 1.527.773.442.43.714.977.816 1.642.102.665.006 1.408-.288 2.229-.294.821-.735 1.685-1.323 2.593-.588.908-1.272 1.8-2.052 2.676-.78.876-1.583 1.635-2.409 2.277-.826.642-1.589 1.042-2.289 1.2-.7.158-1.268.046-1.704-.336-.436-.382-.647-.946-.633-1.692.014-.746.257-1.62.729-2.622.472-1.002 1.111-2.03 1.917-3.084.806-1.054 1.691-2.001 2.655-2.841-.301-.215-.658-.337-1.071-.366-.413-.029-.86.046-1.341.225-.481.179-.968.463-1.461.852-.493.389-.961.868-1.404 1.437-.193-.309-.321-.575-.384-.798z" />
      </svg>
    )
  },
  {
    name: 'Python',
    category: 'AI Runtimes & Quant',
    color: '#3776AB',
    bg: 'rgba(55, 118, 171, 0.08)',
    border: 'rgba(55, 118, 171, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.825 0 6.2 2.656 6.2 2.656l.006 2.752h5.814v.826H3.94S0 5.767 0 11.884c0 6.116 3.44 5.922 3.44 5.922h2.053v-2.88c0-3.308 2.802-3.308 2.802-3.308h5.787s2.693.044 2.693-2.645V3.44S17.382 0 11.914 0zM8.738 1.83a1.031 1.031 0 1 1 0 2.063 1.031 1.031 0 0 1 0-2.062z" />
        <path d="M12.086 24c6.089 0 5.714-2.656 5.714-2.656l-.006-2.752H11.98v-.826h8.08s3.94.467 3.94-5.65c0-6.117-3.44-5.923-3.44-5.923h-2.053v2.88c0 3.308-2.802 3.308-2.802 3.308H9.918s-2.693-.044-2.693 2.645v5.534S6.618 24 12.086 24zm3.176-1.83a1.031 1.031 0 1 1 0-2.063 1.031 1.031 0 0 1 0 2.062z" />
      </svg>
    )
  },
  {
    name: 'TypeScript',
    category: 'Type-Safe Applications',
    color: '#3178C6',
    bg: 'rgba(49, 120, 198, 0.08)',
    border: 'rgba(49, 120, 198, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12.75 14.85h-2.1v6.3h-2.4v-6.3h-2.1v-2.1h6.6v2.1zm8.7 1.8c0 2.85-2.1 4.5-5.1 4.5-1.8 0-3.3-.6-4.2-1.5l1.35-1.95c.75.6 1.8 1.05 2.85 1.05 1.5 0 2.4-.75 2.4-1.8 0-1.05-.75-1.65-2.25-2.25-2.25-.9-3.45-2.1-3.45-3.9 0-2.55 1.95-4.2 4.65-4.2 1.65 0 2.85.45 3.75 1.2l-1.35 1.95c-.6-.45-1.5-.75-2.4-.75-1.35 0-2.1.75-2.1 1.65 0 .9.75 1.5 2.25 2.1 2.4.9 3.6 2.1 3.6 3.9z" />
      </svg>
    )
  },
  {
    name: 'Node.js',
    category: 'Event-Driven Async Runtimes',
    color: '#5FA04E',
    bg: 'rgba(95, 160, 78, 0.08)',
    border: 'rgba(95, 160, 78, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.125c-.27 0-.53-.08-.75-.24L7.5 7.15a1.44 1.44 0 0 1-.65-1.22V3.75c0-.49.25-.94.65-1.22l3.75-2.73c.44-.32 1.06-.32 1.5 0l3.75 2.73c.4.28.65.73.65 1.22v2.18c0 .5-.25.95-.65 1.22l-3.75 2.74c-.22.15-.48.24-.75.24zm0-8.25L9.38 3.75 12 5.66l2.63-1.91L12 1.875zM12 24c-.27 0-.53-.08-.75-.24l-8.5-6.19a1.44 1.44 0 0 1-.65-1.22v-9.7c0-.49.25-.94.65-1.22l3.75-2.73a1.44 1.44 0 0 1 1.5 0l3.75 2.73c.4.28.65.73.65 1.22v2.18c0 .5-.25.95-.65 1.22L8.25 12.8v3.42l3.75 2.73 3.75-2.73V12.8l-3.5-2.55.9-1.24 3.75 2.73c.4.28.65.73.65 1.22v3.7a1.44 1.44 0 0 1-.65 1.22l-8.5 6.19c-.22.15-.48.24-.75.24z" />
      </svg>
    )
  },
  {
    name: 'C++',
    category: 'Sub-Millisecond Engine',
    color: '#00599C',
    bg: 'rgba(0, 89, 156, 0.08)',
    border: 'rgba(0, 89, 156, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.25 10.75h-1.5V9.25a.75.75 0 0 0-1.5 0v1.5h-1.5a.75.75 0 0 0 0 1.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a.75.75 0 0 0 0-1.5zm-5 0h-1.5V9.25a.75.75 0 0 0-1.5 0v1.5h-1.5a.75.75 0 0 0 0 1.5h1.5v1.5a.75.75 0 0 0 1.5 0v-1.5h1.5a.75.75 0 0 0 0-1.5zM8.5 3C4.36 3 1 6.36 1 10.5S4.36 18 8.5 18c2.65 0 4.97-1.38 6.29-3.48a.75.75 0 1 0-1.28-.78C12.39 15.51 10.57 16.5 8.5 16.5 5.19 16.5 2.5 13.81 2.5 10.5S5.19 4.5 8.5 4.5c2.07 0 3.89.99 5.01 2.26a.75.75 0 0 0 1.28-.78C13.47 4.38 11.15 3 8.5 3z" />
      </svg>
    )
  },
  {
    name: 'Flutter / Dart',
    category: 'Cross-Platform Native Apps',
    color: '#02569B',
    bg: 'rgba(2, 86, 155, 0.08)',
    border: 'rgba(2, 86, 155, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM14.28 10.82l-5.7 5.7L12.3 20.2l5.7-5.7-3.72-3.68zm7.4 3.7l-3.7 3.7 3.7 3.7 3.72-3.7-3.72-3.7z" />
      </svg>
    )
  },
  {
    name: 'GraphQL & gRPC',
    category: 'Contract-First APIs',
    color: '#E10098',
    bg: 'rgba(225, 0, 152, 0.08)',
    border: 'rgba(225, 0, 152, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7l-8.4-4.8V7.1L12 2.3zm-1 3.7v3h2V6h-2zm-5 3v2h3V9H6zm10 0v2h3V9h-3zm-7 4v3h2v-3H9zm6 0v3h2v-3h-2z" />
      </svg>
    )
  }
];

// Track 2: Cloud, DevOps & Infrastructure (Right to Left)
const track2DevOps: TechItem[] = [
  {
    name: 'Kubernetes',
    category: 'Container Orchestration',
    color: '#326CE5',
    bg: 'rgba(50, 108, 229, 0.08)',
    border: 'rgba(50, 108, 229, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.96 0L1.77 5.88v12.24L11.96 24l10.27-5.88V5.88L11.96 0zm0 2.35l7.98 4.57v8.94l-7.98 4.57-7.98-4.57V6.92l7.98-4.57zm-.14 4.14a5.51 5.51 0 1 0 0 11.02 5.51 5.51 0 0 0 0-11.02zm0 1.96a3.55 3.55 0 1 1 0 7.1 3.55 3.55 0 0 1 0-7.1z" />
      </svg>
    )
  },
  {
    name: 'Docker',
    category: 'Multi-Stage Containers',
    color: '#2496ED',
    bg: 'rgba(36, 150, 237, 0.08)',
    border: 'rgba(36, 150, 237, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.186-.186h-2.12a.185.185 0 00-.184.186v1.887c0 .102.083.185.185.185M23.76 9.89c-.365-2.03-1.62-3.23-2.98-3.23-.27 0-.53.05-.77.14-.64-1.35-1.92-2.1-3.37-2.1H.88C.39 4.7 0 5.1 0 5.58v11.75c0 3.7 3.01 6.67 6.72 6.67h10.56c3.71 0 6.72-2.97 6.72-6.67 0-.53-.06-1.05-.18-1.55.97-.8 1.48-1.84 1.48-2.95 0-.96-.4-2.06-1.54-2.94z" />
      </svg>
    )
  },
  {
    name: 'Terraform IaC',
    category: 'Immutable Cloud Infra',
    color: '#844FBA',
    bg: 'rgba(132, 79, 186, 0.08)',
    border: 'rgba(132, 79, 186, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.44 0v7.68h6.24V0H1.44zm7.68 0v7.68h6.24V0H9.12zm7.68 8.16v7.68H23.04V8.16H16.8zM9.12 8.16v7.68h6.24V8.16H9.12zm-7.68 8.16V24h6.24v-7.68H1.44z" />
      </svg>
    )
  },
  {
    name: 'AWS Cloud',
    category: 'ECS, VPC, S3, IAM',
    color: '#FF9900',
    bg: 'rgba(255, 153, 0, 0.08)',
    border: 'rgba(255, 153, 0, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.784 15.184c-.382-.26-.88-.415-1.393-.415-.815 0-1.54.407-1.92.99l-1.07-1.07c.69-.99 1.79-1.63 3.06-1.63.83 0 1.63.29 2.27.79l1.42-1.42V17h-4.57l1.62-1.63-.42-.18zM6.3 11.23c-.7 0-1.3.26-1.74.72-.45.45-.7 1.07-.7 1.76 0 .68.25 1.29.7 1.74.45.45 1.05.7 1.74.7.7 0 1.3-.25 1.74-.7.45-.45.7-1.06.7-1.74 0-.69-.25-1.31-.7-1.76-.44-.46-1.04-.72-1.74-.72zm15.7 6.42c-2.3 2.1-5.6 3.35-9.2 3.35-4.8 0-8.9-2.2-11.4-5.6-.4-.5-.2-1.2.3-1.5.5-.4 1.2-.2 1.5.3 2.1 2.9 5.6 4.7 9.6 4.7 3.1 0 6-1.1 8-2.9.4-.4 1.1-.3 1.5.1.4.5.3 1.2-.3 1.55z" />
      </svg>
    )
  },
  {
    name: 'Cloudflare Edge',
    category: 'Workers, Pages, KV, D1',
    color: '#F38020',
    bg: 'rgba(243, 128, 32, 0.08)',
    border: 'rgba(243, 128, 32, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.42 10.43c-.45-.04-.89.04-1.3.22-.38-2.61-2.6-4.65-5.32-4.65-2.28 0-4.22 1.44-4.99 3.49-.39-.14-.81-.22-1.24-.22-1.92 0-3.48 1.56-3.48 3.48 0 .15.01.29.04.43C.88 13.56 0 14.92 0 16.5 0 18.98 2.02 21 4.5 21h13.92c3.08 0 5.58-2.5 5.58-5.58 0-2.82-2.1-5.14-4.87-5.5-.23-.04-.47-.07-.71-.07v.58z" />
      </svg>
    )
  },
  {
    name: 'Google Cloud (GCP)',
    category: 'GKE & Cloud Functions',
    color: '#4285F4',
    bg: 'rgba(66, 133, 244, 0.08)',
    border: 'rgba(66, 133, 244, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
      </svg>
    )
  },
  {
    name: 'Linux / Alpine',
    category: 'Kernel Tuning & Systemd',
    color: '#FCC624',
    bg: 'rgba(252, 198, 36, 0.08)',
    border: 'rgba(252, 198, 36, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.01 0c-3.1 0-5.63 2.5-5.63 5.58 0 1.04.28 2.02.77 2.87C5.35 9.77 4 12.18 4 14.88c0 3.12 1.84 5.8 4.5 7.02-.12.44-.19.9-.19 1.38 0 .4.32.72.72.72h5.96c.4 0 .72-.32.72-.72 0-.48-.07-.94-.19-1.38 2.66-1.22 4.5-3.9 4.5-7.02 0-2.7-1.35-5.11-3.15-6.43.49-.85.77-1.83.77-2.87 0-3.08-2.53-5.58-5.63-5.58zm-1.7 4.1c.42 0 .75.33.75.75s-.33.75-.75.75-.75-.33-.75-.75.33-.75.75-.75zm3.4 0c.42 0 .75.33.75.75s-.33.75-.75.75-.75-.33-.75-.75.33-.75.75-.75z" />
      </svg>
    )
  }
];

// Track 3: Streaming, Messaging & High-Concurrency (Left to Right)
const track3Streaming: TechItem[] = [
  {
    name: 'NATS JetStream',
    category: 'Sub-Millisecond Message Bus',
    color: '#27AAE1',
    bg: 'rgba(39, 170, 225, 0.08)',
    border: 'rgba(39, 170, 225, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 7.2v9.6L6 24V0L0 7.2zm9 0v9.6l6 7.2V0l-6 7.2zm9 0v9.6l6 7.2V0l-6 7.2z" />
      </svg>
    )
  },
  {
    name: 'Apache Kafka',
    category: 'Distributed Event Streaming',
    color: '#E03C11',
    bg: 'rgba(224, 60, 17, 0.08)',
    border: 'rgba(224, 60, 17, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="6" r="2.5" />
        <circle cx="20" cy="6" r="2.5" />
        <circle cx="4" cy="18" r="2.5" />
        <circle cx="20" cy="18" r="2.5" />
        <path d="M6 7l4 3.5m4 3l4 3.5m-8-6.5l4-3.5m-8 6.5l4 3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'RabbitMQ',
    category: 'AMQP Reliable Task Queues',
    color: '#FF6600',
    bg: 'rgba(255, 102, 0, 0.08)',
    border: 'rgba(255, 102, 0, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.5 15.5c-.3 0-.6-.1-.8-.3l-3.2-3.2c-.4-.4-.4-1.1 0-1.5l3.2-3.2c.4-.4 1.1-.4 1.5 0 .4.4.4 1.1 0 1.5l-2.4 2.4 2.4 2.4c.4.4.4 1.1 0 1.5-.2.3-.5.4-.7.4zm-14.8-1c-.5 0-1-.3-1.3-.7L4.1 9.9c-.3-.5-.3-1.1 0-1.6l2.3-3.9c.3-.5.8-.7 1.3-.7h4.6c.5 0 1 .3 1.3.7l2.3 3.9c.3.5.3 1.1 0 1.6l-2.3 3.9c-.3.5-.8.7-1.3.7H7.7zm2.3-9.5L8.5 7.7l1.5 2.7 1.5-2.7L10 5z" />
      </svg>
    )
  },
  {
    name: 'Redis Pub/Sub',
    category: 'In-Memory Telemetry & State',
    color: '#DC382D',
    bg: 'rgba(220, 56, 45, 0.08)',
    border: 'rgba(220, 56, 45, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.08 12.08l-8.58 4.96a2.98 2.98 0 0 1-3 0L1.92 12.08a1.5 1.5 0 0 1 0-2.6l8.58-4.96a2.98 2.98 0 0 1 3 0l8.58 4.96a1.5 1.5 0 0 1 0 2.6z" />
        <path d="M1.92 14.58l8.58 4.96a2.98 2.98 0 0 0 3 0l8.58-4.96a1.5 1.5 0 0 1 .75 1.3 1.5 1.5 0 0 1-.75 1.3l-8.58 4.96a2.98 2.98 0 0 1-3 0L1.92 22.18a1.5 1.5 0 0 1-.75-1.3 1.5 1.5 0 0 1 .75-1.3z" opacity="0.6" />
      </svg>
    )
  },
  {
    name: 'WebSockets & SSE',
    category: 'Real-Time Bi-Directional',
    color: '#00E676',
    bg: 'rgba(0, 230, 118, 0.08)',
    border: 'rgba(0, 230, 118, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    name: 'Socket.IO',
    category: 'Low-Latency Room Clustering',
    color: '#ffffff',
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.2)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
];

// Track 4: Storage, Vector Databases & Autonomous AI (Right to Left)
const track4Databases: TechItem[] = [
  {
    name: 'PostgreSQL',
    category: 'ACID Ledgers & Row Locks',
    color: '#336791',
    bg: 'rgba(51, 103, 145, 0.08)',
    border: 'rgba(51, 103, 145, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.16c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    )
  },
  {
    name: 'MongoDB',
    category: 'High-Volume Aggregations',
    color: '#47A248',
    bg: 'rgba(71, 162, 72, 0.08)',
    border: 'rgba(71, 162, 72, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.003 0c-.237 0-.46.068-.646.196C10.233.978 4.7 5.097 4.7 13.064c0 4.254 2.83 7.826 6.84 8.784v2.025c0 .07.057.127.127.127h.67c.07 0 .127-.057.127-.127v-2.025c4.01-.958 6.84-4.53 6.84-8.784 0-7.967-5.534-12.086-6.657-12.868A1.134 1.134 0 0 0 12.003 0zm-.003 2.144c.48.36 4.96 3.86 4.96 10.92 0 3.73-2.28 6.75-5.63 7.47V2.144h.67z" />
      </svg>
    )
  },
  {
    name: 'Qdrant Vector DB',
    category: 'HNSW Semantic Retrieval',
    color: '#D82C20',
    bg: 'rgba(216, 44, 32, 0.08)',
    border: 'rgba(216, 44, 32, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
        <polyline points="2 15.5 12 8.5 22 15.5" />
        <line x1="12" y1="2" x2="12" y2="8.5" />
      </svg>
    )
  },
  {
    name: 'LangGraph & AI Agents',
    category: 'Supervised Multi-Agent Loops',
    color: '#A855F7',
    bg: 'rgba(168, 85, 247, 0.08)',
    border: 'rgba(168, 85, 247, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M9 6h6M6 9v6M18 9v6M9 18h6" />
      </svg>
    )
  },
  {
    name: 'FastAPI',
    category: 'High-Throughput ASGI',
    color: '#009688',
    bg: 'rgba(0, 150, 136, 0.08)',
    border: 'rgba(0, 150, 136, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.75 4.5l5.25 7.5h-4.5v7.5l-5.25-7.5h4.5V4.5z" />
      </svg>
    )
  },
  {
    name: 'SQLite / LibSQL',
    category: 'Embedded Edge Relational',
    color: '#003B57',
    bg: 'rgba(0, 59, 87, 0.08)',
    border: 'rgba(0, 59, 87, 0.25)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm0 6c4.42 0 8 1.34 8 2v1.5c-1.84 1.1-4.74 1.75-8 1.75s-6.16-.65-8-1.75V12c0-.66 3.58-2 8-2zm0 6c4.42 0 8 1.34 8 2v1.5c-1.84 1.1-4.74 1.75-8 1.75s-6.16-.65-8-1.75V18c0-.66 3.58-2 8-2z" />
      </svg>
    )
  }
];

const TechBadge: React.FC<{ item: TechItem }> = ({ item }) => (
  <div
    style={{
      backgroundColor: item.bg,
      borderColor: item.border
    }}
    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border backdrop-blur-md shrink-0 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10 hover:border-white/50 cursor-default select-none shadow-sm"
  >
    <div style={{ color: item.color }} className="shrink-0 flex items-center justify-center">
      {item.icon}
    </div>
    <div className="flex flex-col text-left">
      <span className="text-xs font-bold text-white tracking-tight font-sans">
        {item.name}
      </span>
      <span className="text-[10px] font-mono text-zinc-400">
        {item.category}
      </span>
    </div>
  </div>
);

export const TechRadarMarquee: React.FC = () => {
  const row1 = [...track1Languages, ...track1Languages, ...track1Languages];
  const row2 = [...track2DevOps, ...track2DevOps, ...track2DevOps];
  const row3 = [...track3Streaming, ...track3Streaming, ...track3Streaming];
  const row4 = [...track4Databases, ...track4Databases, ...track4Databases];

  return (
    <div className="relative w-full flex flex-col gap-3 py-2 overflow-hidden">
      
      {/* Edge Blur & Vignette Mask (Left & Right Fades) */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#09090b] via-[#09090b]/80 to-transparent z-10 pointer-events-none" />

      {/* Row 1: Left to Right */}
      <div className="w-full overflow-hidden py-0.5">
        <div className="animate-marquee-ltr gap-3.5">
          {row1.map((item, idx) => (
            <TechBadge key={`r1-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2: Right to Left */}
      <div className="w-full overflow-hidden py-0.5">
        <div className="animate-marquee-rtl gap-3.5">
          {row2.map((item, idx) => (
            <TechBadge key={`r2-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 3: Left to Right */}
      <div className="w-full overflow-hidden py-0.5">
        <div className="animate-marquee-ltr gap-3.5">
          {row3.map((item, idx) => (
            <TechBadge key={`r3-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 4: Right to Left */}
      <div className="w-full overflow-hidden py-0.5">
        <div className="animate-marquee-rtl gap-3.5">
          {row4.map((item, idx) => (
            <TechBadge key={`r4-${idx}`} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
};
