import React, { useEffect, useRef, useState } from 'react';

type DockProps = {
  onIconClick: (id: string) => void;
};

const Dock = ({ onIconClick }: DockProps) => {
  const dockItems = [
  { id: 'about', icon: 'user', label: 'About Me' },
    { id: 'skills', icon: 'tools', label: 'Skills' },
    { id: 'projects', icon: 'folder', label: 'Projects' },
    { id: 'achievements', icon: 'award', label: 'Achievements' },
    { id: 'contact', icon: 'mail', label: 'Contact' },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="#ffffff" opacity="0.9"/>
            <path d="M4 20c0-3.3137 4.03-6 8-6s8 2.6863 8 6v1H4v-1z" fill="#ffffff" opacity="0.85"/>
          </svg>
        );
      case 'tools':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M21 2l-6 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2l-6 6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 21l6-6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 21l6-6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'folder':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M3 7a2 2 0 0 1 2-2h3l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="#ffffff" opacity="0.95"/>
          </svg>
        );
      case 'award':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <circle cx="12" cy="8" r="3" fill="#ffffff" opacity="0.95"/>
            <path d="M8 21l4-3 4 3v-5H8v5z" fill="#ffffff" opacity="0.9"/>
          </svg>
        );
      case 'mail':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M3 8l9 6 9-6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M21 6H3v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        );
      default:
        return <span>{iconName}</span>;
    }
  };

  const [showApps, setShowApps] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setShowApps(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowApps(false);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <aside
      style={{
        position: 'fixed',
        top: '36px',
        left: 0,
        height: 'calc(100vh - 36px)',
        width: '64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
        zIndex: 55,
        backgroundColor: 'rgba(20,20,20,0.8)',
        borderRight: '1px solid rgba(255,255,255,0.04)',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
      ref={containerRef}
    >
      {/* Ubuntu-style app launcher (top non-interactive) */}
      <div>
          <div
            aria-hidden
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'default',
              backgroundColor: 'transparent',
              marginBottom: '6px',
              opacity: 0.9,
              transition: 'opacity 0.12s ease'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="8" height="8" rx="2" fill="#fff" opacity="0.95"/>
              <rect x="13" y="3" width="8" height="8" rx="2" fill="#fff" opacity="0.6"/>
              <rect x="3" y="13" width="8" height="8" rx="2" fill="#fff" opacity="0.6"/>
              <rect x="13" y="13" width="8" height="8" rx="2" fill="#fff" opacity="0.45"/>
            </svg>
          </div>

        {showApps && (
          // Fullscreen overlay rendered inside the aside so clicks inside it don't auto-close via document listener
          <div
            role="dialog"
            aria-label="Applications"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              inset: 0,
              padding: '48px 24px',
              background: 'rgba(8,8,10,0.9)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onKeyDown={(e) => { if (e.key === 'Escape') setShowApps(false); }}
          >
            <div style={{ width: 'min(1200px, 90%)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '18px' }}>
        {dockItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onIconClick(item.id); setShowApps(false); }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '12px',
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {renderIcon(item.icon)}
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '13px' }}>{item.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

  <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255,255,255,0.04)', margin: '8px 0' }} />

        {dockItems.map((item, idx) => (
          <div
            key={item.id}
            className="dock-item"
            onClick={() => onIconClick(item.id)}
            style={{
              position: 'relative',
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'transform 0.12s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: idx === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
              color: '#ffffff',
              fontFamily: 'Inter, Arial, sans-serif',
              fontSize: '20px',
              border: 'none',
              marginBottom: '10px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
              if (tooltip) tooltip.style.opacity = '1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;
              if (tooltip) tooltip.style.opacity = '0';
            }}
          >
            <span style={{ userSelect: 'none', color: '#ffffff', fontSize: '20px', display: 'inline-flex' }}>
              {renderIcon(item.icon)}
            </span>
            <div
              className="tooltip"
              style={{
                position: 'absolute',
                left: '100%',
                marginLeft: '8px',
                padding: '4px 8px',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                opacity: 0,
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
                zIndex: 1000,
                whiteSpace: 'nowrap',
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                fontSize: '12px',
                border: '1px solid #555555'
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: Show Applications */}
      <div
        role="button"
        aria-label="Show all applications"
        onClick={() => setShowApps(true)}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowApps(true); }}
        title="アプリケーションを表示"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#404040',
          border: '1px solid #555555',
          color: '#ffffff',
          fontSize: '18px'
        }}
      >
        ⠿
      </div>
    </aside>
  );
};

export default Dock;
