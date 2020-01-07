import { parseFEN } from './fen';
import move from './move';
import { toUCI } from './notation';

/**
 * Check file and rank of square.
 * @param {number|Object.<string, number>} a
 * @param {number} [b]
 * @returns {boolean}
 */
export function isSquare(a, b) {
  if (a === undefined || a === null || b === null) return false;
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return a >= 0 && a <= 7 && b >= 0 && b <= 7;
    }
  } else if (typeof a === 'object') {
    const { file, rank } = a;
    if (typeof file === 'number' && typeof rank === 'number') {
      return file >= 0 && file <= 7 && rank >= 0 && rank <= 7;
    }
  }
  return false;
}

/**
 * Check utils there pawn promotion on board.
 * @param type
 * @param color
 * @param stopRank
 * @returns {boolean}
 */
export function isPawnPromotion(type, color, stopRank) {
  return (
    type === 0
    && ((color === 1 && stopRank === 7)
      || (color === 2 && stopRank === 0))
  );
}

/**
 * Is it castling?
 * @param {number} type
 * @param {number} startFile
 * @param {number} stopFile
 * @return {boolean}
 */
export function isCastling(type, startFile, stopFile) {
  return type === 5 && Math.abs(startFile - stopFile) === 2;
}

/**
 * Is this piece freind?
 * @param {Array} board
 * @param {number} color - Color of piece.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isFriend(board, color, file, rank) {
  if (!isSquare(file, rank)) return false;
  if (board[file][rank].piece.type === null) return false;
  return color === board[file][rank].piece.color;
}

/**
 * Is this piece foe?
 * @param {Array} board
 * @param {number} color - Color of piece.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isFoe(board, color, file, rank) {
  if (!isSquare(file, rank)) return false;
  if (board[file][rank].piece.type === null) return false;
  return color !== board[file][rank].piece.color;
}

/**
 * Is this piece a foe pawn?
 * @param {Array} board
 * @param {number} color - Color of piece.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isFoesPawn(board, color, file, rank) {
  if (!isSquare(file, rank)) return false;
  return board[file][rank].piece.type === 0 && isFoe(board, color, file, rank);
}

/**
 * Is this square empty?
 * @param {Array} board
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isEmpty(board, file, rank) {
  if (!isSquare(file, rank)) return false;
  return board[file][rank].piece.type === null;
}

/**
 * Check utils the capturing en-passant possible.
 * @param {{file: number, rank: number}} square
 * @param {?{file: number, rank: number}} enPassant
 * @returns {boolean}
 */
export function isEnPassant(square, enPassant) {
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

/**
 * Return array of square under attack by the piece.
 * @param {Array} board
 * @param {number} piece - Type of piece.
 * @param {number} color - Color of piece.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {?Array}
 */
export function getAttackedSquares(board, piece, color, file, rank) {
  const count = (piece === 5 || piece === 2) ? 1 : 7;
  const result = [];

  moves[piece].forEach((item) => {
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

/**
 * Is this square under attack?
 * @param {Array} board
 * @param {number} color - Color of active side.
 * @param {number} file - File of square.
 * @param {number} rank - Rank of square.
 * @returns {boolean}
 */
export function isSquareAttacked(board, color, file, rank) {
  function isSquareAttackedByPawn() {
    const targetRank = (color === 1) ? rank + 1 : rank - 1;
    const targetFile = [file - 1, file + 1];

    return targetFile.some(item => (
      isSquare(item, targetRank) && isFoesPawn(board, color, item, targetRank)
    ));
  }

  function isSquareAttackedByPiece() {
    return Object.keys(moves).some((type) => {
      const squares = getAttackedSquares(board, +type, color, file, rank);
      return squares.some(item => board[item.file][item.rank].piece.type === +type);
    });
  }

  return isSquareAttackedByPawn() || isSquareAttackedByPiece();
}

/**
 * Return square on which the king stand.
 * @param {Array} board
 * @param {number} kingColor - Color of king.
 * @returns {?Object}
 */
export function getKing(board, kingColor) {
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

/**
 * Return array of castling move objects.
 * @param {Object} position
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function getCastlingMove(position, file, rank) {
  const { board, castling } = position;
  if (!(file === 4 && (rank === 0 || rank === 7))) return null;
  const color = (rank === 0) ? 1 : 2;
  if (castling[color] === 0) return null;
  // if (isInCheck(color)) return null;
  const result = [];

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
function getPawnCaptures(position, file, targetRank, color) {
  const { board, enPassant } = position;
  const mvs = [];
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

/**
 * Is there check on the board?
 * @param {string|Object} param
 * @param {number} color - Color of king.
 * @returns {boolean}
 */
export function isInCheck(param, color) {
  let position;
  if (typeof param === 'string') {
    position = parseFEN(param);
  } else if (typeof param === 'object') {
    position = param;
  }
  const { board } = position;
  const king = getKing(board, color);
  if (king) {
    const { file, rank } = king;
    return isSquareAttacked(board, color, file, rank);
  }

  return false;
}

/**
 * Check utils there discovered check on board.
 * @param {string} FEN
 * @param {number} turn
 * @param {{file: number, rank: number}} start - Start square of move.
 * @param {{file: number, rank: number}} stop - Stop square of move.
 * @returns {boolean}
 */
export function willBeInCheck(FEN, turn, start, stop) {
  const { FEN: newFEN } = move(FEN, toUCI(start, stop));
  return isInCheck(newFEN, turn);
}

/**
 * Filter illegal mvs.
 * @param {Object} position
 * @param {Array} mvs
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function filterMoves(position, mvs, file, rank) {
  const { FEN, turn } = position;
  if (!mvs) return null;
  return mvs.filter((item) => {
    const start = { file, rank };
    return !willBeInCheck(FEN, turn, start, item);
  });
}

/**
 * Return array of move objects for pawn.
 * @param {Object} position
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function getPawnMoves(position, file, rank) {
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

  return filterMoves(position, mvs, file, rank);
}

/**
 * Return array of move objects for any pieces.
 * @param {Object} position
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function getPieceMoves(position, file, rank) {
  const { board } = position;
  const { type, color } = board[file][rank].piece;
  const mvs = getAttackedSquares(board, type, color, file, rank);
  return filterMoves(position, mvs, file, rank);
}

/**
 * Return array of move objects for king.
 * @param {Object} position
 * @param {number} file
 * @param {number} rank
 * @returns {Array}
 */
function getKingMoves(position, file, rank) {
  let mvs = getPieceMoves(position, file, rank);
  const castlingMove = getCastlingMove(position, file, rank);

  if (castlingMove) mvs = mvs.concat(castlingMove);

  // return filterMoves(position, mvs, file, rank);
  return mvs;
}

/**
 * Return array of valid moves for piece on square.
 * @param {Object} position
 * @param {number} file - The file value.
 * @param {number} rank - The rank value.
 * @returns {Array}
 */
export function getMoves(position, file, rank) {
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

/**
 * Return array of valid moves for all pieces of the color.
 * @param {Object} position
 * @returns {Array}
 */
function getAllMoves(position) {
  const { board, turn } = position;
  let allMoves = [];
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

/**
 * Is there checkmate on the board?
 * @param {string} FEN
 * @returns {boolean}
 */
export function isCheckmate(FEN) {
  const position = parseFEN(FEN);
  const { turn } = position;
  if (!isInCheck(FEN, turn)) return false;
  const allMoves = getAllMoves(position);
  return !allMoves.length;
}

/**
 * Check utils there discovered check on board.
 * @param {string} FEN
 * @param {{file: number, rank: number}} start - Start square of move.
 * @param {{file: number, rank: number}} stop - Stop square of move.
 * @returns {boolean}
 */
export function willBeCheckmate(FEN, start, stop) {
  const { FEN: newFEN } = move(FEN, toUCI(start, stop));
  return isCheckmate(newFEN);
}
