import React, { useState } from 'react';
import AppHeader from './AppHeader';

const ContactWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      platform: 'Email',
      value: 'ganondorofu3143@outlook.com',
      icon: '✉️',
      link: 'mailto:ganondorofu3143@outlook.com',
      description: '直接メールでのご連絡'
    },
    {
      platform: 'GitHub',
      value: 'ganondorofu',
      icon: '📁',
      link: 'https://github.com/ganondorofu',
      description: 'プロジェクトとコード'
    },
    {
      platform: 'Scratch',
      value: 'ganondorofu',
      icon: '🐱',
      link: 'https://scratch.mit.edu/users/ganondorofu/',
      description: 'プログラミング学習履歴'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // メールクライアントを開くためのmailto URLを生成
    const subject = encodeURIComponent(formData.subject || 'ポートフォリオサイトからのお問い合わせ');
    const body = encodeURIComponent(
      `お名前: ${formData.name}\nメールアドレス: ${formData.email}\n\nメッセージ:\n${formData.message}`
    );
    const mailtoURL = `mailto:ganondorofu3143@outlook.com?subject=${subject}&body=${body}`;
    window.open(mailtoURL);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
      <AppHeader icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 8l9 6 9-6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M21 6H3v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6z" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>} title="Contact" subtitle="Contact information and form" />

      <div style={{ textAlign:'center' }}>
        <h1 style={{ fontSize:'20px', fontWeight:700, marginBottom:'8px' }}>Contact</h1>
        <p style={{ color:'#d1d5db', fontSize:'12px' }}>Contact methods and a simple contact form.</p>
      </div>

      {/* 連絡先情報 */}
      <div style={{ border:'1px solid #4b5563', borderRadius:'8px', padding:'16px', backgroundColor:'#2a2a2a' }}>
        <h2 style={{ fontSize:'16px', fontWeight:600, marginBottom:'12px', color:'#60a5fa' }}>連絡先</h2>
        <div style={{ display:'grid', gap:'12px' }}>
          {contactInfo.map((contact, index) => (
            <a
              key={index}
              href={contact.link}
              target={contact.platform !== 'Email' ? '_blank' : '_self'}
              rel={contact.platform !== 'Email' ? 'noopener noreferrer' : undefined}
              style={{ display:'flex', alignItems:'center', padding:'12px', backgroundColor:'#1f2937', borderRadius:'8px', textDecoration:'none', color:'#e5e7eb' }}
            >
              <div style={{ width:'48px', height:'48px', backgroundColor:'#374151', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', marginRight:'12px' }}>
                {/* icon placeholder */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="12" x="3" y="6" fill="#ffffff" opacity="0.06" rx="2"/></svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, color:'#fff' }}>{contact.platform}</div>
                <div style={{ fontSize:'12px', color:'#93c5fd' }}>{contact.value}</div>
                <div style={{ fontSize:'12px', color:'#9ca3af' }}>{contact.description}</div>
              </div>
              <div style={{ color:'#9ca3af' }}>→</div>
            </a>
          ))}
        </div>
      </div>

      {/* お問い合わせフォーム */}
      <div style={{ border:'1px solid #4b5563', borderRadius:'8px', padding:'16px', backgroundColor:'#2a2a2a' }}>
        <h2 style={{ fontSize:'16px', fontWeight:600, marginBottom:'12px', color:'#34d399' }}>お問い合わせフォーム</h2>
        
        <form onSubmit={handleSubmit} style={{ display:'grid', gap:'12px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            <div>
              <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#d1d5db', marginBottom:'8px' }}>お名前 *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{ width:'100%', padding:'8px 12px', backgroundColor:'#1f2937', border:'1px solid #4b5563', borderRadius:'6px', color:'#fff', outline:'none' }}
                placeholder="名前"
              />
            </div>
            
            <div>
              <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#d1d5db', marginBottom:'8px' }}>メールアドレス *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width:'100%', padding:'8px 12px', backgroundColor:'#1f2937', border:'1px solid #4b5563', borderRadius:'6px', color:'#fff', outline:'none' }}
                placeholder="example@email.com"
              />
            </div>
          </div>
          
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#d1d5db', marginBottom:'8px' }}>件名</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              style={{ width:'100%', padding:'8px 12px', backgroundColor:'#1f2937', border:'1px solid #4b5563', borderRadius:'6px', color:'#fff', outline:'none' }}
              placeholder="件名"
            />
          </div>
          
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#d1d5db', marginBottom:'8px' }}>メッセージ *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={4}
              style={{ width:'100%', padding:'8px 12px', backgroundColor:'#1f2937', border:'1px solid #4b5563', borderRadius:'6px', color:'#fff', outline:'none', resize:'none' }}
              placeholder="お問い合わせ内容をご記入ください"
            />
          </div>
          
          <button type="submit" style={{ width:'100%', backgroundColor:'#2563eb', color:'#fff', fontWeight:600, padding:'10px 16px', borderRadius:'6px', border:'none', cursor:'pointer' }}>
            送信
          </button>
        </form>
        <p style={{ fontSize:'12px', color:'#9ca3af', marginTop:'8px' }}>* 送信によりメールクライアントが起動します</p>
      </div>

      {/* 現在の状況 */}
      <div style={{ borderTop:'1px solid #4b5563', paddingTop:'16px' }}>
        <h2 style={{ fontSize:'16px', fontWeight:600, marginBottom:'12px', color:'#f59e0b' }}>Current status</h2>
        <div style={{ backgroundColor:'#1f2937', borderRadius:'8px', padding:'16px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', fontSize:'14px' }}>
            <div>
              <h4 style={{ fontWeight:600, color:'#34d399', marginBottom:'8px' }}>Available</h4>
              <ul style={{ display:'grid', gap:'4px', color:'#e5e7eb' }}>
                <li>技術相談・プロジェクト協力等の問い合わせに対応可能</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight:600, color:'#60a5fa', marginBottom:'8px' }}>Learning</h4>
              <ul style={{ display:'grid', gap:'4px', color:'#e5e7eb' }}>
                <li>ITパスポート（受験予定: 2025年9月）</li>
                <li>Java / Spring Boot 等の学習継続</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
