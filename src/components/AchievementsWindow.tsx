import React from 'react';
import AppHeader from './AppHeader';

const AchievementsWindow = () => {
  const achievements = [
    {
      category: '競技・コンテスト',
      icon: 'contest',
      color: 'text-yellow-400',
      items: [
        {
          title: '全国高等学校AIアスリート選手権大会シンギュラリティバトルクエスト2024',
          details: [
            'AQ（二次予選通過）',
            'XQ（決勝出場）',
            'DQ（第2位）'
          ],
          date: '2024',
          badge: '第2位',
          badgeColor: 'bg-gray-400'
        },
        {
          title: '未踏ジュニア',
          details: [
            '書類審査通過'
          ],
          date: '2024',
          badge: '書類審査通過',
          badgeColor: 'bg-blue-500'
        },
        {
          title: 'U22プログラミングコンテスト',
          details: [
            '参加'
          ],
          date: '2024',
          badge: '参加',
          badgeColor: 'bg-green-500'
        }
      ]
    },
    {
      category: '資格・学習',
      icon: 'certs',
      color: 'text-blue-400',
      items: [
        {
          title: 'ITパスポート',
          details: [
            '受験予定: 2025年9月'
          ],
          date: '2025-09',
          badge: '予定',
          badgeColor: 'bg-orange-500'
        }
      ]
    },
    {
      category: '技術的成果',
      icon: 'technical',
      color: 'text-green-400',
      items: [
        {
          title: 'AI支援フルスタック開発',
          details: [
            'フロントエンド(React)・バックエンド(Spring Boot)の実装経験',
            'AIツールを補助的に使用した開発フローの導入'
          ],
          date: '継続',
          badge: '継続',
          badgeColor: 'bg-purple-500'
        },
        {
          title: '自宅サーバーインフラ構築',
          details: [
            'Proxmox ベースの仮想化環境構築・運用経験',
            'nginx、Grafana、監視システムの導入'
          ],
          date: '2024〜',
          badge: '運用中',
          badgeColor: 'bg-cyan-500'
        },
        {
          title: 'CanSat技術開発',
          details: [
            'Spresense を用いた飛行データ記録・動画記録・位置探索機能の実装'
          ],
          date: '2024',
          badge: '完成',
          badgeColor: 'bg-green-600'
        }
      ]
    }
  ];

  const stats = {
    totalAchievements: achievements.reduce((sum, category) => sum + category.items.length, 0),
    contestsParticipated: achievements[0].items.length,
    ongoingProjects: achievements.find(cat => cat.category === '技術的成果')?.items.filter(item => 
      item.badge === '運用中' || item.badge === '独自手法'
    ).length || 0
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <AppHeader icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="12" cy="8" r="3" fill="#ffffff" opacity="0.95"/>
        <path d="M8 21l4-3 4 3v-5H8v5z" fill="#ffffff" opacity="0.9"/>
      </svg>} title="Achievements" subtitle="Competitions & technical outcomes" />

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Achievements</h1>
        <p style={{ color: '#d1d5db', fontSize: '12px' }}>Competition results, certifications, and technical outcomes.</p>
      </div>

      {/* 統計サマリー */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px', marginBottom:'16px' }}>
        {[{label:'総実績数', value: stats.totalAchievements, color:'#facc15'},
          {label:'コンテスト参加', value: stats.contestsParticipated, color:'#60a5fa'},
          {label:'進行中プロジェクト', value: stats.ongoingProjects, color:'#34d399'}].map((s)=> (
          <div key={s.label} style={{ backgroundColor:'#1f2937', borderRadius:'8px', padding:'12px', textAlign:'center' }}>
            <div style={{ fontSize:'20px', fontWeight:700, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'12px', color:'#9ca3af' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* 実績カテゴリ */}
      <div style={{ display:'grid', gap:'16px' }}>
        {achievements.map((category, categoryIndex) => (
          <div key={categoryIndex} style={{ border:'1px solid #4b5563', borderRadius:'8px', padding:'16px', backgroundColor:'#2a2a2a' }}>
            <h2 style={{ fontSize:'16px', fontWeight:600, marginBottom:'12px', display:'flex', alignItems:'center', color:'#e5e7eb' }}>
              <span style={{ marginRight:'8px', fontSize:'18px' }}>{category.icon}</span>
              {category.category}
            </h2>
            
            <div style={{ display:'grid', gap:'12px' }}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{ backgroundColor:'#1f2937', borderRadius:'8px', padding:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
                    <h3 style={{ fontWeight:600, color:'#fff', fontSize:'14px' }}>{item.title}</h3>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <span style={{ padding:'2px 8px', borderRadius:'9999px', fontSize:'12px', fontWeight:600, color:'#fff', backgroundColor:'#6b7280' }}>
                        {item.badge}
                      </span>
                      <span style={{ fontSize:'12px', color:'#9ca3af' }}>{item.date}</span>
                    </div>
                  </div>
                  
                  <ul style={{ display:'grid', gap:'4px' }}>
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex} style={{ fontSize:'14px', color:'#e5e7eb', display:'flex', alignItems:'flex-start' }}>
                        <span style={{ marginRight:'8px', color:'#60a5fa' }}>•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

  {/* (Highlights and Future directions removed per request) */}
    </div>
  );
};

export default AchievementsWindow;
