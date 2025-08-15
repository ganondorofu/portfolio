'use client';

import React, { useState, useEffect, useRef } from 'react';

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  isMinimized?: boolean;
  isMaximized?: boolean;
  onMinimize?: () => void;
  onToggleMaximize?: () => void;
};

const Window = ({ title, children, onClose, initialPosition, isMinimized = false, isMaximized = false, onMinimize, onToggleMaximize }: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(
    initialPosition || { x: 150 + Math.random() * 200, y: 100 + Math.random() * 100 }
  );
  const [isClosing, setIsClosing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<{ x: number; y: number } | null>({ x: position.x, y: position.y });
  const rafRef = useRef<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (windowRef.current) {
      setIsDragging(true);
      const rect = windowRef.current.getBoundingClientRect();
      dragOffsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      
      // テキスト選択を完全に無効化
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      (document.body.style as any).mozUserSelect = 'none';
      (document.body.style as any).msUserSelect = 'none';
  document.body.style.cursor = 'move';
  document.body.classList.add('dragging');
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragOffsetRef.current.x;
      const newY = e.clientY - dragOffsetRef.current.y;

      // 画面の境界内に制限（ウィンドウサイズはおおよそ固定）
      const maxX = window.innerWidth - 600;
      const maxY = window.innerHeight - 500;

      const tx = Math.max(0, Math.min(newX, maxX));
      const ty = Math.max(32, Math.min(newY, maxY));

      targetRef.current = { x: tx, y: ty };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // テキスト選択を再有効化
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    (document.body.style as any).mozUserSelect = '';
    (document.body.style as any).msUserSelect = '';
  document.body.style.cursor = '';
  document.body.classList.remove('dragging');
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Smooth animation loop to interpolate position -> targetRef
  useEffect(() => {
    const animate = () => {
      const target = targetRef.current;
      if (target) {
        setPosition(prev => {
          const nx = lerp(prev.x, target.x, 0.2);
          const ny = lerp(prev.y, target.y, 0.2);
          // snap when close
          if (Math.abs(nx - target.x) < 0.5 && Math.abs(ny - target.y) < 0.5) {
            return { x: target.x, y: target.y };
          }
          return { x: nx, y: ny };
        });
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={windowRef}
      style={{ 
        position: 'absolute',
        left: 0,
        top: 0,
        transform: isMaximized ? undefined : `translate(${position.x}px, ${position.y}px)`,
        width: isMaximized ? '100%' : '600px',
        maxWidth: isMaximized ? '100%' : '90vw',
        height: isMaximized ? '100%' : '500px',
        maxHeight: isMaximized ? '100%' : '80vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.15s, transform 0.12s, width 0.12s, height 0.12s',
        transformOrigin: 'top left',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transformBox: 'fill-box' as any,
        opacity: isClosing ? 0 : 1,
        zIndex: 1000,
        backgroundColor: '#3c3c3c',
        border: isMaximized ? 'none' : '1px solid #555555',
        borderRadius: isMaximized ? 0 : 8,
        color: '#ffffff'
      }}
    >
      {/* Ubuntu-style Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        style={{ 
          height: '40px',
          display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
          padding: '0 16px',
          cursor: 'move',
          backgroundColor: '#2d2d2d',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottom: '1px solid #555555',
          color: '#ffffff',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        {/* Title (Ubuntu GNOMEは左寄せが多い) */}
        <span style={{ 
          fontWeight: 500,
          fontSize: '14px',
          color: 'white',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {title}
        </span>

        {/* Controls on the right - Ubuntu style */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }} onMouseDown={(e) => e.stopPropagation()}>
          <button
            title="Minimize"
            aria-label="Minimize"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '28px', borderRadius: '6px', background: 'transparent', border: 'none', color: '#d1d5db', cursor: 'pointer' }}
            onClick={() => { if (onMinimize) onMinimize(); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="11" width="16" height="2" fill="#d1d5db" />
            </svg>
          </button>

          <button
            title="Maximize"
            aria-label="Maximize"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '28px', borderRadius: '6px', background: 'transparent', border: 'none', color: '#d1d5db', cursor: 'pointer' }}
            onClick={() => { if (onToggleMaximize) onToggleMaximize(); }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="16" height="16" stroke="#d1d5db" strokeWidth="1.5" rx="1" />
            </svg>
          </button>

          <button
            title="Close"
            aria-label="Close"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '28px', borderRadius: '6px', background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer' }}
            onClick={handleClose}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6L18 18M6 18L18 6" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div 
        style={{ 
          padding: '24px', 
          flexGrow: 1, 
          overflowY: 'auto',
          color: '#ffffff', 
          backgroundColor: '#3c3c3c',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Window;
