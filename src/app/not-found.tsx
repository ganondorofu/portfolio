'use client';

import React from 'react';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0, color: '#f87171' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '1rem 0', fontWeight: 300 }}>Page Not Found</h2>
      <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={() => {
          // GitHub PagesのbasePathを考慮
          const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
          window.location.href = basePath + '/';
        }}
        style={{
          padding: '12px 24px',
          backgroundColor: '#4A90E2',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#357ABD';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#4A90E2';
        }}
      >
        Go Home
      </button>
    </div>
  );
}
