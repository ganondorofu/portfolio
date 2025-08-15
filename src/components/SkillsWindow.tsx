import React from 'react';
import AppHeader from './AppHeader';

const SkillsWindow = () => {
  const currentWork = [
    'React / TypeScript を用いた UI 実装とアクセシビリティ改善',
    'Node.js / API 設計・実装・テストの実務的な運用',
    'Docker / nginx / Proxmox を使ったローカル／自宅サーバー環境の構築・運用',
    'Unity を用いたプロトタイプ制作（インタラクティブ実験）',
    'Arduino / Spresense を使った組み込みソフトウェアの開発',
    'CI/CD の自動化（GitHub Actions 等）とデプロイ運用の改善',
    '3D プリンターでのプロトタイピングと Fusion360 による設計'
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <AppHeader icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2v6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 12h12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>} title="Skills" subtitle="取り組んでいること" />

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>現在取り組んでいること</h1>
        <p style={{ color: '#d1d5db', fontSize: '12px' }}>開発・運用・プロトタイピングの実務的な取り組みの一覧です。</p>
      </div>

      <div style={{ border: '1px solid #4b5563', borderRadius: '8px', padding: '12px', backgroundColor: '#1f1f1f' }}>
        <ul style={{ margin: 0, paddingLeft: '18px', display: 'grid', gap: '8px', fontSize: '14px' }}>
          {currentWork.map((item, idx) => (
            <li key={idx} style={{ color: '#e5e7eb', lineHeight: 1.6 }}>{item}</li>
          ))}
        </ul>
      </div>

      <div style={{ borderTop: '1px solid #4b5563', paddingTop: '12px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '10px', color: '#22d3ee' }}>学習方針</h2>
        <div style={{ backgroundColor: '#2a2a2a', border: '1px solid #4b5563', borderRadius: '8px', padding: '12px' }}>
          <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎯</span>
              <span><strong>実践重視:</strong> 実際に動くプロジェクトで学ぶ方針</span>
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔄</span>
              <span><strong>自動化:</strong> 開発・デプロイの自動化を進める</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;
