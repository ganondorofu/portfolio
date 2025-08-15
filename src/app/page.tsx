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

// Define the shape of a window object
interface WindowState {
  id: string;
  title: string;
  content: React.ReactNode;
  position?: { x: number; y: number };
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
};

export default function Home() {
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
      const newWindow = { id, ...content, position, isMinimized: false, isMaximized: false } as WindowState;
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

