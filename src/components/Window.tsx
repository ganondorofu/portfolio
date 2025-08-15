'use client';

import React, { useState, useEffect, useRef } from 'react';

type WindowProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isMinimized?: boolean;
  isMaximized?: boolean;
  onMinimize?: () => void;
  onToggleMaximize?: () => void;
};

const Window = ({ title, children, onClose, initialPosition, initialSize, isMinimized = false, isMaximized = false, onMinimize, onToggleMaximize }: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [position, setPosition] = useState(
    initialPosition || { x: 150 + Math.random() * 200, y: 100 + Math.random() * 100 }
  );
  const [size, setSize] = useState(() => {
    const defaultWidth = Math.min(800, window.innerWidth * 0.8);
    const defaultHeight = Math.min(600, window.innerHeight * 0.8);
    return initialSize || { width: defaultWidth, height: defaultHeight };
  });
  const [isClosing, setIsClosing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<{ x: number; y: number } | null>({ x: position.x, y: position.y });
  const rafRef = useRef<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (windowRef.current && !isMaximized) {
      setIsDragging(true);
      const rect = windowRef.current.getBoundingClientRect();
      dragOffsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      
      // テキスト選択を完全に無効化
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      (document.body.style as unknown as Record<string, string>).mozUserSelect = 'none';
      (document.body.style as unknown as Record<string, string>).msUserSelect = 'none';
      document.body.style.cursor = 'move';
      document.body.classList.add('dragging');
    }
  };

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isMaximized) return;
    
    setIsResizing(true);
    setResizeDirection(direction);
    
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      windowX: position.x,
      windowY: position.y
    };
    
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    (document.body.style as unknown as Record<string, string>).mozUserSelect = 'none';
    (document.body.style as unknown as Record<string, string>).msUserSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      e.preventDefault();
      const newX = e.clientX - dragOffsetRef.current.x;
      const newY = e.clientY - dragOffsetRef.current.y;

      // 画面の境界内に制限
      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - size.height;

      const tx = Math.max(0, Math.min(newX, maxX));
      const ty = Math.max(32, Math.min(newY, maxY));

      targetRef.current = { x: tx, y: ty };
    }
    
    if (isResizing && !isMaximized) {
      e.preventDefault();
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;
      
      let newWidth = resizeStartRef.current.width;
      let newHeight = resizeStartRef.current.height;
      let newX = resizeStartRef.current.windowX;
      let newY = resizeStartRef.current.windowY;
      
      const minWidth = 300;
      const minHeight = 200;
      const maxWidth = window.innerWidth - position.x;
      const maxHeight = window.innerHeight - position.y;
      
      if (resizeDirection.includes('right')) {
        newWidth = Math.max(minWidth, Math.min(maxWidth, resizeStartRef.current.width + deltaX));
      }
      if (resizeDirection.includes('left')) {
        const proposedWidth = resizeStartRef.current.width - deltaX;
        if (proposedWidth >= minWidth) {
          newWidth = proposedWidth;
          newX = resizeStartRef.current.windowX + deltaX;
        }
      }
      if (resizeDirection.includes('bottom')) {
        newHeight = Math.max(minHeight, Math.min(maxHeight, resizeStartRef.current.height + deltaY));
      }
      if (resizeDirection.includes('top')) {
        const proposedHeight = resizeStartRef.current.height - deltaY;
        if (proposedHeight >= minHeight) {
          newHeight = proposedHeight;
          newY = resizeStartRef.current.windowY + deltaY;
        }
      }
      
      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
      targetRef.current = { x: newX, y: newY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
    
    // テキスト選択を再有効化
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    (document.body.style as unknown as Record<string, string>).mozUserSelect = '';
    (document.body.style as unknown as Record<string, string>).msUserSelect = '';
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
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  // レスポンシブ対応 - 画面サイズ変更時にウィンドウサイズを調整
  useEffect(() => {
    const handleResize = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.9;
      
      setSize(prevSize => ({
        width: Math.min(prevSize.width, maxWidth),
        height: Math.min(prevSize.height, maxHeight)
      }));
      
      setPosition(prevPos => ({
        x: Math.max(0, Math.min(prevPos.x, window.innerWidth - size.width)),
        y: Math.max(32, Math.min(prevPos.y, window.innerHeight - size.height))
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size.width, size.height]);

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
        width: isMaximized ? '100%' : `${size.width}px`,
        height: isMaximized ? '100%' : `${size.height}px`,
        minWidth: isMaximized ? undefined : '300px',
        minHeight: isMaximized ? undefined : '200px',
        maxWidth: isMaximized ? '100%' : '95vw',
        maxHeight: isMaximized ? '100%' : '95vh',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: isMinimized ? 'none' : 'flex',
        flexDirection: 'column',
        transition: isResizing || isDragging ? 'none' : 'box-shadow 0.15s',
        transformOrigin: 'top left',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transformBox: 'fill-box' as React.CSSProperties['transformBox'],
        opacity: isClosing ? 0 : 1,
        zIndex: 1000,
        backgroundColor: '#3c3c3c',
        border: isMaximized ? 'none' : '1px solid #464646',
        borderRadius: isMaximized ? 0 : '8px',
        color: '#ffffff'
      }}
    >
      {/* Windows-style Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        style={{ 
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px 0 12px',
          cursor: 'move',
          backgroundColor: '#323232',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          borderBottom: '1px solid #464646',
          color: '#ffffff',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      >
        {/* Title */}
        <span style={{ 
          fontWeight: 400,
          fontSize: '13px',
          color: '#ffffff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {title}
        </span>

        {/* Controls on the right - Windows style */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }} onMouseDown={(e) => e.stopPropagation()}>
          {/* 最小化ボタン */}
          <button
            title="Minimize"
            aria-label="Minimize"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '45px', 
              height: '29px', 
              background: 'transparent', 
              border: 'none', 
              color: '#ffffff', 
              cursor: 'pointer',
              transition: 'background-color 0.1s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            onClick={() => { if (onMinimize) onMinimize(); }}
          >
            <svg width="10" height="1" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="10" height="1" fill="currentColor" />
            </svg>
          </button>

          {/* 最大化/復元ボタン */}
          <button
            title={isMaximized ? "Restore Down" : "Maximize"}
            aria-label={isMaximized ? "Restore Down" : "Maximize"}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '45px', 
              height: '29px', 
              background: 'transparent', 
              border: 'none', 
              color: '#ffffff', 
              cursor: 'pointer',
              transition: 'background-color 0.1s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            onClick={() => { if (onToggleMaximize) onToggleMaximize(); }}
          >
            {isMaximized ? (
              // 復元アイコン - 2つの重なる四角
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="0" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
                <rect x="0" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            ) : (
              // 最大化アイコン - 単一の四角
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="10" height="10" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            )}
          </button>

          {/* 閉じるボタン */}
          <button
            title="Close"
            aria-label="Close"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '45px', 
              height: '29px', 
              background: 'transparent', 
              border: 'none', 
              color: '#ffffff', 
              cursor: 'pointer',
              transition: 'background-color 0.1s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#e81123';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ffffff';
            }}
            onClick={handleClose}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 0.5L9.5 9.5M0.5 9.5L9.5 0.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
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
          maxHeight: `${size.height - 30}px`, // タイトルバーの高さを引く
        }}
      >
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Corner Handles */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '8px',
              height: '8px',
              cursor: 'nw-resize',
              zIndex: 1001,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResizeStart(e, 'nw');
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '8px',
              height: '8px',
              cursor: 'ne-resize',
              zIndex: 1001,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResizeStart(e, 'ne');
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '8px',
              height: '8px',
              cursor: 'sw-resize',
              zIndex: 1001,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResizeStart(e, 'sw');
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '8px',
              height: '8px',
              cursor: 'se-resize',
              zIndex: 1001,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResizeStart(e, 'se');
            }}
          />

          {/* Edge Handles */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '8px',
              right: '8px',
              height: '4px',
              cursor: 'n-resize',
              zIndex: 1001,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResizeStart(e, 'n');
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '8px',
              right: '8px',
              height: '4px',
              cursor: 's-resize',
              zIndex: 1001,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResizeStart(e, 's');
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '0',
              bottom: '8px',
              width: '4px',
              cursor: 'w-resize',
              zIndex: 1001,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResizeStart(e, 'w');
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '0',
              bottom: '8px',
              width: '4px',
              cursor: 'e-resize',
              zIndex: 1001,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleResizeStart(e, 'e');
            }}
          />
        </>
      )}
    </div>
  );
};

export default Window;
