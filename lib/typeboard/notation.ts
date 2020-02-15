import {
  isSquare, getAttackedSquares, isCastling, willBeInCheck, willBeCheckmate,
} from './utils';
import FEN from './FEN';
import {
  Piece, PieceType, Square,
} from './types';

export function squareToUCI(file: number, rank: number) {
  if (!isSquare(file, rank)) return null;
  const shiftFile = 97;
  const shiftRank = 1;
  return String.fromCharCode(file + shiftFile) + (rank + shiftRank);
}

export function UCIToSquare(move: string): Square | null {
  const shiftFile = 97;
  const shiftRank = 1;
  if (move.length !== 2 || typeof +move[1] !== 'number') return null;
  const alg = move.toLowerCase();
  const result = {
    file: alg.charCodeAt(0) - shiftFile,
    rank: Number(alg[1]) - shiftRank,
  };
  if (!isSquare(result.file, result.rank)) return null;
  return result;
}

export function UCIToAN(fen: string, move: string, pieces: string[]) {
  const { board, turn } = FEN.parse(fen);
  // TODO: avoid the hack
  const startSquare: Square = UCIToSquare(move.slice(0, 2)) || { file: 0, rank: 0 };
  const stopSquare: Square = UCIToSquare(move.slice(2, 4)) || { file: 0, rank: 0 };

  function filterValidSquare(squares: Square[], type: PieceType) {
    return squares.filter((item) => (
      !(item.file === startSquare.file && item.rank === startSquare.rank)
      && board[item.file][item.rank].piece.type === type
      && !willBeInCheck(fen, turn, item, stopSquare)
    ));
  }


  let start = '';
  const stop = move.slice(2, 4);
  const { type, color } = board[startSquare.file || 0][startSquare.rank || 0].piece;
  if (isCastling(type, startSquare.file, stopSquare.file)) {
    if (stopSquare.file === 2) return 'O-O-O';
    if (stopSquare.file === 6) return 'O-O';
  }
  const isCapture = board[stopSquare.file][stopSquare.rank].piece.type !== null;

  if (type !== 0) {
    const checkingColor = color === 1 ? 2 : 1;
    let checkingSquares = getAttackedSquares(
      board, type, checkingColor,
      stopSquare.file, stopSquare.rank,
    );

    checkingSquares = filterValidSquare(checkingSquares, type);

    if (checkingSquares.length > 0) {
      if (checkingSquares.every((item: Square) => startSquare.file !== item.file)) {
        start = move.slice(0, 1);
      } else if (checkingSquares.every((item: Square) => startSquare.rank !== item.rank)) {
        start = move.slice(1, 2);
      } else start = move.slice(0, 2);
    }
  } else if (isCapture) {
    start = move.slice(0, 1);
  }

  const middle = isCapture ? 'x' : '';
  const piece = type ? pieces[type].toUpperCase() : '';
  const colorInCheck = turn === 1 ? 2 : 1;
  let post = '';
  if (willBeInCheck(fen, colorInCheck, startSquare, stopSquare)) {
    post = willBeCheckmate(fen, startSquare, stopSquare) ? '#' : '+';
  }
  return `${piece}${start}${middle}${stop}${post}`;
}

export function UCIToSAN(fen: string, move: string) {
  const pieces = ['', 'r', 'n', 'b', 'q', 'k'];
  return UCIToAN(fen, move, pieces);
}

export function UCIToFAN(fen: string, move: string): string {
  const pieces = ['', '\u265C', '\u265E', '\u265D', '\u265B', '\u265A'];
  return UCIToAN(fen, move, pieces);
}

export function toUCI(start: Square, stop: Square, promType: PieceType = null): string | null {
  if (
    !start || !stop
    || !isSquare(start.file, start.rank)
    || !isSquare(stop.file, stop.rank)
  ) return null;
  const startUCI = squareToUCI(start.file, start.rank);
  const stopUCI = squareToUCI(stop.file, stop.rank);
  const pieces = ['', 'r', 'n', 'b', 'q'];
  const pieceTypeUCI = (promType && pieces[promType]) || '';
  return `${startUCI}${stopUCI}${pieceTypeUCI}`;
}

export function toPieceType(piece: string | number): PieceType {
  const p: PieceType = 0;
  const r: PieceType = 1;
  const n: PieceType = 2;
  const b: PieceType = 3;
  const q: PieceType = 4;
  const k: PieceType = 5;

  if (typeof piece === 'number') {
    return [r, n, b, q, k].find((type) => type) || p;
  }

  const key: string = piece.toLowerCase();
  if (key !== 'r' && key !== 'n' && key !== 'b' && key !== 'q' && key !== 'k') {
    return p;
  }

  return {
    r, n, b, q, k,
  }[key];
}

export function mapPiece(piece: string): Piece {
  const result: Piece = { type: null, color: null };
  result.type = toPieceType(piece);
  result.color = piece.toLowerCase() === piece ? 2 : 1;
  return result;
}
