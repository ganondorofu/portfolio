import React, { useEffect, useRef, useState } from 'react';
import AppHeader from './AppHeader';

const initialLines = [
  { id: 1, text: 'Welcome to the mock terminal. Type "help" for commands.' },
];

const TerminalWindow: React.FC = () => {
  const [lines, setLines] = useState(initialLines);
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 99999 });
  }, [lines]);

  const runCommand = (cmdRaw: string) => {
    const cmd = cmdRaw.trim();
    if (!cmd) return;
    setLines(prev => [...prev, { id: Date.now(), text: `> ${cmd}` }]);
    if (cmd === 'help') {
      setLines(prev => [...prev, { id: Date.now() + 1, text: 'help — show this message' }, { id: Date.now() + 2, text: 'about — short bio' }, { id: Date.now() + 3, text: 'projects — list projects' }, { id: Date.now() + 4, text: 'clear — clear screen' }]);
    } else if (cmd === 'about') {
      setLines(prev => [...prev, { id: Date.now(), text: 'yoneyone — student / hobbyist developer. This is a playful terminal.' }]);
    } else if (cmd === 'projects') {
      setLines(prev => [...prev, { id: Date.now(), text: 'Projects: STEM_Arcade, Portfolio site (this demo).' }]);
    } else if (cmd === 'clear') {
      setLines([{ id: Date.now(), text: '' }]);
    } else {
      setLines(prev => [...prev, { id: Date.now(), text: `${cmd}: command not found` }]);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppHeader title="Terminal" subtitle="mock shell" />
      <div ref={listRef} style={{ flex: 1, padding: 12, overflow: 'auto', background: 'linear-gradient(180deg,#0b0b0b,#0f0f12)' }}>
        {lines.map(l => (
          <div key={l.id} style={{ fontFamily: 'monospace', color: '#d1d5db', marginBottom: 6 }}>{l.text}</div>
        ))}
      </div>
      <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.03)', background: '#080808' }}>
        <form onSubmit={(e) => { e.preventDefault(); runCommand(input); setInput(''); }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (help)"
            style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)', background: '#0b0b0b', color: '#fff', fontFamily: 'monospace' }}
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalWindow;
