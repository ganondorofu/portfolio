'use client';

import React, { useState, useEffect } from 'react';
import AppHeader from './AppHeader';

interface LocalSettings {
  theme: 'dark' | 'light';
  dockPosition: 'left' | 'right' | 'bottom';
  autoHideDock: boolean;
  enableAnimations: boolean;
  windowOpacity: number;
  fontSize: 'small' | 'medium' | 'large';
  enableSounds: boolean;
  mobileMode: boolean;
}

interface Settings {
  theme: 'dark' | 'light';
  dockPosition: 'left' | 'right' | 'bottom';
  autoHideDock: boolean;
  enableAnimations: boolean;
  windowOpacity: number;
  fontSize: 'small' | 'medium' | 'large';
  enableSounds: boolean;
  mobileMode: boolean;
}

interface SettingsWindowProps {
  onSettingsChange?: (settings: Settings) => void;
}

const SettingsWindow: React.FC<SettingsWindowProps> = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioSettings');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      theme: 'dark',
      dockPosition: 'left',
      autoHideDock: false,
      enableAnimations: true,
      windowOpacity: 95,
      fontSize: 'medium',
      enableSounds: false,
      mobileMode: window?.innerWidth < 768
    };
  });

  const [activeTab, setActiveTab] = useState<'appearance' | 'behavior' | 'mobile'>('appearance');

  useEffect(() => {
    localStorage.setItem('portfolioSettings', JSON.stringify(settings));
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    const defaultSettings: Settings = {
      theme: 'dark',
      dockPosition: 'left',
      autoHideDock: false,
      enableAnimations: true,
      windowOpacity: 95,
      fontSize: 'medium',
      enableSounds: false,
      mobileMode: window?.innerWidth < 768
    };
    setSettings(defaultSettings);
  };

  const TabButton = ({ tab, label, isActive, onClick }: {
    tab: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        backgroundColor: isActive ? '#374151' : 'transparent',
        color: isActive ? '#ffffff' : '#9ca3af',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'all 0.2s ease'
      }}
      onMouseOver={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = '#1f2937';
          e.currentTarget.style.color = '#d1d5db';
        }
      }}
      onMouseOut={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#9ca3af';
        }
      }}
    >
      {label}
    </button>
  );

  const SettingRow = ({ label, description, children }: {
    label: string;
    description?: string;
    children: React.ReactNode;
  }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #374151'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, marginBottom: '2px' }}>
          {label}
        </div>
        {description && (
          <div style={{ color: '#9ca3af', fontSize: '12px' }}>
            {description}
          </div>
        )}
      </div>
      <div style={{ marginLeft: '16px' }}>
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '44px',
        height: '24px',
        backgroundColor: checked ? '#10b981' : '#374151',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.2s ease'
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          transition: 'left 0.2s ease'
        }}
      />
    </button>
  );

  const Select = ({ value, options, onChange }: {
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
  }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        backgroundColor: '#374151',
        color: '#ffffff',
        border: '1px solid #4b5563',
        borderRadius: '6px',
        padding: '6px 12px',
        fontSize: '14px',
        cursor: 'pointer'
      }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const Slider = ({ value, min, max, onChange }: {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
  }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '120px',
          accentColor: '#10b981'
        }}
      />
      <span style={{ color: '#9ca3af', fontSize: '12px', minWidth: '32px' }}>
        {value}%
      </span>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#111827' }}>
      <AppHeader title="Settings" subtitle="Portfolio Configuration" />
      
      <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          {/* タブナビゲーション */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            padding: '4px',
            backgroundColor: '#1f2937',
            borderRadius: '8px'
          }}>
            <TabButton
              tab="appearance"
              label="外観"
              isActive={activeTab === 'appearance'}
              onClick={() => setActiveTab('appearance')}
            />
            <TabButton
              tab="behavior"
              label="動作"
              isActive={activeTab === 'behavior'}
              onClick={() => setActiveTab('behavior')}
            />
            <TabButton
              tab="mobile"
              label="モバイル"
              isActive={activeTab === 'mobile'}
              onClick={() => setActiveTab('mobile')}
            />
          </div>

          {/* 外観設定 */}
          {activeTab === 'appearance' && (
            <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '20px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                外観設定
              </h3>
              
              <SettingRow
                label="テーマ"
                description="ライト/ダークテーマの切り替え"
              >
                <Select
                  value={settings.theme}
                  options={[
                    { value: 'dark', label: 'ダーク' },
                    { value: 'light', label: 'ライト' }
                  ]}
                  onChange={(value) => updateSetting('theme', value as 'dark' | 'light')}
                />
              </SettingRow>

              <SettingRow
                label="フォントサイズ"
                description="UI全体のフォントサイズ"
              >
                <Select
                  value={settings.fontSize}
                  options={[
                    { value: 'small', label: '小' },
                    { value: 'medium', label: '中' },
                    { value: 'large', label: '大' }
                  ]}
                  onChange={(value) => updateSetting('fontSize', value as 'small' | 'medium' | 'large')}
                />
              </SettingRow>

              <SettingRow
                label="ウィンドウ透明度"
                description="ウィンドウの透明度を調整"
              >
                <Slider
                  value={settings.windowOpacity}
                  min={70}
                  max={100}
                  onChange={(value) => updateSetting('windowOpacity', value)}
                />
              </SettingRow>
            </div>
          )}

          {/* 動作設定 */}
          {activeTab === 'behavior' && (
            <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '20px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                動作設定
              </h3>
              
              <SettingRow
                label="Dockの位置"
                description="Dockの表示位置を設定"
              >
                <Select
                  value={settings.dockPosition}
                  options={[
                    { value: 'left', label: '左' },
                    { value: 'right', label: '右' },
                    { value: 'bottom', label: '下' }
                  ]}
                  onChange={(value) => updateSetting('dockPosition', value as 'left' | 'right' | 'bottom')}
                />
              </SettingRow>

              <SettingRow
                label="Dock自動隠し"
                description="使用していない時にDockを隠す"
              >
                <Toggle
                  checked={settings.autoHideDock}
                  onChange={(checked) => updateSetting('autoHideDock', checked)}
                />
              </SettingRow>

              <SettingRow
                label="アニメーション"
                description="ウィンドウのアニメーション効果"
              >
                <Toggle
                  checked={settings.enableAnimations}
                  onChange={(checked) => updateSetting('enableAnimations', checked)}
                />
              </SettingRow>

              <SettingRow
                label="効果音"
                description="クリックやアクション時の効果音"
              >
                <Toggle
                  checked={settings.enableSounds}
                  onChange={(checked) => updateSetting('enableSounds', checked)}
                />
              </SettingRow>
            </div>
          )}

          {/* モバイル設定 */}
          {activeTab === 'mobile' && (
            <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '20px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>
                モバイル設定
              </h3>
              
              <SettingRow
                label="モバイルモード"
                description="タッチデバイス向けの最適化"
              >
                <Toggle
                  checked={settings.mobileMode}
                  onChange={(checked) => updateSetting('mobileMode', checked)}
                />
              </SettingRow>

              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: '#374151',
                borderRadius: '6px'
              }}>
                <h4 style={{ color: '#ffffff', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
                  モバイル最適化情報
                </h4>
                <ul style={{ color: '#d1d5db', fontSize: '12px', lineHeight: 1.6, paddingLeft: '16px' }}>
                  <li>タッチ操作でウィンドウのドラッグ・リサイズが可能</li>
                  <li>Dockが画面下部に配置され、より大きなタッチターゲット</li>
                  <li>ダブルタップでウィンドウ最大化</li>
                  <li>スワイプジェスチャーでDock表示/非表示</li>
                </ul>
              </div>
            </div>
          )}

          {/* リセットボタン */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              onClick={resetSettings}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
            >
              設定をリセット
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsWindow;
