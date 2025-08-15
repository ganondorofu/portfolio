'use client';

import { useState, useEffect } from 'react';

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const dateTimeLabel = `${currentTime.getMonth() + 1}月${currentTime.getDate()}日 ${formattedTime}`;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '36px',
        zIndex: 60,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 12px',
        fontSize: '13px',
        backgroundColor: '#111214',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Left: small indicator */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 12, height: 6, borderRadius: 6, backgroundColor: '#ffffff', opacity: 0.12 }} />
      </div>

      {/* Center: Date/Time */}
      <div style={{ justifySelf: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#d1d5db', fontSize: '13px' }}>{dateTimeLabel}</span>
      </div>

      {/* Right: System status placeholders */}
      <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '12px', color: '#d1d5db', fontSize: '12px' }}>
        <span style={{ padding: '2px 6px', borderRadius: 4, background: 'transparent' }}>ja</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2v6" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 12h12" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="#d1d5db" strokeWidth="1.2" opacity="0.9"/>
        </svg>
      </div>
    </div>
  );
};

export default TopBar;
