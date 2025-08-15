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
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppHeader title="Projects" subtitle="File Explorer" />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', background: '#08080a' }}>
        <div style={{ flex: 1, padding: 16, overflow: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 24 }}>
            {projects.map(p => (
              <div key={p.id} onClick={() => setSelected(p)} style={{ padding: '12px', borderRadius: 8, cursor: 'pointer', background: selected.id === p.id ? 'rgba(255,255,255,0.05)' : 'transparent', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, margin: '0 auto 12px', borderRadius: 8, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff' }}>
                  {p.icon.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{p.category}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 360, borderLeft: '1px solid rgba(255,255,255,0.03)', padding: 16, background: '#0f0f10', overflow: 'auto' }}>
          {selected ? (
            <>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: 18, marginBottom: 8 }}>{selected.name}</div>
              <div style={{ marginBottom: 16 }}>{getStatusBadge(selected.status)}</div>
              <div style={{ fontSize: 14, color: '#e5e7eb', marginBottom: 12 }}>{selected.description}</div>
              <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 24, lineHeight: 1.6 }}>{selected.details}</div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: '#d1d5db', marginBottom: 8 }}>Tech Stack</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {selected.technologies.map((t, i) => (
                    <span key={i} style={{ padding: '4px 10px', backgroundColor: '#374151', borderRadius: 6, fontSize: 12, color: '#d1d5db' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
                {selected.github && <a href={selected.github} target="_blank" rel="noopener noreferrer" style={{ color: '#93c5fd', textDecoration: 'none' }}>GitHub</a>}
                {selected.url && <a href={selected.url} target="_blank" rel="noopener noreferrer" style={{ color: '#86efac', textDecoration: 'none' }}>Live Demo</a>}
              </div>
            </>
          ) : (
            <div style={{ color: '#9ca3af', textAlign: 'center', paddingTop: 40 }}>Select a project to view details</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;
