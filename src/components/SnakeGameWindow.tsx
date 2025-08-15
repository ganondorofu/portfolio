import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import AppHeader from './AppHeader';

interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const SnakeGameWindow: React.FC = () => {
  const BOARD_SIZE = 20;
  const INITIAL_SNAKE = useMemo(() => [{ x: 10, y: 10 }], []);
  const INITIAL_DIRECTION: Direction = 'RIGHT';
  const GAME_SPEED = 150;

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const [gameStatus, setGameStatus] = useState<'playing' | 'paused' | 'gameOver'>('paused');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('snakeHighScore') || '0');
    }
    return 0;
  });

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // 壁との衝突
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true;
    }
    // 自分自身との衝突
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      // 方向に基づいて頭を移動
      switch (directionRef.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // 衝突チェック
      if (checkCollision(head, newSnake)) {
        setGameStatus('gameOver');
        return prevSnake;
      }

      newSnake.unshift(head);

      // 食べ物を食べたかチェック
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop(); // 尻尾を削除
      }

      return newSnake;
    });
  }, [food, checkCollision, generateFood]);

  const startGame = useCallback(() => {
    setGameStatus('playing');
  }, []);

  const pauseGame = useCallback(() => {
    setGameStatus('paused');
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood({ x: 15, y: 15 });
    directionRef.current = INITIAL_DIRECTION;
    setGameStatus('paused');
    setScore(0);
  }, [INITIAL_SNAKE]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameStatus === 'gameOver') return;

    const { key } = e;
    
    if (key === ' ') {
      e.preventDefault();
      if (gameStatus === 'playing') {
        pauseGame();
      } else {
        startGame();
      }
      return;
    }

    if (gameStatus !== 'playing') return;

    let newDirection: Direction | null = null;

    switch (key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (directionRef.current !== 'DOWN') newDirection = 'UP';
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (directionRef.current !== 'UP') newDirection = 'DOWN';
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (directionRef.current !== 'RIGHT') newDirection = 'LEFT';
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (directionRef.current !== 'LEFT') newDirection = 'RIGHT';
        break;
    }

    if (newDirection) {
      e.preventDefault();
      directionRef.current = newDirection;
    }
  }, [gameStatus, startGame, pauseGame]);

  // ゲームループ
  useEffect(() => {
    if (gameStatus === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameStatus, moveSnake]);

  // キーボードイベント
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // ハイスコア更新
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      if (typeof window !== 'undefined') {
        localStorage.setItem('snakeHighScore', score.toString());
      }
    }
  }, [score, highScore]);

  const renderBoard = () => {
    const board = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isSnakeHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
        const isSnakeBody = snake.some((segment, index) => index > 0 && segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;

        let cellContent = '';
        let cellColor = '#374151';

        if (isSnakeHead) {
          cellContent = '🐍';
          cellColor = '#16a34a';
        } else if (isSnakeBody) {
          cellContent = '';
          cellColor = '#22c55e';
        } else if (isFood) {
          cellContent = '🍎';
          cellColor = '#ef4444';
        }

        board.push(
          <div
            key={`${x}-${y}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: cellColor,
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}
          >
            {cellContent}
          </div>
        );
      }
    }
    return board;
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#1a0d1f' }}>
      <AppHeader title="Snake Game" subtitle="Classic Arcade" />
      
      <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        {/* ゲーム情報 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          padding: '16px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ color: '#d1d5db', fontSize: '16px', fontWeight: '600' }}>
            🎯 スコア: {score}
          </div>
          
          <div style={{ 
            color: gameStatus === 'gameOver' ? '#dc2626' : '#d1d5db',
            fontSize: '18px',
            fontWeight: '700'
          }}>
            {gameStatus === 'gameOver' ? '💀 GAME OVER' : 
             gameStatus === 'playing' ? '🎮 PLAYING' : '⏸️ PAUSED'}
          </div>

          <div style={{ color: '#9ca3af', fontSize: '14px' }}>
            🏆 最高: {highScore}
          </div>
        </div>

        {/* コントロールボタン */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '20px',
          justifyContent: 'center'
        }}>
          {gameStatus === 'paused' && (
            <button
              onClick={startGame}
              style={{
                padding: '8px 16px',
                background: 'rgba(34, 197, 94, 0.2)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '6px',
                color: '#22c55e',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              ▶️ スタート
            </button>
          )}
          
          {gameStatus === 'playing' && (
            <button
              onClick={pauseGame}
              style={{
                padding: '8px 16px',
                background: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '6px',
                color: '#fbbf24',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              ⏸️ ポーズ
            </button>
          )}

          <button
            onClick={resetGame}
            style={{
              padding: '8px 16px',
              background: 'rgba(147, 197, 253, 0.2)',
              border: '1px solid rgba(147, 197, 253, 0.3)',
              borderRadius: '6px',
              color: '#93c5fd',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🔄 リセット
          </button>
        </div>

        {/* ゲームボード */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
          gap: '0px',
          border: '2px solid rgba(255,255,255,0.2)',
          borderRadius: '8px',
          padding: '4px',
          background: '#0f172a',
          justifyContent: 'center',
          maxWidth: 'fit-content',
          margin: '0 auto'
        }}>
          {renderBoard()}
        </div>

        {/* 操作説明 */}
        <div style={{ 
          marginTop: '20px', 
          color: '#9ca3af', 
          fontSize: '14px', 
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          <div>矢印キーまたはWASD: 移動</div>
          <div>スペースキー: ポーズ/再開</div>
          <div>目標: 食べ物を食べてスネークを成長させよう</div>
        </div>
      </div>
    </div>
  );
};

export default SnakeGameWindow;
