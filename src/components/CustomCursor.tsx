import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse, trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;
      if (!isVisible) {
        mousePos.current.x = e.clientX;
        mousePos.current.y = e.clientY;
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-hover]'
      );
      setIsHovering(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    let animId: number;
    const render = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;

      if (ring && dot) {
        // Smooth trailing lerp physics
        const lerpFactor = 0.18;
        mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * lerpFactor;
        mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * lerpFactor;

        ring.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        dot.style.transform = `translate3d(${mousePos.current.targetX}px, ${mousePos.current.targetY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[999999] rounded-full will-change-transform -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,opacity] duration-200 ease-out ${
          isHovering
            ? 'w-10 h-10 border border-emerald-400/80 bg-emerald-400/10 shadow-[0_0_15px_rgba(52,211,153,0.35)]'
            : isClicking
            ? 'w-6 h-6 border border-emerald-300 bg-emerald-500/20'
            : 'w-7 h-7 border border-emerald-400/40 bg-transparent'
        }`}
        style={{
          marginTop: isHovering ? '-20px' : isClicking ? '-12px' : '-14px',
          marginLeft: isHovering ? '-20px' : isClicking ? '-12px' : '-14px',
        }}
      />

      {/* Center Pointer Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[1000000] rounded-full will-change-transform transition-[width,height,opacity] duration-150 ${
          isHovering
            ? 'w-1.5 h-1.5 bg-emerald-300 shadow-[0_0_8px_#34d399]'
            : isClicking
            ? 'w-2 h-2 bg-emerald-200'
            : 'w-1 h-1 bg-emerald-400 shadow-[0_0_6px_#10b981]'
        }`}
        style={{
          marginTop: isHovering ? '-3px' : isClicking ? '-4px' : '-2px',
          marginLeft: isHovering ? '-3px' : isClicking ? '-4px' : '-2px',
        }}
      />
    </>
  );
};
