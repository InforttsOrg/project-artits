import React, { useEffect, useRef, useState } from 'react';

export const Cursor3D: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;
      
      if (Math.abs(diff) > 2) {
        setScrollDirection(diff > 0 ? 'down' : 'up');
        
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setScrollDirection(null);
        }, 800);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.node') ||
        target.closest('canvas')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation Loop
    let animId: number;
    const updatePosition = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      
      if (ring && dot) {
        // Smooth interpolation (lerp)
        const ease = 0.15;
        const dx = mouseRef.current.targetX - mouseRef.current.x;
        const dy = mouseRef.current.targetY - mouseRef.current.y;
        
        mouseRef.current.x += dx * ease;
        mouseRef.current.y += dy * ease;
        
        // Calculate velocity for 3D tilt
        velocityRef.current.x = dx;
        velocityRef.current.y = dy;
        
        // Tilt calculations based on velocity
        const maxTilt = 25; // max degrees
        const tiltX = Math.max(-maxTilt, Math.min(maxTilt, -velocityRef.current.y * 0.4));
        const tiltY = Math.max(-maxTilt, Math.min(maxTilt, velocityRef.current.x * 0.4));
        
        // Apply transform to the outer ring
        ring.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        
        // Dot follows instantly
        dot.style.transform = `translate3d(${mouseRef.current.targetX}px, ${mouseRef.current.targetY}px, 0)`;
      }
      
      animId = requestAnimationFrame(updatePosition);
    };
    
    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Ring with 3D Tilt */}
      <div 
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '40px' : '26px',
          height: isHovering ? '40px' : '26px',
          margin: isHovering ? '-20px 0 0 -20px' : '-13px 0 0 -13px',
          border: isHovering ? '1.5px solid rgba(0, 243, 255, 0.8)' : '1px solid rgba(0, 243, 255, 0.4)', // Sonar Cyan
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transformStyle: 'preserve-3d',
          perspective: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s'
        }}
      >
        {/* Scroll Indicators inside the ring */}
        {scrollDirection === 'down' && (
          <div style={{
            position: 'absolute',
            fontSize: '10px',
            color: '#00f3ff',
            transform: 'translateZ(10px) translateY(14px)',
            animation: 'scrollArrowDown 0.8s infinite',
            textShadow: '0 0 4px #00f3ff'
          }}>
            &darr;
          </div>
        )}
        {scrollDirection === 'up' && (
          <div style={{
            position: 'absolute',
            fontSize: '10px',
            color: '#00f3ff',
            transform: 'translateZ(10px) translateY(-14px)',
            animation: 'scrollArrowUp 0.8s infinite',
            textShadow: '0 0 4px #00f3ff'
          }}>
            &uarr;
          </div>
        )}
      </div>
      
      {/* Center Dot */}
      <div 
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          margin: '-2px 0 0 -2px',
          background: 'rgba(0, 102, 255, 1)', // Sonar Blue
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />
    </>
  );
};
