import React, { useState } from 'react';
import Board from './Board';
import { calculateWinner } from '../helpers';

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [size, setSize] = useState(3);

  const current = history[stepNumber];
  const { winner, isDraw } = calculateWinner(current.squares, size);

  const handleClick = (i) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i] || isDraw) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyCopy.concat([{ squares }]));
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(size * size).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const handleSizeIncrease = () => {
    if (size < 10) {
      setSize(size + 1);
      resetGame();
    }
  };

  const handleSizeDecrease = () => {
    if (size > 3) {
      setSize(size - 1);
      resetGame();
    }
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} size={size} />
      </div>
      <div className="game-info">
        <div>
          {winner ? `Winner: ${winner}` : isDraw ? 'Game is a Draw!' : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </div>
        <ul>{moves}</ul>
      </div>
      <div className="game-settings">
        <div>
          <button onClick={handleSizeDecrease} disabled={size <= 3}>-</button>
          <span> {size}x{size} </span>
          <button onClick={handleSizeIncrease} disabled={size >= 10}>+</button>
        </div>
      </div>
      <div className='reset-button'>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
}

export default Game;