import React from 'react';

type AppHeaderProps = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
};

const AppHeader: React.FC<AppHeaderProps> = ({ icon, title, subtitle, rightSlot }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        margin: '-8px -8px 16px',
        backgroundColor: '#2d2d2d',
        borderBottom: '1px solid #4b5563',
        borderTopLeftRadius: '6px',
        borderTopRightRadius: '6px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        {icon ? (
          <div
            aria-hidden
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#404040',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}
          >
            {icon}
          </div>
        ) : null}
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{subtitle}</div>
          ) : null}
        </div>
      </div>
      {rightSlot ? <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{rightSlot}</div> : null}
    </div>
  );
};

export default AppHeader;
