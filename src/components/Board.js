import React from 'react';
import Square from './Square';

function Board({ squares, onClick, size }) {
  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onClick={() => onClick(i)} />
  );

  const createBoard = () => {
    let board = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(renderSquare(i * size + j));
      }
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return board;
  };

  return <div>{createBoard()}</div>;
}

export default Board;