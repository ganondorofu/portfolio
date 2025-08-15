import React, { useState } from 'react';
import AppHeader from './AppHeader';

const mockFiles = [
  { id: 'readme', name: 'README.md', type: 'md', content: '# README\nThis is a playful file preview for the portfolio.' },
  { id: 'cv', name: 'CV.pdf', type: 'pdf', content: 'Curriculum Vitae (preview): education and contact.' },
  { id: 'project', name: 'STEM_Arcade', type: 'folder', content: 'Unity project showcasing interactive simulations.' },
];

const FilesWindow: React.FC = () => {
  const [selected, setSelected] = useState(mockFiles[0]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppHeader title="Files" subtitle="mock file browser" />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ width: 260, borderRight: '1px solid rgba(255,255,255,0.03)', padding: 12, background: '#0f0f10' }}>
          {mockFiles.map(f => (
            <div key={f.id} onClick={() => setSelected(f)} style={{ padding: '8px 10px', borderRadius: 6, cursor: 'pointer', background: selected.id === f.id ? 'rgba(255,255,255,0.03)' : 'transparent', marginBottom: 6 }}>
              <div style={{ fontWeight: 600, color: '#fff' }}>{f.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{f.type}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 12, overflow: 'auto', background: '#060607' }}>
          <div style={{ color: '#fff', fontWeight: 600, marginBottom: 8 }}>{selected.name}</div>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#d1d5db' }}>{selected.content}</pre>
        </div>
      </div>
    </div>
  );
};

export default FilesWindow;
