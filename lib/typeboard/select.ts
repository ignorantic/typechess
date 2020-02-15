import FEN from './FEN';
import { isSquare, getMoves } from './utils';
import { Position } from './types';

function markMoves(position: Position, file: number, rank: number) {
  const { board } = position;
  if (board[file][rank].piece.type === null) return null;
  const moves = getMoves(position, file, rank);
  if (!moves) return null;
  const isMarked = moves.length > 0;
  const markedBoard = [...board];
  moves.forEach((square) => {
    markedBoard[square.file][square.rank].marked = true;
  });
  return { markedBoard, isMarked };
}

export default function select(fen: string, file: number, rank: number) {
  if (!isSquare(file, rank)) return null;
  const position = FEN.parse(fen);
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
