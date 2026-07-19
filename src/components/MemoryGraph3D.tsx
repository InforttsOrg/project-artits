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
  x: number;
  y: number;
  z: number;
  // Projection properties (computed on the fly)
  px?: number;
  py?: number;
  pSize?: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export const INITIAL_NODES: Omit<GraphNode, 'x' | 'y' | 'z'>[] = [
  // PROJECTS
  {
    id: 'meeseeks',
    label: 'Meeseeks',
    type: 'project',
    desc: 'Autonomous AI Agent Swarm',
    details: 'A self-evolving network of autonomous agents designed for complex task orchestration and deployment automation. Employs token optimization, dynamic model routing (Haiku/Sonnet/Opus), and agentic sandboxing.',
    link: 'https://meeseeks.infortts.com',
    status: 'Active'
  },
  {
    id: 'mitochondria',
    label: 'Mitochondria',
    type: 'project',
    desc: 'High-Frequency Forensics',
    details: 'Nanosecond-latency execution pipeline providing resources (hardware, capital) to the Infortts cell. Incorporates real-time Forex, currency, and commodity backtesting at 3-minute intervals using vector-search analytics.',
    link: 'https://forensics.infortts.com',
    status: 'Active'
  },
  {
    id: 'kimberella',
    label: 'Kimberella',
    type: 'project',
    desc: 'Wealth & UPI Engine',
    details: 'Private, encrypted transaction manager providing a holistic view of historical financial data, assets, and liabilities. Employs vector indices for semantic transaction search and a clean Flutter daily-drive interface.',
    localPath: 'projects/kimberella',
    status: 'In Progress'
  },
  {
    id: 'grypania',
    label: 'Grypania',
    type: 'project',
    desc: 'Spotify AI Recommender',
    details: 'Edge-compute Cloudflare Worker suggesting music based on Spotify history using OpenRouter LLMs. Built with a high-performance C++ Core library for preference analysis.',
    link: 'https://grypania.infortts.com',
    status: 'Initialized'
  },
  {
    id: 'ediacara',
    label: 'Ediacara',
    type: 'project',
    desc: 'Market Sentiment Symphony',
    details: 'Real-time market sentiment orchestrator. Cloudflare Worker generating procedural classical music driven by global ticker sentiment signals via Web Audio API.',
    link: 'https://ediacara.infortts.com',
    status: 'Initialized'
  },
  {
    id: 'dickinsonia',
    label: 'Dickinsonia',
    type: 'project',
    desc: 'Universal Volume Control',
    details: 'Cross-device nearby Bluetooth discovery and synchronized volume controls. Features a glassmorphism device grid with active device volume sliders.',
    localPath: 'projects/dickinsonia',
    status: 'Started'
  },
  {
    id: 'care4u',
    label: 'Care4u (HealthFlow)',
    type: 'project',
    desc: 'Healthcare Operations & Escrow',
    details: 'Event-driven, serverless healthcare booking platform. Built with Go serverless handlers, PostgreSQL, and secure escrow payment integrations.',
    link: 'https://care4u.infortts.com',
    status: 'Active'
  },
  {
    id: 'lexi',
    label: 'Lexi',
    type: 'project',
    desc: 'Salon B2B E-commerce',
    details: 'Complex headless e-commerce ecosystem built on Next.js 14 and Medusa.js, managing dark stores, point-of-sale systems, and salon supplier inventories.',
    link: 'https://github.com/InforttsOrg/project-lexi',
    status: 'Active'
  },
  {
    id: 'spark',
    label: 'Spark',
    type: 'project',
    desc: 'Premium Dating Platform',
    details: 'High-concurrency matching monolith utilizing Go, Kafka, WebSockets, and Flutter. Features real-time location awareness and activity maps.',
    localPath: 'projects/spark',
    status: 'Active'
  },
  {
    id: 'artits',
    label: 'Artits',
    type: 'project',
    desc: 'Portfolio & Resume Engine',
    details: 'Sahil Rathee\'s personal portfolio. Serves as a dynamic, web-native resume with on-demand Playwright-based PDF print script and autonomous job application agents.',
    link: 'https://artits.infortts.com',
    status: 'Production'
  },
  {
    id: 'roost',
    label: 'Roost',
    type: 'project',
    desc: 'Property Management Ecosystem',
    details: 'Integrated property management ecosystem with dedicated Tenant and Manager applications. High-scale multi-tenant architecture utilizing Flutter, Dart, Firebase, and Google Cloud Platform.',
    status: 'Active'
  },
  {
    id: 'shadow_labs',
    label: 'Shadow Labs',
    type: 'project',
    desc: 'Autonomous Marketing Engine',
    details: 'Autonomous marketing engine for e-commerce. Features AI-driven asset generation and real-time inventory synchronization, built on Node.js, Docker, Supabase, and AI.',
    status: 'Active'
  },
  {
    id: 'bighit_cloud',
    label: 'BigHit Cloud',
    type: 'project',
    desc: 'Cloud Infrastructure Optimization',
    details: 'Cloud infrastructure optimization project resulting in an 80% reduction in footprint for a major sports platform. Engineered using AWS, Terraform, and Kubernetes.',
    status: 'Active'
  },
  // SKILLS
  {
    id: 'cpp',
    label: 'C++',
    type: 'skill',
    desc: 'Low-latency Core Systems',
    details: 'The mandated backend language for all high-performance and latency-critical Infortts systems (Mitochondria, Grypania Core, Ediacara Composition).'
  },
  {
    id: 'go',
    label: 'Go (Golang)',
    type: 'skill',
    desc: 'Microservices & Orchestration',
    details: 'Efficient concurrency programming used for service orchestrators, serverless booking (Care4u), transaction normalization (Kimberella), and scaling (Spark).'
  },
  {
    id: 'python',
    label: 'Python',
    type: 'skill',
    desc: 'AI Cores & Data Ingestion',
    details: 'Utilized for AI workflows, heavy calculations, and RAG execution (Meeseeks agent swarm, Mitochondria Zenith backtesting, Kimberella document extraction).'
  },
  {
    id: 'flutter',
    label: 'Dart / Flutter',
    type: 'skill',
    desc: 'Native Cross-Platform UI',
    details: 'Primary client development stack for premium fluid user interfaces (Mitochondria Zenith UI, Kimberella dashboard, Dickinsonia APK, Spark mobile client).'
  },
  {
    id: 'react',
    label: 'React / Vite',
    type: 'skill',
    desc: 'Web Dashboards',
    details: 'Default framework for web-based control centers and management interfaces (Cardiodictyon panel, Artits portfolio).'
  },
  {
    id: 'cloudflare',
    label: 'Cloudflare Workers',
    type: 'skill',
    desc: 'Edge serverless & deployment',
    details: 'Serverless deployment at the edge, routing gateways, and audio processors (Grypania recommender, Ediacara audio worker, Artits deployment).'
  },
  {
    id: 'qdrant',
    label: 'Qdrant Vector DB',
    type: 'skill',
    desc: 'Vector Search & AI Memory',
    details: 'Powering semantic transaction indexing, LLM chat history embeddings, and AI agent memory storage.'
  },
  {
    id: 'nats',
    label: 'NATS JetStream',
    type: 'skill',
    desc: 'Event-Driven Messaging Bus',
    details: 'The shared high-speed messaging backbone allowing microservices in the monorepo to communicate asynchronously and efficiently.'
  },
  {
    id: 'docker',
    label: 'Docker & Swarms',
    type: 'skill',
    desc: 'Infrastructure Isolation',
    details: 'Container isolation to guarantee database security (no exposed host ports except through reverse proxies like Caddy or local Adminer).'
  },
  {
    id: 'terraform',
    label: 'Terraform IaC',
    type: 'skill',
    desc: 'Infrastructure as Code',
    details: 'Automated provisioning of core infrastructure, clusters, and databases across AWS, GCP, and Supabase.'
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
  const rotationRef = useRef({ x: 0.005, y: 0.005 }); // Auto-rotation speed
  const angleRef = useRef({ x: 0, y: 0 }); // Current rotation angles
  const mouseRef = useRef({ isDown: false, startX: 0, startY: 0, x: 0, y: 0 });
  const hoveredNodeIdRef = useRef<string | null>(null);

  // Initialize node 3D coordinates evenly on a sphere (Fibonacci lattice)
  useEffect(() => {
    const radius = 170;
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
    const fov = 350; // Field of view
    const nodeBaseSize = 6;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      canvas.width = (rect?.width || 500) * window.devicePixelRatio;
      canvas.height = (rect?.height || 500) * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Main Draw loop
    const render = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Auto rotation if mouse is not down
      if (!mouseRef.current.isDown) {
        angleRef.current.x += rotationRef.current.x * 0.5;
        angleRef.current.y += rotationRef.current.y * 0.5;
      }

      const cosX = Math.cos(angleRef.current.x);
      const sinX = Math.sin(angleRef.current.x);
      const cosY = Math.cos(angleRef.current.y);
      const sinY = Math.sin(angleRef.current.y);

      // Project all nodes
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
          z2 // Depth for sorting
        };
      });

      // Find hovered node based on 2D proximity to mouse
      let closestNode: typeof projectedNodes[0] | null = null;
      let minDistance = 15; // Hover range in pixels
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

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

      // Draw background grid lines (Blueprint theme)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 30;
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

      // Draw Links
      LINKS.forEach(link => {
        const sourceNode = projectedNodes.find(n => n.id === link.source);
        const targetNode = projectedNodes.find(n => n.id === link.target);

        if (sourceNode && targetNode) {
          const isRelatedToActive = activeNode && (activeNode.id === sourceNode.id || activeNode.id === targetNode.id);
          const isRelatedToHover = hoveredNodeIdRef.current && (hoveredNodeIdRef.current === sourceNode.id || hoveredNodeIdRef.current === targetNode.id);

          // Compute link depth (average of both nodes)
          const avgZ = (sourceNode.z2 + targetNode.z2) / 2;
          const alpha = Math.max(0.05, Math.min(0.6, 1 - (avgZ + 170) / 340));

          ctx.beginPath();
          ctx.moveTo(sourceNode.px, sourceNode.py);
          ctx.lineTo(targetNode.px, targetNode.py);

          if (isRelatedToActive) {
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.7)'; // Glow Sonar-Cyan
            ctx.lineWidth = 1.5;
          } else if (isRelatedToHover) {
            ctx.strokeStyle = 'rgba(0, 102, 255, 0.5)'; // Glow Sonar-Blue
            ctx.lineWidth = 1.2;
          } else {
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.15})`;
            ctx.lineWidth = 0.5;
          }
          ctx.stroke();
        }
      });

      // Sort nodes by depth (z2 desc, draw back-to-front)
      const sortedNodes = [...projectedNodes].sort((a, b) => b.z2 - a.z2);

      // Draw Nodes
      sortedNodes.forEach(node => {
        const isActive = activeNode && activeNode.id === node.id;
        const isHovered = hoveredNodeIdRef.current === node.id;

        // Calculate opacity based on Z coordinate
        const alpha = Math.max(0.2, Math.min(1.0, 1 - (node.z2 + 170) / 340));
        
        ctx.beginPath();
        ctx.arc(node.px, node.py, node.pSize * (isActive ? 1.5 : isHovered ? 1.25 : 1), 0, Math.PI * 2);

        // Styling based on active/hovered state
        if (isActive) {
          ctx.fillStyle = 'rgba(0, 243, 255, 1.0)'; // Sonar Cyan
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(0, 243, 255, 0.8)';
        } else if (isHovered) {
          ctx.fillStyle = 'rgba(0, 102, 255, 1.0)'; // Sonar Blue
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(0, 102, 255, 0.6)';
        } else {
          ctx.fillStyle = node.type === 'project' 
            ? `rgba(226, 232, 240, ${alpha})` // Titanium for projects
            : `rgba(100, 116, 139, ${alpha})`; // Steel for skills
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Inner core circle for active node
        if (isActive) {
          ctx.beginPath();
          ctx.arc(node.px, node.py, node.pSize * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#090d16'; // Obsidian hole
          ctx.fill();
        }

        // Draw text label
        const fontSize = isActive ? 11 : isHovered ? 10 : 9;
        ctx.font = `${isActive ? 'bold' : 'normal'} ${fontSize}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        
        if (isActive) {
          ctx.fillStyle = '#00f3ff';
        } else if (isHovered) {
          ctx.fillStyle = '#38bdf8';
        } else {
          ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.8})`;
        }

        ctx.fillText(node.label, node.px, node.py - (node.pSize + 6));
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [nodes, activeNode]);

  // Event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.isDown = true;
    mouseRef.current.startX = e.clientX - rect.left;
    mouseRef.current.startY = e.clientY - rect.top;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    mouseRef.current.x = mouseX;
    mouseRef.current.y = mouseY;

    if (mouseRef.current.isDown) {
      const dx = mouseX - mouseRef.current.startX;
      const dy = mouseY - mouseRef.current.startY;

      // Adjust rotation angles based on delta drag
      angleRef.current.y += dx * 0.007;
      angleRef.current.x += dy * 0.007;

      mouseRef.current.startX = mouseX;
      mouseRef.current.startY = mouseY;
    }
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isDown = false;
    mouseRef.current.x = -999;
    mouseRef.current.y = -999;
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
        cursor: hoveredNodeIdRef.current ? 'pointer' : mouseRef.current.isDown ? 'grabbing' : 'grab',
        background: '#090d16',
        borderRadius: '2px',
        border: '1px solid rgba(56, 189, 248, 0.08)'
      }}
    >
      <canvas 
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ display: 'block', position: 'absolute', top: 0, left: 0 }}
      />
      
      {/* 3D Space control overlay details */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        fontSize: '8px',
        color: '#475569',
        fontFamily: "'JetBrains Mono', monospace",
        pointerEvents: 'none'
      }}>
        DRAG TO ROTATE // CLICK TO PREVIEW NODE // DEPTH: FIBONACCI_SPHERE
      </div>
    </div>
  );
};
