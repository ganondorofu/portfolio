import React, { useState } from 'react';
import AppHeader from './AppHeader';

const ProjectsWindow: React.FC = () => {
  const projects = [
    {
      id: 1,
      name: 'ClassConnect',
      category: 'Web Application',
      description: 'クラスの連絡・課題・時間割管理ツール',
      details: 'Firebase + React + TypeScript + AI（Gemini API）を使用したクラス情報共有システム。リアルタイム同期とAI要約機能を搭載。',
      technologies: ['React', 'TypeScript', 'Firebase', 'Gemini API', 'Tailwind CSS', 'Vercel'],
      status: 'Production',
      url: 'https://class-connect-red.vercel.app/',
      github: 'https://github.com/ganondorofu/ClassConnect',
  icon: 'project-school',
  color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'CanSat プロジェクト',
      category: 'IoT/Embedded',
      description: '飛行ログ・動画記録システム + BLE探索支援',
      details: 'Spresenseを使用した小型衛星模擬システム。飛行データの記録、動画撮影、BLE通信による位置探索機能を実装。',
      technologies: ['C++', 'Spresense', 'BLE', 'センサー制御'],
      status: 'Completed',
      github: 'https://github.com/ganondorofu/stem_rocket_project',
  icon: 'project-cansat',
  color: 'bg-red-500'
    },
    {
      id: 3,
      name: '自宅サーバー群',
      category: 'Infrastructure',
      description: 'Proxmoxベースの仮想化インフラストラクチャ',
      details: 'ゲームサーバー、Nextcloud、監視ダッシュボード、nginxリバースプロキシを統合した自宅サーバー環境。',
      technologies: ['Proxmox', 'Linux', 'nginx', 'Grafana', 'Docker', 'Nextcloud'],
      status: 'Active',
  icon: 'project-server',
  color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Reminder アプリ',
      category: 'Mobile App',
      description: '持ち物チェック＆通知アプリ',
      details: 'Flutter製のクロスプラットフォームアプリ。ローカルDB対応で、持ち物の管理と通知機能を提供。',
      technologies: ['Flutter', 'Dart', 'SQLite', 'Local Notifications'],
      status: 'Completed',
  icon: 'project-mobile',
  color: 'bg-purple-500'
    },
    {
      id: 5,
      name: 'STEM_Bot',
      category: 'Bot Development',
      description: 'Discord用多機能ボット',
      details: 'TypeScriptで開発されたDiscordボット。部活動の情報共有や自動化機能を提供。',
      technologies: ['TypeScript', 'Discord.js', 'Node.js'],
      status: 'Active',
      github: 'https://github.com/ganondorofu/stem_Bot',
  icon: 'project-bot',
  color: 'bg-indigo-500'
    },
    {
      id: 6,
      name: 'portableClipboard',
      category: 'Desktop App',
      description: 'クリップボード管理ツール',
      details: 'C#で開発されたWindows用クリップボード拡張ツール。履歴管理と効率的なコピペ作業をサポート。',
      technologies: ['C#', 'WPF', '.NET'],
      status: 'Completed',
      github: 'https://github.com/ganondorofu/portableClipboard',
  icon: 'project-clipboard',
  color: 'bg-orange-500'
    },
    {
      id: 7,
      name: 'STEM Arcade',
      category: 'Unity Showcase',
      description: 'Unityで制作した教育向けミニゲーム集の展示サイト。プレイ可能なビルドを配置。',
      details: 'Unityで制作した複数のミニゲームをまとめた展示サイト。WebGLビルドのデモ、リポジトリ、遊び方の説明を掲載。',
      technologies: ['Unity', 'C#', 'WebGL', 'GitHub'],
      status: 'Active',
      github: 'https://github.com/ganondorofu/STEM_Arcade',
  icon: 'project-monitor',
  color: 'bg-yellow-500'
    }
  ];
  const [selected, setSelected] = useState(projects[0]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Production': { color: 'bg-green-600', text: '本番稼働' },
      'Active': { color: 'bg-blue-600', text: '開発中' },
      'Completed': { color: 'bg-gray-600', text: '完了' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Completed;
    
    const color =
      status === 'Production' ? '#16a34a' : status === 'Active' ? '#2563eb' : '#6b7280';
    return (
      <span style={{ padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, color: '#fff', backgroundColor: color }}>
        {config.text}
      </span>
    );
  };
 

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#1a0d1f' }}>
      <AppHeader title="Projects" subtitle="File Explorer" />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 左サイドバー */}
        <div style={{ 
          width: '260px', 
          minWidth: '260px',
          background: '#1a0d1f', 
          borderRight: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* サイドバーヘッダー */}
          <div style={{ 
            padding: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#d1d5db">
              <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
            </svg>
            <span style={{ color: '#d1d5db', fontSize: '14px', fontWeight: '500' }}>Projects</span>
          </div>

          {/* プロジェクト一覧 */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <div style={{ padding: '8px' }}>
              {/* 最近のアイテム */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '8px 12px',
                  color: '#9ca3af',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Recent
                </div>
                <div onClick={() => setSelected(projects[0])} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  marginLeft: '16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: selected.id === projects[0].id ? 'rgba(147, 197, 253, 0.15)' : 'transparent'
                }} onMouseOver={(e) => {
                  if (selected.id !== projects[0].id) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }} onMouseOut={(e) => {
                  if (selected.id !== projects[0].id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#93c5fd">
                    <path d="M12 2l-3.09 6.26L2 9.27l5 4.87L5.82 21 12 17.77 18.18 21 17 14.14l5-4.87-6.91-1.01L12 2z"/>
                  </svg>
                  <span style={{ color: '#d1d5db', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{projects[0].name}</span>
                </div>
              </div>

              {/* お気に入り */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '8px 12px',
                  color: '#9ca3af',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  Starred
                </div>
                {projects.filter(p => p.status === 'Production' || p.status === 'Active').slice(0, 3).map(project => (
                  <div key={project.id} onClick={() => setSelected(project)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    marginLeft: '16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: selected.id === project.id ? 'rgba(147, 197, 253, 0.15)' : 'transparent'
                  }} onMouseOver={(e) => {
                    if (selected.id !== project.id) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }} onMouseOut={(e) => {
                    if (selected.id !== project.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '3px',
                      background: project.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '8px',
                      color: '#fff',
                      fontWeight: '600',
                      flexShrink: 0
                    }}>
                      {project.icon.slice(0, 1).toUpperCase()}
                    </div>
                    <span style={{ color: '#d1d5db', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name}</span>
                  </div>
                ))}
              </div>

              {/* 全プロジェクト */}
              <div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '8px 12px',
                  color: '#9ca3af',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
                  </svg>
                  All Projects
                </div>
                {projects.map(project => (
                  <div key={project.id} onClick={() => setSelected(project)} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    marginLeft: '16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    background: selected.id === project.id ? 'rgba(147, 197, 253, 0.15)' : 'transparent'
                  }} onMouseOver={(e) => {
                    if (selected.id !== project.id) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }
                  }} onMouseOut={(e) => {
                    if (selected.id !== project.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '3px',
                      background: project.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '8px',
                      color: '#fff',
                      fontWeight: '600',
                      flexShrink: 0
                    }}>
                      {project.icon.slice(0, 1).toUpperCase()}
                    </div>
                    <span style={{ color: '#d1d5db', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右メインコンテンツ */}
        <div style={{ flex: 1, background: '#0f0a13', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {selected ? (
            <div style={{ padding: '24px', overflow: 'auto', height: '100%' }}>
              {/* プロジェクトヘッダー */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: selected.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    color: '#fff',
                    fontWeight: '600'
                  }}>
                    {selected.icon.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '24px', marginBottom: '4px', wordWrap: 'break-word' }}>{selected.name}</div>
                    <div style={{ fontSize: '14px', color: '#9ca3af' }}>{selected.category}</div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {getStatusBadge(selected.status)}
                  </div>
                </div>
              </div>

              {/* プロジェクト詳細 */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontWeight: 600, color: '#d1d5db', fontSize: '16px', marginBottom: '12px' }}>概要</h3>
                <p style={{ fontSize: '14px', color: '#e5e7eb', marginBottom: '16px', lineHeight: 1.6, wordWrap: 'break-word' }}>{selected.description}</p>
                <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.6, wordWrap: 'break-word' }}>{selected.details}</p>
              </div>

              {/* 技術スタック */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontWeight: 600, color: '#d1d5db', fontSize: '16px', marginBottom: '12px' }}>技術スタック</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selected.technologies.map((tech, i) => (
                    <span key={i} style={{ 
                      padding: '6px 12px', 
                      backgroundColor: 'rgba(255,255,255,0.1)', 
                      borderRadius: '6px', 
                      fontSize: '12px', 
                      color: '#d1d5db',
                      border: '1px solid rgba(255,255,255,0.2)',
                      whiteSpace: 'nowrap'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* リンク */}
              <div>
                <h3 style={{ fontWeight: 600, color: '#d1d5db', fontSize: '16px', marginBottom: '12px' }}>リンク</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {selected.github && (
                    <a href={selected.github} target="_blank" rel="noopener noreferrer" style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#93c5fd', 
                      textDecoration: 'none',
                      fontSize: '14px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      whiteSpace: 'nowrap'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {selected.url && (
                    <a href={selected.url} target="_blank" rel="noopener noreferrer" style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      color: '#86efac', 
                      textDecoration: 'none',
                      fontSize: '14px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      whiteSpace: 'nowrap'
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: '#9ca3af', 
              fontSize: '16px'
            }}>
              プロジェクトを選択してください
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;
