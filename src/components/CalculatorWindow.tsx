'use client';

import React, { useState } from 'react';

const CalculatorWindow = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleClearEntry = () => {
    setDisplay('0');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  };

  const Button = ({ 
    onClick, 
    children, 
    style = {} 
  }: { 
    onClick: () => void; 
    children: React.ReactNode; 
    style?: React.CSSProperties;
  }) => (
    <button
      onClick={onClick}
      style={{
        height: '60px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '18px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.1s ease',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );

  return (
    <div style={{
      backgroundColor: '#2c2c2c',
      color: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      {/* Display */}
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #404040',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        <div style={{
          fontSize: '36px',
          fontWeight: '300',
          color: '#ffffff',
          textAlign: 'right',
          wordBreak: 'break-all',
          lineHeight: '1.2'
        }}>
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        flex: 1
      }}>
        {/* Row 1 */}
        <Button 
          onClick={handleClear}
          style={{ backgroundColor: '#ff4444', color: '#ffffff' }}
        >
          C
        </Button>
        <Button 
          onClick={handleClearEntry}
          style={{ backgroundColor: '#666666', color: '#ffffff' }}
        >
          CE
        </Button>
        <Button 
          onClick={handleBackspace}
          style={{ backgroundColor: '#666666', color: '#ffffff' }}
        >
          ⌫
        </Button>
        <Button 
          onClick={() => inputOperation('÷')}
          style={{ backgroundColor: '#ff9500', color: '#ffffff' }}
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button 
          onClick={() => inputNumber('7')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          7
        </Button>
        <Button 
          onClick={() => inputNumber('8')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          8
        </Button>
        <Button 
          onClick={() => inputNumber('9')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          9
        </Button>
        <Button 
          onClick={() => inputOperation('×')}
          style={{ backgroundColor: '#ff9500', color: '#ffffff' }}
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button 
          onClick={() => inputNumber('4')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          4
        </Button>
        <Button 
          onClick={() => inputNumber('5')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          5
        </Button>
        <Button 
          onClick={() => inputNumber('6')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          6
        </Button>
        <Button 
          onClick={() => inputOperation('−')}
          style={{ backgroundColor: '#ff9500', color: '#ffffff' }}
        >
          −
        </Button>

        {/* Row 4 */}
        <Button 
          onClick={() => inputNumber('1')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          1
        </Button>
        <Button 
          onClick={() => inputNumber('2')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          2
        </Button>
        <Button 
          onClick={() => inputNumber('3')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          3
        </Button>
        <Button 
          onClick={() => inputOperation('+')}
          style={{ backgroundColor: '#ff9500', color: '#ffffff' }}
        >
          +
        </Button>

        {/* Row 5 */}
        <Button 
          onClick={toggleSign}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          ±
        </Button>
        <Button 
          onClick={() => inputNumber('0')}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          0
        </Button>
        <Button 
          onClick={inputDecimal}
          style={{ backgroundColor: '#505050', color: '#ffffff' }}
        >
          .
        </Button>
        <Button 
          onClick={performCalculation}
          style={{ backgroundColor: '#ff9500', color: '#ffffff' }}
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default CalculatorWindow;
