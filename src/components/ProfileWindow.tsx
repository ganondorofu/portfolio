"use client";

import React, { useEffect, useState } from 'react';
import AppHeader from './AppHeader';

const ProfileWindow: React.FC = () => {
  

  const [showCursor, setShowCursor] = useState(true);
  const [displayedLines, setDisplayedLines] = useState<{ id: number; content: React.ReactNode }[]>([]);
  
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      window.removeEventListener('keydown', handleUserInteraction);
    };
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const blinkId = setInterval(() => setShowCursor(s => !s), 500);
    return () => clearInterval(blinkId);
  }, []);

  

  // Command input
  const [input, setInput] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const mockFiles = {
    'README.md': '# README\nThis is a playful file preview for the portfolio.\n',
    'CV.pdf': 'Curriculum Vitae (preview): education and contact.\n',
    'about.txt': `student / hobbyist developer

学校: 愛知県立愛知総合工科高等学校
所属: STEM研究部（部長）
Email: ganondorofu3143@outlook.com

専門領域: フロントエンド、バックエンド、インフラ
使用技術: React, TypeScript, Node.js, Docker, nginx, Firebase 等`
  } as Record<string,string>;

  const runCommand = async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setIsProcessing(true);

    // echo the command
    setDisplayedLines(prev => [...prev, { id: Date.now(), content: (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
        <div style={promptStyle} aria-hidden>$</div>
        <div style={{ flex: 1 }}>{cmd}</div>
      </div>
    )}]);

    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    const parts = cmd.split(/\s+/);
    const base = parts[0].toLowerCase();

    if (base === 'help') {
      const out = ['help — show commands', 'whoami — show user', 'ls — list files', 'cat <file> — show file', 'clear — clear screen'];
      for (const o of out) {
        setDisplayedLines(prev => [...prev, { id: Date.now() + Math.random(), content: <div>{o}</div>}]);
        await sleep(80);
      }
    } else if (base === 'whoami') {
      await sleep(120);
      setDisplayedLines(prev => [...prev, { id: Date.now(), content: <div>yoneyone</div>}]);
    } else if (base === 'ls') {
      await sleep(80);
      setDisplayedLines(prev => [...prev, { id: Date.now(), content: <div>README.md  CV.pdf  about.txt  STEM_Arcade/</div>}]);
    } else if (base === 'cat') {
      const target = parts[1] || '';
      await sleep(120);
      if (mockFiles[target]) {
        const content = mockFiles[target].split('\n');
        for (const line of content) {
          let styledLine: React.ReactNode = line;
          if (line.includes(':')) {
            const [key, ...value] = line.split(':');
            styledLine = (
              <span>
                <span style={{ color: '#66d9ef' }}>{key}:</span>
                <span>{value.join(':')}</span>
              </span>
            );
          } else if (line.startsWith('-')) {
            styledLine = <span style={{ paddingLeft: 16 }}>{line}</span>;
          }

          setDisplayedLines(prev => [...prev, { id: Date.now() + Math.random(), content: styledLine }]);
          await sleep(30);
        }
      } else {
        setDisplayedLines(prev => [...prev, { id: Date.now(), content: `${target}: No such file or directory` }]);
      }
    } else if (base === 'clear') {
      // small delay to feel real
      await sleep(80);
      setDisplayedLines([]);
    } else {
      await sleep(80);
      setDisplayedLines(prev => [...prev, { id: Date.now(), content: `${cmd}: command not found` }]);
    }

    setIsProcessing(false);
  };

  const promptStyle: React.CSSProperties = { color: '#21d07a', marginRight: 8, fontWeight: 700 };

  // autoplay demo: types and runs a few commands on first mount
  useEffect(() => {
    let mounted = true;
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    const demo = async () => {
      if (userInteracted) return;

      const seq = ['whoami', 'cat about.txt'];
      for (const c of seq) {
        if (userInteracted) break;
        // simulate typing in input (visual only)
        for (let i = 1; i <= c.length && mounted && !userInteracted; i++) {
          setInput(c.slice(0, i));
          // eslint-disable-next-line no-await-in-loop
          await sleep(40 + Math.random() * 40);
        }
        if (!mounted || userInteracted) break;
        // submit
        await runCommand(c);
        setInput('');
        // small pause between commands
        // eslint-disable-next-line no-await-in-loop
        await sleep(260);
      }
    };

    demo();
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppHeader title="About — terminal" subtitle="プロフィール" />
      <div style={{ flex: 1, padding: 12, overflow: 'auto', background: '#000' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'monospace', color: '#d1d5db', whiteSpace: 'pre-wrap', lineHeight: 1.6, background: '#000', padding: 16, borderRadius: 8, border: '1px solid rgba(255,255,255,0.03)' }}>
            {displayedLines.map((l) => (
              <div key={l.id}>{l.content}</div>
            ))}

            

            {/* bottom prompt line with input */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <div style={promptStyle} aria-hidden>$</div>
              <form onSubmit={(e) => { e.preventDefault(); runCommand(input); setInput(''); }} style={{ flex: 1 }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isProcessing ? 'processing...' : 'type a command (help)'}
                  disabled={isProcessing}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)', background: '#020202', color: '#d1d5db', fontFamily: 'monospace' }}
                />
              </form>
              <div style={{ width: 12 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWindow;
