import { parseFEN } from './fen';
import move from './move';
import { toUCI } from './notation';
import {
  Color, PieceType, Rank, File, Board, Square, Position, FEN,
} from './types';

export function isSquare(a: number | Square, b?: number) {
  if (a === undefined || a === null || b === null) return false;
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return a >= 0 && a <= 7 && b >= 0 && b <= 7;
    }
  } else {
    const { file, rank } = a;
    return file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
  }
  return false;
}

export function isPawnPromotion(type: PieceType, color: Color, stopRank: Rank) {
  return (
    type === 0
    && ((color === 1 && stopRank === 7)
      || (color === 2 && stopRank === 0))
  );
}

export function isCastling(type: PieceType, startFile: File, stopFile: File) {
  return type === 5 && Math.abs(startFile - stopFile) === 2;
}

export function isFriend(board: Board, color: Color, file: File, rank: Rank): boolean {
  if (!isSquare(file, rank)) return false;
  if (board[file][rank].piece.type === null) return false;
  return color === board[file][rank].piece.color;
}

export function isFoe(board: Board, color: Color, file: File, rank: Rank) {
  if (!isSquare(file, rank)) return false;
  if (board[file][rank].piece.type === null) return false;
  return color !== board[file][rank].piece.color;
}

export function isFoesPawn(board: Board, color: Color, file: File, rank: Rank) {
  if (!isSquare(file, rank)) return false;
  return board[file][rank].piece.type === 0 && isFoe(board, color, file, rank);
}

export function isEmpty(board: Board, file: File, rank: Rank): boolean {
  if (!isSquare(file, rank)) return false;
  return board[file][rank].piece.type === null;
}

/**
 * Check utils the capturing en-passant possible.
 * @param {{file: number, rank: number}} square
 * @param {?{file: number, rank: number}} enPassant
 * @returns {boolean}
 */
export function isEnPassant(square: Square, enPassant: Square | null): boolean {
  if (!enPassant) return false;
  return enPassant.file === square.file && enPassant.rank === square.rank;
}

const rook = [
  { file: 0, rank: 1 }, { file: 1, rank: 0 },
  { file: 0, rank: -1 }, { file: -1, rank: 0 },
];

const bishop = [
  { file: 1, rank: 1 }, { file: 1, rank: -1 },
  { file: -1, rank: -1 }, { file: -1, rank: 1 },
];

const knight = [
  { file: 1, rank: 2 }, { file: 2, rank: 1 },
  { file: 2, rank: -1 }, { file: 1, rank: -2 },
  { file: -1, rank: -2 }, { file: -2, rank: -1 },
  { file: -2, rank: 1 }, { file: -1, rank: 2 },
];

const moves = {
  1: [...rook],
  2: [...knight],
  3: [...bishop],
  4: [...rook, ...bishop],
  5: [...rook, ...bishop],
};

export function getAttackedSquares(
  board: Board, piece: PieceType, color: Color, file: File, rank: Rank,
): Square[] {
  const count = (piece === 5 || piece === 2) ? 1 : 7;
  const result: Square[] = [];

  if (piece === null || piece === 0) {
    return result;
  }

  moves[piece].forEach((item: Square) => {
    let i = 0;
    while (i < count) {
      i += 1;
      const trg = {
        file: file + (i * item.file),
        rank: rank + (i * item.rank),
      };

      if (isSquare(trg)) {
        if (isFriend(board, color, trg.file, trg.rank)) {
          break;
        } else {
          result.push({ ...trg });
        }
      } else {
        break;
      }

      if (isFoe(board, color, trg.file, trg.rank)) {
        break;
      }
    }
  });

  return result;
}

export function isSquareAttacked(board: Board, color: Color, file: File, rank: Rank): boolean {
  function isSquareAttackedByPawn() {
    const targetRank = (color === 1) ? rank + 1 : rank - 1;
    const targetFile = [file - 1, file + 1];

    return targetFile.some((item) => (
      isSquare(item, targetRank) && isFoesPawn(board, color, item, targetRank)
    ));
  }

  function isSquareAttackedByPiece() {
    const pieceTypes: PieceType[] = [1, 2, 3, 4, 5];
    return pieceTypes.some((type) => {
      const squares = getAttackedSquares(board, type, color, file, rank);
      return squares.some((item) => board[item.file][item.rank].piece.type === type);
    });
  }

  return isSquareAttackedByPawn() || isSquareAttackedByPiece();
}

export function getKing(board: Board, kingColor: Color) {
  for (let file = 0; file < 8; file += 1) {
    for (let rank = 0; rank < 8; rank += 1) {
      const { type, color } = board[file][rank].piece;
      if (type === 5 && color === kingColor) {
        return {
          file,
          rank,
        };
      }
    }
  }

  return null;
}

function getCastlingMove(position: Position, file: File, rank: Rank): Square[] {
  const { board, castling } = position;
  if (!(file === 4 && (rank === 0 || rank === 7))) return [];
  const color = (rank === 0) ? 1 : 2;
  const result: Square[] = [];

  if (
    castling[color] > 1
    && !isSquareAttacked(board, color, file - 1, rank)
    && (isEmpty(board, file - 1, rank))
    && (isEmpty(board, file - 2, rank))
    && (isEmpty(board, file - 3, rank))
  ) {
    result.push({ file: 2, rank });
  }

  if (
    castling[color] % 2 === 1 && !isSquareAttacked(board, color, file + 1, rank)
    && (isEmpty(board, file + 1, rank)) && (isEmpty(board, file + 2, rank))
  ) {
    result.push({ file: 6, rank });
  }

  return result;
}

/**
 * Return array of captures for pawn.
 * @param {Object} position
 * @param {number} file
 * @param {number} targetRank
 * @param {number} color
 * @returns {Array}
 */
function getPawnCaptures(position: Position, file: File, targetRank: Rank, color: Color): Square[] {
  const { board, enPassant } = position;
  const mvs: Square[] = [];
  const targets = [
    { file: file - 1, rank: targetRank },
    { file: file + 1, rank: targetRank },
  ];

  targets.forEach((item) => {
    if (
      isFoe(board, color, item.file, item.rank)
      || (isEnPassant(item, enPassant))
    ) {
      mvs.push({ ...item });
    }
  });

  return mvs;
}

export function isInCheck(param: FEN | Position, color: Color): boolean {
  let position;
  if (typeof param === 'string') {
    position = parseFEN(param);
  } else if (typeof param === 'object') {
    position = param;
  } else {
    return false;
  }

  const { board } = position;
  const king = getKing(board, color);
  if (king) {
    const { file, rank } = king;
    return isSquareAttacked(board, color, file, rank);
  }

  return false;
}

export function willBeInCheck(fen: FEN, turn: 1 | 2, start: Square, stop: Square): boolean {
  const uciPath = toUCI(start, stop);
  if (uciPath === null) {
    return false;
  }

  const result = move(fen, uciPath);
  if (result === null) {
    return false;
  }
  const { fen: newFen } = result;
  return isInCheck(newFen, turn);
}

function filterMoves(position: Position, mvs: Square[], file: File, rank: Rank) {
  const { fen, turn } = position;
  if (!mvs) return null;
  return mvs.filter((item) => {
    const start = { file, rank };
    return !willBeInCheck(fen, turn, start, item);
  });
}

function getPawnMoves(position: Position, file: File, rank: Rank): Square[] {
  const { board } = position;
  let mvs = [];
  const { color } = board[file][rank].piece;
  const direction = (color === 1) ? 1 : -1;
  const target = { file, rank: rank + direction };

  if (isSquare(target)) {
    if (board[target.file][target.rank].piece.type === null) {
      mvs.push({ ...target });
      if (
        (color === 1 && rank === 1)
        || (color === 2 && rank === 6)
      ) {
        target.rank = rank + (2 * direction);
        if (board[target.file][target.rank].piece.type === null) {
          mvs.push({ ...target });
        }
      }
    }
  }

  mvs = mvs.concat(getPawnCaptures(position, file, rank + direction, color));

  return filterMoves(position, mvs, file, rank) || [];
}

function getPieceMoves(position: Position, file: File, rank: Rank): Square[] {
  const { board } = position;
  const { type, color } = board[file][rank].piece;
  const mvs = getAttackedSquares(board, type, color, file, rank);
  return filterMoves(position, mvs, file, rank) || [];
}

function getKingMoves(position: Position, file: File, rank: Rank): Square[] {
  let mvs = getPieceMoves(position, file, rank);
  const castlingMove = getCastlingMove(position, file, rank);

  if (castlingMove) mvs = mvs.concat(castlingMove);

  return mvs;
}

export function getMoves(position: Position, file: File, rank: Rank): Square[] {
  const { board } = position;
  switch (board[file][rank].piece.type) {
    case 0: {
      return getPawnMoves(position, file, rank);
    }
    case 5: {
      return getKingMoves(position, file, rank);
    }
    case null: {
      return [];
    }
    default: {
      return getPieceMoves(position, file, rank);
    }
  }
}

function getAllMoves(position: Position): Square[] {
  const { board, turn } = position;
  let allMoves: Square[] = [];
  for (let f = 0; f < 8; f += 1) {
    for (let r = 0; r < 8; r += 1) {
      if (board[f][r].piece.color === turn) {
        const mv = getMoves(position, f, r);
        if (mv) allMoves = allMoves.concat(mv);
      }
    }
  }

  return allMoves;
}

export function isCheckmate(fen: FEN): boolean {
  const position = parseFEN(fen);
  const { turn } = position;
  if (!isInCheck(fen, turn)) return false;
  const allMoves = getAllMoves(position);
  return !allMoves.length;
}

export function willBeCheckmate(fen: FEN, start: Square, stop: Square): boolean {
  const uciMove = toUCI(start, stop);
  if (uciMove === null) {
    return false;
  }
  const result = move(fen, uciMove);
  if (result === null) {
    return false;
  }
  const { fen: newFen } = result;
  return isCheckmate(newFen);
}
