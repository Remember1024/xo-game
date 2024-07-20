export function calculateWinner(squares, size) {
  const lines = [];

  // Rows
  for (let i = 0; i < size; i++) {
    lines.push([...Array(size)].map((_, j) => i * size + j));
  }

  // Columns
  for (let i = 0; i < size; i++) {
    lines.push([...Array(size)].map((_, j) => j * size + i));
  }

  // Diagonals
  lines.push([...Array(size)].map((_, i) => i * size + i));
  lines.push([...Array(size)].map((_, i) => (i + 1) * (size - 1)));

  for (let i = 0; i < lines.length; i++) {
    const [a, ...rest] = lines[i];
    if (squares[a] && rest.every((index) => squares[index] === squares[a])) {
      return { winner: squares[a], isDraw: false };
    }
  }

  const isDraw = squares.every(square => square !== null);
  return { winner: null, isDraw };
}
  