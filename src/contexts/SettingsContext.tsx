'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Settings {
  theme: 'dark' | 'light';
  dockPosition: 'left' | 'right' | 'bottom';
  autoHideDock: boolean;
  enableAnimations: boolean;
  windowOpacity: number;
  fontSize: 'small' | 'medium' | 'large';
  enableSounds: boolean;
  mobileMode: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  isMobile: boolean;
}

const defaultSettings: Settings = {
  theme: 'dark',
  dockPosition: 'left',
  autoHideDock: false,
  enableAnimations: true,
  windowOpacity: 95,
  fontSize: 'medium',
  enableSounds: false,
  mobileMode: false
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      // 保存された設定を読み込み
      const savedSettings = localStorage.getItem('portfolioSettings');
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings({ ...defaultSettings, ...parsed });
        } catch (error) {
          console.error('Failed to parse saved settings:', error);
        }
      }

      // モバイル検出
      const checkMobile = () => {
        const isMobileDevice = window.innerWidth < 768 || 
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsMobile(isMobileDevice);
        
        // モバイルデバイスの場合、自動的にモバイルモードを有効化
        if (isMobileDevice) {
          setSettings(prev => ({
            ...prev,
            mobileMode: true,
            dockPosition: 'bottom',
            autoHideDock: true
          }));
        }
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  useEffect(() => {
    // 設定が変更されたときにローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioSettings', JSON.stringify(settings));
    }

    // CSSカスタムプロパティを更新
    const root = document.documentElement;
    
    // フォントサイズ
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    root.style.setProperty('--base-font-size', fontSizeMap[settings.fontSize]);

    // ウィンドウ透明度
    root.style.setProperty('--window-opacity', (settings.windowOpacity / 100).toString());

    // テーマ
    if (settings.theme === 'light') {
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f3f4f6');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#6b7280');
    } else {
      root.style.setProperty('--bg-primary', '#111827');
      root.style.setProperty('--bg-secondary', '#1f2937');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#d1d5db');
    }

    // アニメーション
    root.style.setProperty('--animation-duration', settings.enableAnimations ? '0.2s' : '0s');

  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isMobile }}>
      {children}
    </SettingsContext.Provider>
  );
};
