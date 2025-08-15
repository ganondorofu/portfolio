import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from './AppHeader';

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const MinesweeperWindow: React.FC = () => {
  const BOARD_SIZE = 16;
  const MINE_COUNT = 40;

  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [flagCount, setFlagCount] = useState(MINE_COUNT);
  const [firstClick, setFirstClick] = useState(true);

  const initializeBoard = useCallback(() => {
    const newBoard: Cell[][] = Array(BOARD_SIZE).fill(null).map(() =>
      Array(BOARD_SIZE).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0
      }))
    );
    return newBoard;
  }, []);

  const placeMines = useCallback((board: Cell[][], firstClickRow: number, firstClickCol: number) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    let minesPlaced = 0;

    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * BOARD_SIZE);
      const col = Math.floor(Math.random() * BOARD_SIZE);
      
      // 最初のクリック位置とその周辺には地雷を置かない
      if (Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1) {
        continue;
      }

      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // 隣接する地雷の数を計算
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i;
              const newCol = col + j;
              if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
                if (newBoard[newRow][newCol].isMine) count++;
              }
            }
          }
          newBoard[row][col].neighborMines = count;
        }
      }
    }

    return newBoard;
  }, []);

  const revealCell = useCallback((board: Cell[][], row: number, col: number): Cell[][] => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    
    if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) {
      return newBoard;
    }

    newBoard[row][col].isRevealed = true;

    // 隣接する地雷が0の場合、周囲のセルも自動的に開く
    if (newBoard[row][col].neighborMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < BOARD_SIZE && newCol >= 0 && newCol < BOARD_SIZE) {
            if (!newBoard[newRow][newCol].isRevealed) {
              return revealCell(newBoard, newRow, newCol);
            }
          }
        }
      }
    }

    return newBoard;
  }, []);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameStatus !== 'playing') return;

    setBoard(prevBoard => {
      let newBoard = [...prevBoard];

      if (firstClick) {
        newBoard = placeMines(newBoard, row, col);
        setFirstClick(false);
      }

      if (newBoard[row][col].isFlagged) return newBoard;

      if (newBoard[row][col].isMine) {
        // ゲームオーバー - すべての地雷を表示
        newBoard = newBoard.map(boardRow =>
          boardRow.map(cell => ({
            ...cell,
            isRevealed: cell.isMine ? true : cell.isRevealed
          }))
        );
        setGameStatus('lost');
        return newBoard;
      }

      newBoard = revealCell(newBoard, row, col);

      // 勝利条件チェック
      const revealedCount = newBoard.flat().filter(cell => cell.isRevealed).length;
      if (revealedCount === BOARD_SIZE * BOARD_SIZE - MINE_COUNT) {
        setGameStatus('won');
      }

      return newBoard;
    });
  }, [gameStatus, firstClick, placeMines, revealCell]);

  const handleRightClick = useCallback((e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameStatus !== 'playing') return;

    setBoard(prevBoard => {
      const newBoard = prevBoard.map(row => row.map(cell => ({ ...cell })));
      
      if (!newBoard[row][col].isRevealed) {
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        setFlagCount(prev => newBoard[row][col].isFlagged ? prev - 1 : prev + 1);
      }

      return newBoard;
    });
  }, [gameStatus]);

  const resetGame = useCallback(() => {
    setBoard(initializeBoard());
    setGameStatus('playing');
    setFlagCount(MINE_COUNT);
    setFirstClick(true);
  }, [initializeBoard]);

  useEffect(() => {
    setBoard(initializeBoard());
  }, [initializeBoard]);

  const getCellDisplay = (cell: Cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    if (cell.neighborMines === 0) return '';
    return cell.neighborMines.toString();
  };

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed || cell.neighborMines === 0) return '#d1d5db';
    const colors = ['', '#2563eb', '#16a34a', '#dc2626', '#7c3aed', '#ea580c', '#c2410c', '#1f2937', '#000000'];
    return colors[cell.neighborMines] || '#000000';
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#1a0d1f' }}>
      <AppHeader title="Minesweeper" subtitle="Classic Game" />
      
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
            🚩 残り: {flagCount}
          </div>
          
          <div style={{ 
            color: gameStatus === 'won' ? '#16a34a' : gameStatus === 'lost' ? '#dc2626' : '#d1d5db',
            fontSize: '18px',
            fontWeight: '700'
          }}>
            {gameStatus === 'won' ? '🎉 WIN!' : gameStatus === 'lost' ? '💥 GAME OVER' : '🎮 PLAYING'}
          </div>

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
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(147, 197, 253, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(147, 197, 253, 0.2)';
            }}
          >
            🔄 新しいゲーム
          </button>
        </div>

        {/* ゲームボード */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 24px)`,
          gap: '1px',
          background: '#374151',
          padding: '4px',
          borderRadius: '8px',
          border: '2px solid rgba(255,255,255,0.1)',
          justifyContent: 'center',
          maxWidth: 'fit-content',
          margin: '0 auto'
        }}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                style={{
                  width: '24px',
                  height: '24px',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: gameStatus === 'playing' ? 'pointer' : 'default',
                  background: cell.isRevealed 
                    ? (cell.isMine ? '#dc2626' : '#e5e7eb')
                    : '#6b7280',
                  color: getCellColor(cell),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.1s ease'
                }}
                onMouseOver={(e) => {
                  if (gameStatus === 'playing' && !cell.isRevealed) {
                    e.currentTarget.style.background = '#9ca3af';
                  }
                }}
                onMouseOut={(e) => {
                  if (!cell.isRevealed) {
                    e.currentTarget.style.background = '#6b7280';
                  }
                }}
              >
                {getCellDisplay(cell)}
              </button>
            ))
          )}
        </div>

        {/* 操作説明 */}
        <div style={{ 
          marginTop: '20px', 
          color: '#9ca3af', 
          fontSize: '14px', 
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          <div>左クリック: セルを開く</div>
          <div>右クリック: フラグを立てる/外す</div>
          <div>目標: 地雷以外のすべてのセルを開く</div>
        </div>
      </div>
    </div>
  );
};

export default MinesweeperWindow;
