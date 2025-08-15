"use client";

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import AppHeader from './AppHeader';

const ProfileWindow: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentTypingLine, setCurrentTypingLine] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [demoRun, setDemoRun] = useState(false);

  // 一文字ずつタイピングする関数
  const typeText = async (text: string, delay: number = 50) => {
    setIsTyping(true);
    setCurrentTypingLine('');
    
    for (let i = 0; i <= text.length; i++) {
      setCurrentTypingLine(text.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    setDisplayedLines(prev => [...prev, text]);
    setCurrentTypingLine('');
    setIsTyping(false);
  };

  const mockFiles = useMemo((): Record<string, string> => ({
    'README.md': '# README\nThis is a playful file preview for the portfolio.',
    'CV.pdf': 'Curriculum Vitae (preview): education and contact.',
    'about.txt': 'yoneyone — student / hobbyist developer\n\n学校: 愛知県立愛知総合工科高等学校\n所属: STEM研究部\nEmail: ganondorofu3143@outlook.com\n\n学習方針:\n🎯 実践重視: 実際に動くプロジェクトで学ぶ方針\n🔄 自動化: 開発・デプロイの自動化を進める\n🤖 AI活用: 知識のない分野や難しい課題にもAIを使って積極的に挑戦'
  }), []);

  const runCommand = useCallback(async (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    setDisplayedLines(prev => [...prev, `$ ${cmd}`]);

    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
    const parts = cmd.split(/\s+/);
    const base = parts[0].toLowerCase();

    await sleep(200); // コマンド実行の遅延

    if (base === 'help') {
      const out = ['help — show commands', 'whoami — show user', 'ls — list files', 'cat <file> — show file', 'clear — clear screen'];
      for (const o of out) { 
        await typeText(o, 30);
        await sleep(100); 
      }
    } else if (base === 'whoami') {
      await typeText('yoneyone', 80);
    } else if (base === 'ls') {
      await typeText('README.md  CV.pdf  about.txt  STEM_Arcade/', 40);
    } else if (base === 'cat') {
      const target = parts[1] || '';
      if (mockFiles[target]) {
        const content = mockFiles[target].split('\n');
        for (const line of content) { 
          await typeText(line, 25);
          await sleep(50); 
        }
      } else {
        await typeText(`${target}: No such file or directory`, 50);
      }
    } else if (base === 'clear') {
      setDisplayedLines([]);
    } else if (base === 'about') {
      await typeText('yoneyone — student / hobbyist developer', 60);
    } else if (base === 'projects') {
      await typeText('Projects: ClassConnect, STEM_Arcade, portableClipboard', 60);
    } else {
      await typeText(`${cmd}: command not found`, 50);
    }

  }, [mockFiles]);

  useEffect(() => {
    if (demoRun) return;
    
    let mounted = true;
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

    const demo = async () => {
      console.log('Starting terminal demo...'); // デバッグログ
      setDemoRun(true);
      await sleep(1000); // 少し長めの初期遅延
      
      const seq = ['whoami', 'ls', 'cat about.txt'];
      for (let i = 0; i < seq.length; i++) {
        const cmd = seq[i];
        if (!mounted) break;
        console.log(`Running command: ${cmd}`); // デバッグログ
        await runCommand(cmd);
        if (i < seq.length - 1) { // 最後のコマンドでない場合のみ待機
          await sleep(1200);
        }
      }
      console.log('Terminal demo completed'); // デバッグログ
    };

    demo().catch(err => {
      console.error('Demo error:', err);
    });
    
    return () => { 
      mounted = false; 
    };
  }, [demoRun, runCommand]); // runCommandを依存配列に追加

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

  // 現在タイピング中の行を表示する関数
  const renderTypingLine = (line: string) => {
    if (line.includes('yoneyone')) {
      return <div style={{ color: '#66d9ef', marginBottom: 6, paddingLeft: 24 }}>{line}<span style={{ opacity: 0.7 }}>|</span></div>;
    } else if (line.includes('学校:') || line.includes('所属:') || line.includes('Email:')) {
      const [key, ...value] = line.split(':');
      return (
        <div style={{ marginBottom: 6, paddingLeft: 24 }}>
          <span style={{ color: '#a6e22e' }}>{key}:</span>
          <span style={{ color: '#f8f8f2' }}>{value.join(':')}</span>
          <span style={{ opacity: 0.7 }}>|</span>
        </div>
      );
    } else if (line.startsWith('#')) {
      return <div style={{ color: '#fd971f', fontWeight: 'bold', marginBottom: 6, paddingLeft: 24 }}>{line}<span style={{ opacity: 0.7 }}>|</span></div>;
    } else if (line.includes('—')) {
      return <div style={{ color: '#ae81ff', marginBottom: 6, paddingLeft: 24 }}>{line}<span style={{ opacity: 0.7 }}>|</span></div>;
    } else if (line.includes('学習方針:')) {
      return <div style={{ color: '#f92672', fontWeight: 'bold', marginBottom: 6, paddingLeft: 24 }}>{line}<span style={{ opacity: 0.7 }}>|</span></div>;
    } else if (line.startsWith('🎯') || line.startsWith('🔄') || line.startsWith('🤖')) {
      return <div style={{ color: '#e6db74', marginBottom: 6, paddingLeft: 32 }}>{line}<span style={{ opacity: 0.7 }}>|</span></div>;
    }

    return <div style={{ marginBottom: 6, paddingLeft: 24 }}>{line}<span style={{ opacity: 0.7 }}>|</span></div>;
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppHeader title="About — terminal" subtitle="プロフィール" />
      <div style={{ flex: 1, padding: 12, overflow: 'auto', background: '#000' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'monospace', color: '#d1d5db', whiteSpace: 'pre-wrap', lineHeight: 1.6, background: '#000', padding: 16, borderRadius: 8, border: '1px solid rgba(255,255,255,0.03)' }}>
            {displayedLines.map(renderLine)}
            {isTyping && currentTypingLine && renderTypingLine(currentTypingLine)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWindow;
