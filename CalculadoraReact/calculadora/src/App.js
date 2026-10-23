
import React, { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);

  function handleNumber(number) {
    if (display === 'Erro' || waiting) {
      setDisplay(number);
      setWaiting(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  }

  function handleDecimal() {
    if (display === 'Erro' || waiting) {
      setDisplay('0.');
      setWaiting(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }

  function calculate(a, b, op) {
    let result;

    switch (op) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = b === 0 ? 'Erro' : a / b;
        break;
      default:
        result = b;
    }

    if (typeof result === 'number' && Number.isFinite(result)) {
      return Number(result.toPrecision(12));
    }

    return result;
  }

  function handleOperator(nextOperator) {
    if (display === 'Erro') return;

    const value = parseFloat(display);

    if (operator && !waiting) {
      const result = calculate(previous, value, operator);
      setDisplay(String(result));

      if (result === 'Erro') {
        setPrevious(null);
        setOperator(null);
        setWaiting(true);
        return;
      }

      setPrevious(result);
    } else {
      setPrevious(value);
    }

    setOperator(nextOperator);
    setWaiting(true);
  }

  function handleEquals() {
    if (operator === null || previous === null || display === 'Erro') return;

    const result = calculate(previous, parseFloat(display), operator);

    setDisplay(String(result));
    setPrevious(null);
    setOperator(null);
    setWaiting(true);
  }

  function handleClear() {
    setDisplay('0');
    setPrevious(null);
    setOperator(null);
    setWaiting(false);
  }

  function handleBackspace() {
    if (display === 'Erro' || waiting) {
      setDisplay('0');
      setWaiting(false);
      return;
    }

    const newDisplay = display.slice(0, -1);
    setDisplay(newDisplay === '' || newDisplay === '-' ? '0' : newDisplay);
  }

  function handleSign() {
    if (display === 'Erro' || parseFloat(display) === 0) return;
    setDisplay(String(parseFloat(display) * -1));
  }

  function handlePercent() {
    if (display === 'Erro') return;
    setDisplay(String(parseFloat(display) / 100));
  }

  const buttons = [
    ['←', 'backspace'], ['AC', 'clear'], ['%', 'percent'], ['÷', '/'],
    ['7', 'number'], ['8', 'number'], ['9', 'number'], ['×', '*'],
    ['4', 'number'], ['5', 'number'], ['6', 'number'], ['−', '-'],
    ['1', 'number'], ['2', 'number'], ['3', 'number'], ['+', '+'],
    ['±', 'sign'], ['0', 'number'], [',', 'decimal'], ['=', 'equals']
  ];

  return (
    <main className="calculator">
      <h1>Calculadora</h1>

      <div className="display" aria-live="polite">
        {display.replace('.', ',')}
      </div>

      <div className="buttons">
        {buttons.map(([label, type]) => (
          <button
            key={label}
            className={[
              'button',
              ['backspace', 'clear', 'percent', 'sign'].includes(type) ? 'utility' : '',
              ['+', '-', '*', '/'].includes(type) ? 'operator' : '',
              type === 'equals' ? 'equals' : '',
              label === '0' ? 'zero' : ''
            ].filter(Boolean).join(' ')}
            onClick={() => {
              if (type === 'number') handleNumber(label);
              if (type === 'decimal') handleDecimal();
              if (type === 'clear') handleClear();
              if (type === 'backspace') handleBackspace();
              if (type === 'sign') handleSign();
              if (type === 'percent') handlePercent();
              if (type === 'equals') handleEquals();
              if (['+', '-', '*', '/'].includes(type)) handleOperator(type);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;