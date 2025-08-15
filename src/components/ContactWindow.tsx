import React, { useState } from 'react';
import AppHeader from './AppHeader';

const ContactWindow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 簡単なバリデーション
    if (!formData.name || !formData.email || !formData.message) {
      alert('お名前、メールアドレス、メッセージは必須です。');
      return;
    }

    // メールクライアントを開く
    const subject = encodeURIComponent(formData.subject || 'ポートフォリオサイトからのお問い合わせ');
    const body = encodeURIComponent(
      `お名前: ${formData.name}\nメールアドレス: ${formData.email}\n\nメッセージ:\n${formData.message}`
    );
    
    window.open(`mailto:ganondorofu3143@outlook.com?subject=${subject}&body=${body}`);
    
    // フォーム送信完了状態に
    setIsSubmitted(true);
    
    // 3秒後にリセット
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppHeader title="Contact" subtitle="お問い合わせフォーム" />
      
      <div style={{ flex: 1, padding: 16, overflow: 'auto' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          
          {isSubmitted ? (
            <div style={{ 
              textAlign: 'center', 
              padding: 40,
              backgroundColor: '#1f2937',
              borderRadius: 12,
              border: '1px solid #10b981'
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h2 style={{ color: '#10b981', marginBottom: 8 }}>送信完了！</h2>
              <p style={{ color: '#9ca3af' }}>メールクライアントが開きます。ありがとうございました！</p>
            </div>
          ) : (
            <>
              {/* 基本情報 */}
              <div style={{ 
                backgroundColor: '#1f2937', 
                padding: 20, 
                borderRadius: 12, 
                marginBottom: 20,
                border: '1px solid #374151'
              }}>
                <h2 style={{ color: '#60a5fa', marginBottom: 12, fontSize: 18 }}>📧 連絡先</h2>
                <p style={{ color: '#d1d5db', marginBottom: 8 }}>
                  <strong>Email:</strong> ganondorofu3143@outlook.com
                </p>
                <p style={{ color: '#d1d5db', marginBottom: 8 }}>
                  <strong>GitHub:</strong> <a href="https://github.com/ganondorofu" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa' }}>@ganondorofu</a>
                </p>
                <p style={{ color: '#9ca3af', fontSize: 14 }}>
                  技術的な質問や共同プロジェクトのお誘いなど、お気軽にどうぞ！
                </p>
              </div>

              {/* お問い合わせフォーム */}
              <div style={{ 
                backgroundColor: '#1f2937', 
                padding: 20, 
                borderRadius: 12,
                border: '1px solid #374151'
              }}>
                <h2 style={{ color: '#34d399', marginBottom: 16, fontSize: 18 }}>📝 お問い合わせフォーム</h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ 
                        display: 'block', 
                        color: '#d1d5db', 
                        marginBottom: 8, 
                        fontSize: 14,
                        fontWeight: 600
                      }}>
                        お名前 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          backgroundColor: '#111827', 
                          border: '1px solid #4b5563', 
                          borderRadius: 8, 
                          color: '#fff',
                          fontSize: 14,
                          outline: 'none'
                        }}
                        placeholder="山田太郎"
                      />
                    </div>
                    
                    <div>
                      <label style={{ 
                        display: 'block', 
                        color: '#d1d5db', 
                        marginBottom: 8, 
                        fontSize: 14,
                        fontWeight: 600
                      }}>
                        メールアドレス *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px 16px', 
                          backgroundColor: '#111827', 
                          border: '1px solid #4b5563', 
                          borderRadius: 8, 
                          color: '#fff',
                          fontSize: 14,
                          outline: 'none'
                        }}
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      color: '#d1d5db', 
                      marginBottom: 8, 
                      fontSize: 14,
                      fontWeight: 600
                    }}>
                      件名
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        backgroundColor: '#111827', 
                        border: '1px solid #4b5563', 
                        borderRadius: 8, 
                        color: '#fff',
                        fontSize: 14,
                        outline: 'none'
                      }}
                      placeholder="お問い合わせの件名"
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      color: '#d1d5db', 
                      marginBottom: 8, 
                      fontSize: 14,
                      fontWeight: 600
                    }}>
                      メッセージ *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      style={{ 
                        width: '100%', 
                        padding: '12px 16px', 
                        backgroundColor: '#111827', 
                        border: '1px solid #4b5563', 
                        borderRadius: 8, 
                        color: '#fff',
                        fontSize: 14,
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      placeholder="お問い合わせ内容をお書きください..."
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    style={{ 
                      backgroundColor: '#2563eb', 
                      color: '#fff', 
                      fontWeight: 600, 
                      padding: '12px 24px', 
                      borderRadius: 8, 
                      border: 'none', 
                      cursor: 'pointer',
                      fontSize: 16,
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    📤 送信する
                  </button>
                </form>
                
                <p style={{ 
                  fontSize: 12, 
                  color: '#9ca3af', 
                  marginTop: 12,
                  textAlign: 'center'
                }}>
                  ※ 送信ボタンを押すとメールクライアントが起動します
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
