'use client';

import React, { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Dock from '@/components/Dock';
import Window from '@/components/Window';
import ProfileWindow from '@/components/ProfileWindow';
import SkillsWindow from '@/components/SkillsWindow';
import ProjectsWindow from '@/components/ProjectsWindow';
import AchievementsWindow from '@/components/AchievementsWindow';
import ContactWindow from '@/components/ContactWindow';
import MinesweeperWindow from '@/components/MinesweeperWindow';
import CalculatorWindow from '@/components/CalculatorWindow';
import SettingsWindow from '@/components/SettingsWindow';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';

// Define the shape of a window object
interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  isMinimized?: boolean;
  isMaximized?: boolean;
}

// Define the content for each window
const windowContent: { [key: string]: Omit<WindowState, 'id'> } = {
  about: {
    title: 'About Me - yoneyone',
    content: <ProfileWindow />,
  },
  skills: {
    title: 'Skills & Tech Stack',
    content: <SkillsWindow />,
  },
  projects: {
    title: 'Projects - Portfolio',
    content: <ProjectsWindow />,
  },
  achievements: {
    title: 'Achievements & Awards',
    content: <AchievementsWindow />,
  },
  contact: {
    title: 'Contact Me',
    content: <ContactWindow />,
  },
  minesweeper: {
    title: 'Minesweeper - Classic Game',
    content: <MinesweeperWindow />,
  },
  calculator: {
    title: 'Calculator - Simple & Fast',
    content: <CalculatorWindow />,
  },
  settings: {
    title: 'Settings - Configuration',
    content: <SettingsWindow />,
  },
};

function HomeContent() {
  const { settings, isMobile } = useSettings();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 初期表示でAboutウィンドウを開く
  useEffect(() => {
    if (isInitialized) return;
    
    const content = windowContent['about'];
    if (!content) {
      setIsInitialized(true);
      return;
    }

    const id = `about-${Date.now()}`;
    const position = { x: 80, y: 50 };
    setWindows([{ id, ...content, position, isMinimized: false, isMaximized: false } as WindowState]);
    setIsInitialized(true);
  }, [isInitialized]);

  const openWindow = (windowId: string) => {
    console.log('Opening window:', windowId); // デバッグログ
    const content = windowContent[windowId];
    if (!content) {
      console.error('Window content not found for:', windowId);
      return;
    }

    // 既に同タイプのウィンドウがあれば最小化解除して手前に出す
    setWindows(prev => {
      const existingIndex = prev.findIndex(w => w.id.startsWith(windowId + '-'));
      if (existingIndex !== -1) {
        console.log('Restoring existing window:', windowId);
        const existing = prev[existingIndex];
        // 最小化解除しつつ配列末尾に移動して前面表示
        const without = [...prev.slice(0, existingIndex), ...prev.slice(existingIndex + 1)];
        return [...without, { ...existing, isMinimized: false }];
      }

      console.log('Creating new window:', windowId); // デバッグログ
      const id = `${windowId}-${Date.now()}`;
      const position = {
        x: 80 + (prev.length * 30),
        y: 50 + (prev.length * 30),
      };
      
      // ウィンドウのタイプに応じてサイズを設定
      const getWindowSize = (type: string) => {
        switch (type) {
          case 'projects':
            return { width: 900, height: 650 };
          case 'minesweeper':
            return { width: 600, height: 700 };
          case 'calculator':
            return { width: 400, height: 600 };
          case 'settings':
            return { width: 700, height: 500 };
          default:
            return { width: 800, height: 600 };
        }
      };
      
      const size = getWindowSize(windowId);
      const newWindow = { id, ...content, position, size, isMinimized: false, isMaximized: false } as WindowState;
      console.log('New window created:', newWindow); // デバッグログ
      return [...prev, newWindow];
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prevWindows => prevWindows.filter(win => win.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const restoreWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, isMaximized: false } : w));
  };

  const toggleMaximize = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  return (
    <main
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        // Ubuntu 20.04 系の壁紙トーンに近いグラデーション
        background: 'radial-gradient(1200px 800px at 70% 30%, rgba(255,128,0,0.2), transparent 60%), radial-gradient(1000px 700px at 30% 70%, rgba(128,0,255,0.25), transparent 60%), linear-gradient(135deg, #2a0a3a 0%, #3a0d58 40%, #5c0d4f 70%, #6d1338 100%)',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <TopBar />
      <Dock onIconClick={openWindow} />

      {/* デスクトップアプリアイコン */}
      <div style={{
        position: 'absolute',
        top: isMobile || settings.mobileMode ? '40px' : '80px',
        left: isMobile || settings.mobileMode ? '20px' : 
              (settings.dockPosition === 'right' ? '20px' : '120px'),
        right: isMobile || settings.mobileMode ? '20px' : 
               (settings.dockPosition === 'right' ? '120px' : 'auto'),
        display: 'grid',
        gridTemplateColumns: isMobile || settings.mobileMode ? 
          'repeat(auto-fill, minmax(80px, 1fr))' : 'repeat(auto-fill, 80px)',
        gap: isMobile || settings.mobileMode ? '16px' : '24px',
        padding: '20px',
        paddingBottom: isMobile || settings.mobileMode ? '100px' : '20px',
        zIndex: 1,
        maxHeight: isMobile || settings.mobileMode ? 'calc(100vh - 120px)' : 'auto',
        overflowY: isMobile || settings.mobileMode ? 'auto' : 'visible'
      }}>
        {/* About アプリアイコン */}
        <div
          onClick={() => openWindow('about')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4A90E2 0%, #4A90E2dd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px #4A90E233, inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '6px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="#ffffff" opacity="0.95"/>
              <path d="M4 20c0-3.3137 4.03-6 8-6s8 2.6863 8 6v1H4v-1z" fill="#ffffff" opacity="0.9"/>
            </svg>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            lineHeight: '1.2'
          }}>About</span>
        </div>

        {/* Projects アプリアイコン */}
        <div
          onClick={() => openWindow('projects')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #7ED321 0%, #7ED321dd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px #7ED32133, inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '6px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7a2 2 0 0 1 2-2h3l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="#ffffff" opacity="0.95"/>
              <path d="M3 9h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" fill="#ffffff" opacity="0.7"/>
            </svg>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            lineHeight: '1.2'
          }}>Projects</span>
        </div>

        {/* Skills アプリアイコン */}
        <div
          onClick={() => openWindow('skills')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #F5A623 0%, #F5A623dd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px #F5A62333, inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '6px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.71 8.71c1.25-1.25.68-2.71 0-3.42l-3-3c-.71-.71-2.17-1.25-3.42 0l-3.68 3.68c-.25.25-.25.65 0 .9s.65.25.9 0l3.68-3.68c.15-.15.42-.15.57 0l3 3c.15.15.15.42 0 .57l-3.68 3.68c-.25.25-.25.65 0 .9s.65.25.9 0l3.68-3.68z" fill="#ffffff"/>
              <circle cx="12" cy="12" r="3" fill="#ffffff" opacity="0.8"/>
            </svg>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            lineHeight: '1.2'
          }}>Skills</span>
        </div>

        {/* Achievements アプリアイコン */}
        <div
          onClick={() => openWindow('achievements')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #D0021B 0%, #D0021Bdd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px #D0021B33, inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '6px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" fill="#ffffff" opacity="0.95"/>
              <path d="M8 21l4-3 4 3v-6H8v6z" fill="#ffffff" opacity="0.9"/>
              <circle cx="12" cy="8" r="2" fill="#ffffff" opacity="0.7"/>
            </svg>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            lineHeight: '1.2'
          }}>Awards</span>
        </div>

        {/* Contact アプリアイコン */}
        <div
          onClick={() => openWindow('contact')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #9013FE 0%, #9013FEdd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px #9013FE33, inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '6px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" fill="#ffffff" opacity="0.95"/>
              <path d="M3 8l9 6 9-6" stroke="#9013FE" strokeWidth="2" strokeLinecap="round"/>
              <rect x="3" y="6" width="18" height="2" rx="1" fill="#ffffff" opacity="0.8"/>
            </svg>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            lineHeight: '1.2'
          }}>Contact</span>
        </div>

        {/* Minesweeper アプリアイコン */}
        <div
          onClick={() => openWindow('minesweeper')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #6366f1dd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px #6366f133, inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '6px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" fill="#ffffff" opacity="0.2"/>
              <rect x="5" y="5" width="14" height="14" rx="1" fill="#ffffff" opacity="0.3"/>
              <circle cx="8" cy="8" r="1" fill="#ff4444"/>
              <circle cx="12" cy="8" r="1" fill="#ff4444"/>
              <circle cx="16" cy="8" r="1" fill="#ff4444"/>
              <text x="8" y="15" fill="#ffffff" fontSize="6" textAnchor="middle">1</text>
              <text x="12" y="15" fill="#ffffff" fontSize="6" textAnchor="middle">2</text>
              <text x="16" y="15" fill="#ffffff" fontSize="6" textAnchor="middle">3</text>
            </svg>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            lineHeight: '1.2'
          }}>Minesweeper</span>
        </div>

        {/* Calculator アプリアイコン */}
        <div
          onClick={() => openWindow('calculator')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #3b82f6dd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px #3b82f633, inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '6px'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="3" width="16" height="18" rx="2" fill="#ffffff" opacity="0.95"/>
              <rect x="6" y="5" width="12" height="3" rx="1" fill="#3b82f6" opacity="0.8"/>
              <circle cx="7" cy="11" r="0.8" fill="#3b82f6"/>
              <circle cx="10" cy="11" r="0.8" fill="#3b82f6"/>
              <circle cx="13" cy="11" r="0.8" fill="#3b82f6"/>
              <circle cx="16" cy="11" r="0.8" fill="#3b82f6"/>
              <circle cx="7" cy="14" r="0.8" fill="#3b82f6"/>
              <circle cx="10" cy="14" r="0.8" fill="#3b82f6"/>
              <circle cx="13" cy="14" r="0.8" fill="#3b82f6"/>
              <circle cx="16" cy="14" r="0.8" fill="#3b82f6"/>
              <circle cx="7" cy="17" r="0.8" fill="#3b82f6"/>
              <circle cx="10" cy="17" r="0.8" fill="#3b82f6"/>
              <circle cx="13" cy="17" r="0.8" fill="#3b82f6"/>
              <circle cx="16" cy="17" r="0.8" fill="#3b82f6"/>
            </svg>
          </div>
          <span style={{
            fontSize: '11px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            lineHeight: '1.2'
          }}>Calculator</span>
        </div>
      </div>

      {/* ウィンドウコンテナ（左ドック分のオフセット + トップバー分の余白） */}
      <div
        style={{
          position: 'relative',
          marginLeft: '80px', // 左ドック64px + 余白
          paddingTop: '40px', // トップバー分の余白
          height: '100%',
        }}
      >
        {windows.map((win) => (
          <Window
            key={win.id}
            title={win.title}
            onClose={() => closeWindow(win.id)}
            initialPosition={win.position}
            initialSize={win.size}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            onMinimize={() => minimizeWindow(win.id)}
            onToggleMaximize={() => toggleMaximize(win.id)}
          >
            {win.content}
          </Window>
        ))}

        {/* タスクバー（最小化ウィンドウを表示） */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 12, display: 'flex', justifyContent: 'center', gap: '8px', pointerEvents: 'auto' }}>
          {windows.filter(w => w.isMinimized).map(w => (
            <button key={w.id} onClick={() => restoreWindow(w.id)} style={{ minWidth: 120, padding: '8px 12px', background: '#1f1f1f', border: '1px solid #4b5563', color: '#ffffff', borderRadius: 6, cursor: 'pointer' }}>
              {w.title}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <SettingsProvider>
      <HomeContent />
    </SettingsProvider>
  );
}

