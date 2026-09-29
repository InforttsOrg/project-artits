import React, { useRef, useEffect, useState } from 'react';

export interface GraphNode {
  id: string;
  label: string;
  type: 'project' | 'skill';
  desc: string;
  details: string;
  link?: string;
  localPath?: string;
  status?: string;
  color?: string;
  x: number;
  y: number;
  z: number;
  // Projection properties (computed on the fly)
  px?: number;
  py?: number;
  pSize?: number;
  z2?: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export const INITIAL_NODES: Omit<GraphNode, 'x' | 'y' | 'z'>[] = [
  // PROJECTS (Vibrant Cyan / Emerald / Sapphire)
  {
    id: 'meeseeks',
    label: 'Meeseeks',
    type: 'project',
    desc: 'Autonomous AI Agent Swarm',
    details: 'A self-evolving network of autonomous agents designed for complex task orchestration and deployment automation. Employs token optimization, dynamic model routing (Haiku/Sonnet/Opus), and agentic sandboxing.',
    link: 'https://meeseeks.infortts.site',
    status: 'Active',
    color: '#00f3ff'
  },
  {
    id: 'mitochondria',
    label: 'Mitochondria',
    type: 'project',
    desc: 'High-Frequency Forensics',
    details: 'Nanosecond-latency execution pipeline providing resources (hardware, capital) to the Infortts cell. Incorporates real-time Forex, currency, and commodity backtesting at 3-minute intervals using vector-search analytics.',
    link: 'https://forensics.infortts.site',
    status: 'Active',
    color: '#10b981'
  },
  {
    id: 'kimberella',
    label: 'Kimberella',
    type: 'project',
    desc: 'Wealth & UPI Engine',
    details: 'Private, encrypted transaction manager providing a holistic view of historical financial data, assets, and liabilities. Employs vector indices for semantic transaction search and a clean Flutter daily-drive interface.',
    localPath: 'projects/kimberella',
    status: 'In Progress',
    color: '#06b6d4'
  },
  {
    id: 'grypania',
    label: 'Grypania',
    type: 'project',
    desc: 'Spotify AI Recommender',
    details: 'Edge-compute Cloudflare Worker suggesting music based on Spotify history using OpenRouter LLMs. Built with a high-performance C++ Core library for preference analysis.',
    link: 'https://grypania.infortts.site',
    status: 'Initialized',
    color: '#22c55e'
  },
  {
    id: 'ediacara',
    label: 'Ediacara',
    type: 'project',
    desc: 'Market Sentiment Symphony',
    details: 'Real-time market sentiment orchestrator. Cloudflare Worker generating procedural classical music driven by global ticker sentiment signals via Web Audio API.',
    link: 'https://ediacara.infortts.site',
    status: 'Initialized',
    color: '#38bdf8'
  },
  {
    id: 'dickinsonia',
    label: 'Dickinsonia',
    type: 'project',
    desc: 'Universal Volume Control',
    details: 'Cross-device nearby Bluetooth discovery and synchronized volume controls. Features a glassmorphism device grid with active device volume sliders.',
    localPath: 'projects/dickinsonia',
    status: 'Started',
    color: '#14b8a6'
  },
  {
    id: 'care4u',
    label: 'Care4u (HealthFlow)',
    type: 'project',
    desc: 'Healthcare Operations & Escrow',
    details: 'Event-driven, serverless healthcare booking platform. Built with Go serverless handlers, PostgreSQL, and secure escrow payment integrations.',
    link: 'https://care4u.infortts.site',
    status: 'Active',
    color: '#0ea5e9'
  },
  {
    id: 'lexi',
    label: 'Lexi',
    type: 'project',
    desc: 'Salon B2B E-commerce',
    details: 'Complex headless e-commerce ecosystem built on Next.js 14 and Medusa.js, managing dark stores, point-of-sale systems, and salon supplier inventories.',
    link: 'https://github.com/InforttsOrg/project-lexi',
    status: 'Active',
    color: '#3b82f6'
  },
  {
    id: 'spark',
    label: 'Spark',
    type: 'project',
    desc: 'Premium Dating Platform',
    details: 'High-concurrency matching monolith utilizing Go, Kafka, WebSockets, and Flutter. Features real-time location awareness and activity maps.',
    localPath: 'projects/spark',
    status: 'Active',
    color: '#f43f5e'
  },
  {
    id: 'artits',
    label: 'Artits',
    type: 'project',
    desc: 'Portfolio & Resume Engine',
    details: 'Sahil Rathee\'s personal portfolio. Serves as a dynamic, web-native resume with on-demand Playwright-based PDF print script and autonomous job application agents.',
    link: 'https://artits.infortts.site',
    status: 'Production',
    color: '#a855f7'
  },
  {
    id: 'roost',
    label: 'Roost',
    type: 'project',
    desc: 'Property Management Ecosystem',
    details: 'Integrated property management ecosystem with dedicated Tenant and Manager applications. High-scale multi-tenant architecture utilizing Flutter, Dart, Firebase, and Google Cloud Platform.',
    status: 'Active',
    color: '#8b5cf6'
  },
  {
    id: 'shadow_labs',
    label: 'Shadow Labs',
    type: 'project',
    desc: 'Autonomous Marketing Engine',
    details: 'Autonomous marketing engine for e-commerce. Features AI-driven asset generation and real-time inventory synchronization, built on Node.js, Docker, Glycocalyx, and AI.',
    status: 'Active',
    color: '#ec4899'
  },
  {
    id: 'bighit_cloud',
    label: 'BigHit Cloud',
    type: 'project',
    desc: 'Cloud Infrastructure Optimization',
    details: 'Cloud infrastructure optimization project resulting in an 80% reduction in footprint for a major sports platform. Engineered using AWS, Terraform, and Kubernetes.',
    status: 'Active',
    color: '#6366f1'
  },
  // SKILLS (Luminous Neon Violet / Electric Amber / Laser Mint)
  {
    id: 'cpp',
    label: 'C++',
    type: 'skill',
    desc: 'Low-latency Core Systems',
    details: 'The mandated backend language for all high-performance and latency-critical Infortts systems (Mitochondria, Grypania Core, Ediacara Composition).',
    color: '#60a5fa'
  },
  {
    id: 'go',
    label: 'Go (Golang)',
    type: 'skill',
    desc: 'Microservices & Orchestration',
    details: 'Efficient concurrency programming used for service orchestrators, serverless booking (Care4u), transaction normalization (Kimberella), and scaling (Spark).',
    color: '#00f3ff'
  },
  {
    id: 'python',
    label: 'Python',
    type: 'skill',
    desc: 'AI Cores & Data Ingestion',
    details: 'Utilized for AI workflows, heavy calculations, and RAG execution (Meeseeks agent swarm, Mitochondria Zenith backtesting, Kimberella document extraction).',
    color: '#facc15'
  },
  {
    id: 'flutter',
    label: 'Dart / Flutter',
    type: 'skill',
    desc: 'Native Cross-Platform UI',
    details: 'Primary client development stack for premium fluid user interfaces (Mitochondria Zenith UI, Kimberella dashboard, Dickinsonia APK, Spark mobile client).',
    color: '#38bdf8'
  },
  {
    id: 'react',
    label: 'React / Vite',
    type: 'skill',
    desc: 'Web Dashboards',
    details: 'Default framework for web-based control centers and management interfaces (Cardiodictyon panel, Artits portfolio).',
    color: '#22d3ee'
  },
  {
    id: 'cloudflare',
    label: 'Cloudflare Workers',
    type: 'skill',
    desc: 'Edge serverless & deployment',
    details: 'Serverless deployment at the edge, routing gateways, and audio processors (Grypania recommender, Ediacara audio worker, Artits deployment).',
    color: '#fb923c'
  },
  {
    id: 'qdrant',
    label: 'Qdrant Vector DB',
    type: 'skill',
    desc: 'Vector Search & AI Memory',
    details: 'Powering semantic transaction indexing, LLM chat history embeddings, and AI agent memory storage.',
    color: '#e879f9'
  },
  {
    id: 'nats',
    label: 'NATS JetStream',
    type: 'skill',
    desc: 'Event-Driven Messaging Bus',
    details: 'The shared high-speed messaging backbone allowing microservices in the monorepo to communicate asynchronously and efficiently.',
    color: '#4ade80'
  },
  {
    id: 'docker',
    label: 'Docker & Swarms',
    type: 'skill',
    desc: 'Infrastructure Isolation',
    details: 'Container isolation to guarantee database security (no exposed host ports except through reverse proxies like Caddy or local Adminer).',
    color: '#38bdf8'
  },
  {
    id: 'terraform',
    label: 'Terraform IaC',
    type: 'skill',
    desc: 'Infrastructure as Code',
    details: 'Automated provisioning of core infrastructure, clusters, and databases across AWS, GCP, and Postgres.',
    color: '#a78bfa'
  }
];

const LINKS: GraphLink[] = [
  { source: 'cpp', target: 'mitochondria' },
  { source: 'cpp', target: 'grypania' },
  { source: 'cpp', target: 'ediacara' },
  { source: 'go', target: 'kimberella' },
  { source: 'go', target: 'care4u' },
  { source: 'go', target: 'spark' },
  { source: 'python', target: 'meeseeks' },
  { source: 'python', target: 'mitochondria' },
  { source: 'python', target: 'kimberella' },
  { source: 'flutter', target: 'mitochondria' },
  { source: 'flutter', target: 'kimberella' },
  { source: 'flutter', target: 'dickinsonia' },
  { source: 'flutter', target: 'spark' },
  { source: 'flutter', target: 'care4u' },
  { source: 'react', target: 'meeseeks' },
  { source: 'react', target: 'artits' },
  { source: 'react', target: 'lexi' },
  { source: 'cloudflare', target: 'grypania' },
  { source: 'cloudflare', target: 'ediacara' },
  { source: 'cloudflare', target: 'artits' },
  { source: 'qdrant', target: 'meeseeks' },
  { source: 'qdrant', target: 'mitochondria' },
  { source: 'qdrant', target: 'kimberella' },
  { source: 'nats', target: 'mitochondria' },
  { source: 'docker', target: 'mitochondria' },
  { source: 'docker', target: 'meeseeks' },
  { source: 'flutter', target: 'roost' },
  { source: 'react', target: 'shadow_labs' },
  { source: 'docker', target: 'shadow_labs' },
  { source: 'terraform', target: 'bighit_cloud' },
  { source: 'docker', target: 'bighit_cloud' }
];

interface MemoryGraph3DProps {
  onSelectNode: (node: GraphNode) => void;
  activeNode: GraphNode | null;
}

export const MemoryGraph3D: React.FC<MemoryGraph3DProps> = ({ onSelectNode, activeNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  
  // Rotation and kinetic drag physics
  const angleRef = useRef({ x: 0.2, y: 0.4 });
  const velocityRef = useRef({ vx: 0.002, vy: 0.002 });
  const isInteractingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, time: 0 });
  const mousePosRef = useRef({ x: -999, y: -999 });
  const hoveredNodeIdRef = useRef<string | null>(null);
  const pulsePhaseRef = useRef(0);

  // Initialize node 3D coordinates evenly on a sphere (Fibonacci lattice)
  useEffect(() => {
    const radius = 175;
    const count = INITIAL_NODES.length;
    const generated: GraphNode[] = INITIAL_NODES.map((n, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      return {
        ...n,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });
    setNodes(generated);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || nodes.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const fov = 380; // Field of view
    const nodeBaseSize = 7;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const w = rect?.width || 500;
      const h = rect?.height || 500;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Main Draw loop at 60 FPS
    const render = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Kinetic rotation physics: smooth decay when user releases
      if (!isInteractingRef.current) {
        angleRef.current.y += velocityRef.current.vx;
        angleRef.current.x += velocityRef.current.vy;
        
        // Decay to gentle ambient rotation
        velocityRef.current.vx = velocityRef.current.vx * 0.96 + 0.0018 * 0.04;
        velocityRef.current.vy = velocityRef.current.vy * 0.96 + 0.0012 * 0.04;
      }

      pulsePhaseRef.current += 0.04;

      const cosX = Math.cos(angleRef.current.x);
      const sinX = Math.sin(angleRef.current.x);
      const cosY = Math.cos(angleRef.current.y);
      const sinY = Math.sin(angleRef.current.y);

      // 3D Matrix Projection
      const projectedNodes = nodes.map(node => {
        // Rotate around Y axis
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate around X axis
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Perspective scale
        const scale = fov / (fov + z2);
        const px = x1 * scale + centerX;
        const py = y2 * scale + centerY;
        const pSize = nodeBaseSize * scale;

        return {
          ...node,
          px,
          py,
          pSize,
          z2
        };
      });

      // Hover / Click detection with generous touch hit radius
      let closestNode: typeof projectedNodes[0] | null = null;
      let minDistance = 24; // Touch-friendly hit tolerance
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      projectedNodes.forEach(node => {
        const dx = node.px - mouseX;
        const dy = node.py - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) {
          minDistance = dist;
          closestNode = node;
        }
      });

      hoveredNodeIdRef.current = closestNode ? (closestNode as any).id : null;

      // 1. Draw Subtle Cybernetic Blueprint Grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 32;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Holographic Depth Rings
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 175 * (fov / (fov + 50)), 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw Links with dynamic neon glow and energy pulses
      LINKS.forEach(link => {
        const sourceNode = projectedNodes.find(n => n.id === link.source);
        const targetNode = projectedNodes.find(n => n.id === link.target);

        if (sourceNode && targetNode) {
          const isRelatedToActive = activeNode && (activeNode.id === sourceNode.id || activeNode.id === targetNode.id);
          const isRelatedToHover = hoveredNodeIdRef.current && (hoveredNodeIdRef.current === sourceNode.id || hoveredNodeIdRef.current === targetNode.id);

          const avgZ = (sourceNode.z2 + targetNode.z2) / 2;
          const depthAlpha = Math.max(0.12, Math.min(0.85, 1 - (avgZ + 180) / 360));

          ctx.beginPath();
          ctx.moveTo(sourceNode.px, sourceNode.py);
          ctx.lineTo(targetNode.px, targetNode.py);

          if (isRelatedToActive) {
            // Intense Electric Cyan Laser
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.9)';
            ctx.lineWidth = 2.2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(0, 243, 255, 0.8)';
          } else if (isRelatedToHover) {
            // Glowing Neon Violet
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.85)';
            ctx.lineWidth = 1.8;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(168, 85, 247, 0.7)';
          } else {
            // Vibrant ambient cyan link
            ctx.strokeStyle = `rgba(56, 189, 248, ${depthAlpha * 0.28})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;

          // Traveling Energy Packet on Active Links
          if (isRelatedToActive || isRelatedToHover) {
            const packetT = (pulsePhaseRef.current % 1);
            const packetX = sourceNode.px + (targetNode.px - sourceNode.px) * packetT;
            const packetY = sourceNode.py + (targetNode.py - sourceNode.py) * packetT;

            ctx.beginPath();
            ctx.arc(packetX, packetY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // 4. Sort nodes back-to-front for proper 3D occlusion
      const sortedNodes = [...projectedNodes].sort((a, b) => b.z2 - a.z2);

      // 5. Draw Nodes with vibrant bioluminescent aesthetics
      sortedNodes.forEach(node => {
        const isActive = activeNode && activeNode.id === node.id;
        const isHovered = hoveredNodeIdRef.current === node.id;
        const depthAlpha = Math.max(0.35, Math.min(1.0, 1 - (node.z2 + 180) / 360));
        const themeColor = node.color || (node.type === 'project' ? '#00f3ff' : '#a855f7');

        const currentSize = node.pSize * (isActive ? 1.6 : isHovered ? 1.35 : 1.0);

        // A. Pulsing Outer Aura for Active / Hovered
        if (isActive || isHovered) {
          const pulseSize = currentSize * (1.6 + Math.sin(pulsePhaseRef.current * 3) * 0.25);
          ctx.beginPath();
          ctx.arc(node.px, node.py, pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? 'rgba(0, 243, 255, 0.25)' : 'rgba(168, 85, 247, 0.2)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(node.px, node.py, pulseSize * 1.15, 0, Math.PI * 2);
          ctx.strokeStyle = isActive ? 'rgba(0, 243, 255, 0.6)' : 'rgba(168, 85, 247, 0.5)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // B. Node Outer Shell
        ctx.beginPath();
        ctx.arc(node.px, node.py, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = themeColor;
        ctx.shadowBlur = isActive ? 18 : isHovered ? 14 : 6;
        ctx.shadowColor = themeColor;
        ctx.globalAlpha = depthAlpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // C. Bright Glowing White Center Core
        ctx.beginPath();
        ctx.arc(node.px, node.py, currentSize * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // D. Luminous Text Label with Contrast Pill
        const fontSize = isActive ? 12 : isHovered ? 11 : 9.5;
        ctx.font = `${isActive ? '700' : isHovered ? '600' : '500'} ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        
        const textY = node.py - (currentSize + 7);
        const textWidth = ctx.measureText(node.label).width;

        // Subtle dark backdrop pill for crystal readability
        ctx.fillStyle = 'rgba(9, 13, 22, 0.8)';
        ctx.fillRect(node.px - textWidth / 2 - 4, textY - fontSize + 1, textWidth + 8, fontSize + 3);

        if (isActive) {
          ctx.fillStyle = '#00f3ff';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00f3ff';
        } else if (isHovered) {
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#38bdf8';
        } else {
          ctx.fillStyle = `rgba(226, 232, 240, ${depthAlpha * 0.95})`;
          ctx.shadowBlur = 0;
        }

        ctx.fillText(node.label, node.px, textY);
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [nodes, activeNode]);

  // Unified Mouse & Touch Interaction (Smooth Mobile Drag & Momentum)
  const startDrag = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    isInteractingRef.current = true;
    dragStartRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
      time: performance.now()
    };
    mousePosRef.current = {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const moveDrag = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    mousePosRef.current = { x: currentX, y: currentY };

    if (isInteractingRef.current) {
      const dx = currentX - dragStartRef.current.x;
      const dy = currentY - dragStartRef.current.y;

      const sensitivity = 0.0075;
      angleRef.current.y += dx * sensitivity;
      angleRef.current.x += dy * sensitivity;

      // Calculate instantaneous drag velocity for momentum
      velocityRef.current = {
        vx: dx * 0.0035,
        vy: dy * 0.0035
      };

      dragStartRef.current = {
        x: currentX,
        y: currentY,
        time: performance.now()
      };
    }
  };

  const endDrag = () => {
    isInteractingRef.current = false;
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    startDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    moveDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    endDrag();
  };

  const handleMouseLeave = () => {
    endDrag();
    mousePosRef.current = { x: -999, y: -999 };
  };

  // Touch Handlers (Full Mobile Support)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    endDrag();
    // On touch tap: select closest node if tapped
    if (hoveredNodeIdRef.current) {
      const selected = nodes.find(n => n.id === hoveredNodeIdRef.current);
      if (selected) {
        onSelectNode(selected);
      }
    }
  };

  const handleClick = () => {
    if (hoveredNodeIdRef.current) {
      const selected = nodes.find(n => n.id === hoveredNodeIdRef.current);
      if (selected) {
        onSelectNode(selected);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        cursor: hoveredNodeIdRef.current ? 'pointer' : isInteractingRef.current ? 'grabbing' : 'grab',
        background: 'radial-gradient(ellipse at center, rgba(14, 23, 42, 0.95) 0%, rgba(9, 13, 22, 1) 100%)',
        borderRadius: '8px',
        border: '1px solid rgba(0, 243, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), inset 0 0 24px rgba(0, 243, 255, 0.03)',
        touchAction: 'none',
        overflow: 'hidden'
      }}
    >
      <canvas 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        style={{ 
          display: 'block', 
          position: 'absolute', 
          top: 0, 
          left: 0,
          touchAction: 'none'
        }}
      />
      
      {/* 3D Space control overlay badge */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        fontSize: '9px',
        letterSpacing: '0.05em',
        color: 'rgba(56, 189, 248, 0.7)',
        fontFamily: "'JetBrains Mono', monospace",
        pointerEvents: 'none',
        background: 'rgba(9, 13, 22, 0.75)',
        padding: '3px 8px',
        borderRadius: '4px',
        border: '1px solid rgba(56, 189, 248, 0.15)'
      }}>
        TOUCH / DRAG TO ROTATE // CLICK NODE FOR METRICS
      </div>
    </div>
  );
};
