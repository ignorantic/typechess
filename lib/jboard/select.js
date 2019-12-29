import { parseFEN } from './fen';
import { isSquare, getMoves } from './utils';

/**
 * Mark square for valid moves.
 * @param {Object} position
 * @param {number} file - The file value.
 * @param {number} rank - The rank value.
 * @return {Object}
 */
function markMoves(position, file, rank) {
  const { board } = position;
  if (board[file][rank].piece.type === null) return null;
  const moves = getMoves(position, file, rank);
  if (!moves) return null;
  const isMarked = moves.length > 0;
  const markedBoard = [...board];
  moves.forEach((item) => {
    markedBoard[item.file][item.rank].marked = true;
  });
  return { markedBoard, isMarked };
}

/**
 * Select square.
 * @param {string} FEN
 * @param {number} file - The file value.
 * @param {number} rank - The rank value.
 * @return {Object}
 */
export default function select(FEN, file, rank) {
  if (typeof FEN !== 'string') return null;
  if (!isSquare(file, rank)) return null;
  const position = parseFEN(FEN);
  const { board, turn } = position;
  let newBoard;
  let isMarked;
  let markedPosition = null;
  if (board[file][rank].piece.color === turn) {
    markedPosition = markMoves(position, file, rank);
  }

  if (markedPosition === null) {
    newBoard = board;
  } else {
    const { markedBoard, isMarked: marked } = markedPosition;
    newBoard = markedBoard;
    isMarked = marked;
  }
  newBoard[file][rank].selected = true;
  return { board: newBoard, selected: { file, rank }, isMarked };
}
