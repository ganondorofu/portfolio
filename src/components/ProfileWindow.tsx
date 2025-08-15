"use client";

import React, { useEffect, useState, useCallback } from 'react';
import AppHeader from './AppHeader';

const ProfileWindow: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [demoRun, setDemoRun] = useState(false);

  const mockFiles: Record<string, string> = {
    'README.md': '# README\nThis is a playful file preview for the portfolio.',
    'CV.pdf': 'Curriculum Vitae (preview): education and contact.',
    'about.txt': 'yoneyone — student / hobbyist developer\n\n学校: 愛知県立愛知総合工科高等学校\n所属: STEM研究部\nEmail: ganondorofu3143@outlook.com\n\n学習方針:\n🎯 実践重視: 実際に動くプロジェクトで学ぶ方針\n🔄 自動化: 開発・デプロイの自動化を進める\n🤖 AI活用: 知識のない分野や難しい課題にもAIを使って積極的に挑戦'
  };

  const runCommand = useCallback(async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setIsProcessing(true);

    setDisplayedLines(prev => [...prev, `$ ${cmd}`]);

    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
    const parts = cmd.split(/\s+/);
    const base = parts[0].toLowerCase();

    if (base === 'help') {
      const out = ['help — show commands', 'whoami — show user', 'ls — list files', 'cat <file> — show file', 'clear — clear screen'];
      for (const o of out) { 
        setDisplayedLines(prev => [...prev, o]); 
        await sleep(80); 
      }
    } else if (base === 'whoami') {
      await sleep(120);
      setDisplayedLines(prev => [...prev, 'yoneyone']);
    } else if (base === 'ls') {
      await sleep(80);
      setDisplayedLines(prev => [...prev, 'README.md  CV.pdf  about.txt  STEM_Arcade/']);
    } else if (base === 'cat') {
      const target = parts[1] || '';
      await sleep(120);
      if (mockFiles[target]) {
        const content = mockFiles[target].split('\n');
        for (const line of content) { 
          setDisplayedLines(prev => [...prev, line]); 
          await sleep(30); 
        }
      } else {
        setDisplayedLines(prev => [...prev, `${target}: No such file or directory`]);
      }
    } else if (base === 'clear') {
      await sleep(80);
      setDisplayedLines([]);
    } else if (base === 'about') {
      await sleep(80);
      setDisplayedLines(prev => [...prev, 'yoneyone — student / hobbyist developer']);
    } else if (base === 'projects') {
      await sleep(80);
      setDisplayedLines(prev => [...prev, 'Projects: ClassConnect, STEM_Arcade, portableClipboard']);
    } else {
      await sleep(80);
      setDisplayedLines(prev => [...prev, `${cmd}: command not found`]);
    }

    setIsProcessing(false);
  }, []);

  useEffect(() => {
    if (demoRun) return;
    
    let mounted = true;
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    const demo = async () => {
      setDemoRun(true);
      await sleep(500);
      const seq = ['whoami', 'ls', 'cat about.txt'];
      for (const c of seq) {
        if (!mounted) break;
        await runCommand(c);
        await sleep(800);
      }
    };

    demo();
    return () => { mounted = false; };
  }, []);

  const promptStyle: React.CSSProperties = { color: '#21d07a', marginRight: 8, fontWeight: 700 };

  // 行の色付け関数
  const renderLine = (line: string, index: number) => {
    if (line.startsWith('$ ')) {
      return (
        <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
          <div style={promptStyle}>$</div>
          <div>{line.slice(2)}</div>
        </div>
      );
    }

    // カラー付きスタイリング
    if (line.includes('yoneyone')) {
      return <div key={index} style={{ color: '#66d9ef', marginBottom: 6, paddingLeft: 24 }}>{line}</div>;
    } else if (line.includes('学校:') || line.includes('所属:') || line.includes('Email:')) {
      const [key, ...value] = line.split(':');
      return (
        <div key={index} style={{ marginBottom: 6, paddingLeft: 24 }}>
          <span style={{ color: '#a6e22e' }}>{key}:</span>
          <span style={{ color: '#f8f8f2' }}>{value.join(':')}</span>
        </div>
      );
    } else if (line.startsWith('#')) {
      return <div key={index} style={{ color: '#fd971f', fontWeight: 'bold', marginBottom: 6, paddingLeft: 24 }}>{line}</div>;
    } else if (line.includes('—')) {
      return <div key={index} style={{ color: '#ae81ff', marginBottom: 6, paddingLeft: 24 }}>{line}</div>;
    } else if (line.includes('学習方針:')) {
      return <div key={index} style={{ color: '#f92672', fontWeight: 'bold', marginBottom: 6, paddingLeft: 24 }}>{line}</div>;
    } else if (line.startsWith('🎯') || line.startsWith('🔄') || line.startsWith('🤖')) {
      return <div key={index} style={{ color: '#e6db74', marginBottom: 6, paddingLeft: 32 }}>{line}</div>;
    }

    return <div key={index} style={{ marginBottom: 6, paddingLeft: 24 }}>{line}</div>;
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppHeader title="About — terminal" subtitle="プロフィール" />
      <div style={{ flex: 1, padding: 12, overflow: 'auto', background: '#000' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'monospace', color: '#d1d5db', whiteSpace: 'pre-wrap', lineHeight: 1.6, background: '#000', padding: 16, borderRadius: 8, border: '1px solid rgba(255,255,255,0.03)' }}>
            {displayedLines.map(renderLine)}

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <div style={promptStyle}>$</div>
              <form onSubmit={(e) => { e.preventDefault(); runCommand(input); setInput(''); }} style={{ flex: 1 }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isProcessing ? 'processing...' : 'type a command (help)'}
                  disabled={isProcessing}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.04)', background: '#020202', color: '#d1d5db', fontFamily: 'monospace' }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWindow;
