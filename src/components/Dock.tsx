import React, { useEffect, useRef, useState } from 'react';

type DockProps = {
  onIconClick: (id: string) => void;
};

const Dock = ({ onIconClick }: DockProps) => {
  const dockItems = [
    { id: 'about', icon: 'user', label: 'About Me', color: '#4A90E2' },
    { id: 'skills', icon: 'tools', label: 'Skills', color: '#F5A623' },
    { id: 'projects', icon: 'folder', label: 'Projects', color: '#7ED321' },
    { id: 'achievements', icon: 'award', label: 'Achievements', color: '#D0021B' },
    { id: 'contact', icon: 'mail', label: 'Contact', color: '#9013FE' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const renderSmallIcon = (iconName: string, color: string) => {
    const iconStyle = {
      width: "32px",
      height: "32px",
      borderRadius: "8px",
      background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 2px 6px ${color}33, inset 0 1px 0 rgba(255,255,255,0.2)`,
      border: "1px solid rgba(255,255,255,0.1)"
    };

    switch (iconName) {
      case 'user':
        return (
          <div style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="#ffffff" opacity="0.95"/>
              <path d="M4 20c0-3.3137 4.03-6 8-6s8 2.6863 8 6v1H4v-1z" fill="#ffffff" opacity="0.9"/>
            </svg>
          </div>
        );
      case 'tools':
        return (
          <div style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-.71-.71-2.17-1.25-3.42 0l-3.68 3.68c-.25.25-.25.65 0 .9s.65.25.9 0l3.68-3.68c.15-.15.42-.15.57 0l3 3c.15.15.15.42 0 .57l-3.68 3.68c-.25.25-.25.65 0 .9s.65.25.9 0l3.68-3.68z" fill="#ffffff"/>
              <circle cx="12" cy="12" r="2" fill="#ffffff" opacity="0.8"/>
            </svg>
          </div>
        );
      case 'folder':
        return (
          <div style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7a2 2 0 0 1 2-2h3l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="#ffffff" opacity="0.95"/>
            </svg>
          </div>
        );
      case 'award':
        return (
          <div style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="3" fill="#ffffff" opacity="0.95"/>
              <path d="M8 21l4-3 4 3v-5H8v5z" fill="#ffffff" opacity="0.9"/>
            </svg>
          </div>
        );
      case 'mail':
        return (
          <div style={iconStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" fill="#ffffff" opacity="0.95"/>
              <path d="M3 8l9 6 9-6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        );
      default:
        return <div style={iconStyle}><span style={{color: '#fff', fontSize: '12px'}}>{iconName}</span></div>;
    }
  };

  const renderIcon = (iconName: string, color: string) => {
    const iconStyle = {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 4px 12px ${color}33, inset 0 1px 0 rgba(255,255,255,0.2)`,
      border: "1px solid rgba(255,255,255,0.1)"
    };

    switch (iconName) {
      case 'user':
        return (
          <div style={iconStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="#ffffff" opacity="0.95"/>
              <path d="M4 20c0-3.3137 4.03-6 8-6s8 2.6863 8 6v1H4v-1z" fill="#ffffff" opacity="0.9"/>
            </svg>
          </div>
        );
      case 'tools':
        return (
          <div style={iconStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-.71-.71-2.17-1.25-3.42 0l-3.68 3.68c-.25.25-.25.65 0 .9s.65.25.9 0l3.68-3.68c.15-.15.42-.15.57 0l3 3c.15.15.15.42 0 .57l-3.68 3.68c-.25.25-.25.65 0 .9s.65.25.9 0l3.68-3.68z" fill="#ffffff"/>
              <path d="M3 21l6-6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" fill="#ffffff" opacity="0.8"/>
            </svg>
          </div>
        );
      case 'folder':
        return (
          <div style={iconStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7a2 2 0 0 1 2-2h3l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="#ffffff" opacity="0.95"/>
              <path d="M3 9h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" fill="#ffffff" opacity="0.7"/>
            </svg>
          </div>
        );
      case 'award':
        return (
          <div style={iconStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="#ffffff" opacity="0.95"/>
              <path d="M8 21l4-3 4 3v-6H8v6z" fill="#ffffff" opacity="0.9"/>
              <circle cx="12" cy="8" r="2" fill="#ffffff" opacity="0.7"/>
            </svg>
          </div>
        );
      case 'mail':
        return (
          <div style={iconStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" fill="#ffffff" opacity="0.95"/>
              <path d="M3 8l9 6 9-6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
              <rect x="3" y="6" width="18" height="2" rx="1" fill="#ffffff" opacity="0.8"/>
            </svg>
          </div>
        );
      default:
        return <div style={iconStyle}><span style={{color: '#fff'}}>{iconName}</span></div>;
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
        zIndex: 9999, // Dockコンテナ自体も高いz-indexに
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
              padding: '40px',
              background: 'linear-gradient(135deg, rgba(18,18,20,0.95) 0%, rgba(25,25,30,0.95) 100%)',
              zIndex: 10000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}
            onKeyDown={(e) => { if (e.key === 'Escape') setShowApps(false); }}
          >
            <div style={{ width: 'min(1200px, 90%)', position: 'relative' }}>
              {/* 閉じるボタン */}
              <button
                onClick={() => setShowApps(false)}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '0px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid #ffffff',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#ffffff',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  zIndex: 10001
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label="アプリ一覧を閉じる"
              >
                ×
              </button>

              {/* 検索バー */}
              <div style={{
                marginBottom: '32px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <div style={{
                  position: 'relative',
                  width: '400px'
                }}>
                  <input
                    type="text"
                    placeholder="アプリケーションを検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 44px',
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      fontSize: '16px',
                      outline: 'none',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      opacity: 0.7
                    }}
                  >
                    <circle cx="11" cy="11" r="8" stroke="#ffffff" strokeWidth="2"/>
                    <path d="m21 21-4.35-4.35" stroke="#ffffff" strokeWidth="2"/>
                  </svg>
                </div>
              </div>

              {/* タイトル */}
              <h2 style={{
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '40px',
                fontSize: '28px',
                fontWeight: '300',
                letterSpacing: '0.5px'
              }}>
                アプリケーション
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: '24px',
                justifyItems: 'center',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                {dockItems
                  .filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onIconClick(item.id); setShowApps(false); }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      borderRadius: '16px',
                      transition: 'all 0.2s ease',
                      minWidth: '120px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ 
                      width: '96px', 
                      height: '96px', 
                      borderRadius: '16px', 
                      background: 'rgba(255,255,255,0.02)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      marginBottom: '12px'
                    }}>
                      {renderIcon(item.icon, item.color)}
                    </div>
                    <div style={{ 
                      marginTop: '8px', 
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'center',
                      lineHeight: '1.2'
                    }}>
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
              
              {/* ESCキーのヒント */}
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
                marginTop: '32px',
                fontSize: '14px',
                fontWeight: '300'
              }}>
                ESCキーまたは×ボタンで閉じる
              </p>
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
            <span style={{ userSelect: 'none', display: 'inline-flex' }}>
              {renderSmallIcon(item.icon, item.color)}
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
