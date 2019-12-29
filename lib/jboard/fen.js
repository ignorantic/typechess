import { squareToUCI, mapPiece } from './notation';
import { isSquare } from './utils';

/**
 * Splite FEN string.
 * @param {string} FEN
 * @returns {?{file: number, rank: number}}
 */
export function splitFEN(FEN) {
  const ranks = FEN.split('/');
  if (ranks.length !== 8) return null;
  const tail = ranks[7].split(' ');
  const lastRank = tail[0];
  ranks[7] = lastRank;
  tail.shift();
  if (tail.length !== 5) return null;
  ranks.reverse();

  return {
    ranks,
    tail,
  };
}

/**
 * Parse FEN string of rank.
 * @param {string} FEN
 * @returns {Array.<Object>}
 */
export function parseFENRank(FEN) {
  let n;
  let count = 0;
  const { length } = FEN;
  const result = [];

  if (length > 8) return null;

  for (let i = 0; i < length; i += 1) {
    if (+FEN[i] > 0 && +FEN[i] < 9) {
      // fill squares with empty
      n = +FEN[i];
      if (count + n < 9) {
        for (let j = 0; j < n; j += 1) {
          result[count] = { type: null, color: null };
          count += 1;
        }
      } else return null;
    } else {
      const piece = mapPiece(FEN[i]);
      if (piece) result[count] = piece;
      else return null;
      count += 1;
    }

    if (count > 8) return null;
  }

  if (count !== 8) return null;

  return result;
}

/**
 * Parse FEN string of ranks.
 * @param {Array.<string>} ranks
 * @returns {Array}
 */
export function parseFENBoard(ranks) {
  let file;
  let rank;
  let rankSet;
  const result = [];
  for (let i = 0; i < 8; i += 1) {
    result[i] = [];
    for (let j = 0; j < 8; j += 1) {
      result[i][j] = {
        selected: false,
        marked: false,
        id: `${i}.${j}`,
      };
    }
  }

  let countSquare = 1;
  for (rank = 0; rank < 8; rank += 1) {
    countSquare += 1;
    rankSet = parseFENRank(ranks[rank]);
    if (rankSet === null) return null;
    if (rankSet.length !== 8) return null;
    for (file = 0; file < 8; file += 1) {
      countSquare += 1;
      result[file][rank] = {
        color: countSquare % 2 ? 2 : 1,
        piece: {
          type: rankSet[file].type,
          color: rankSet[file].color,
        },
      };
    }
  }

  return result;
}

/**
 * Parse FEN string of turn.
 * @param {string} FEN
 */
export function parseFENTurn(FEN) {
  return FEN === 'w' ? 1 : 2;
}

/**
 * Parse FEN string of castling.
 * @param FEN
 * @return {{1: number, 2: number}}
 */
export function parseFENCastling(FEN) {
  let cb = 0;
  let cw = 0;
  const { length } = FEN;

  if (FEN === '-' || length > 4) return { 1: 0, 2: 0 };

  if (FEN.includes('K')) cw += 1;
  if (FEN.includes('Q')) cw += 2;
  if (FEN.includes('k')) cb += 1;
  if (FEN.includes('q')) cb += 2;

  return { 1: cw, 2: cb };
}

/**
 * Check FEN string of castling.
 * @param {number} file
 * @param {number} rank
 * @param {Array} board
 * @returns {boolean}
 */
export function checkFENEnPassant(file, rank, board) {
  let foeColor;
  let friendColor;
  let neighborRank;

  switch (rank) {
    case 2: {
      friendColor = 2;
      foeColor = 1;
      neighborRank = 3;
      break;
    }
    case 5: {
      friendColor = 1;
      foeColor = 2;
      neighborRank = 4;
      break;
    }
    default: {
      return false;
    }
  }

  if (
    board[file][neighborRank].piece.type !== 0
    || board[file][neighborRank].piece.color !== foeColor
  ) {
    return false;
  }

  return (
    (board[file - 1][neighborRank].piece.type === 0
      && board[file - 1][neighborRank].piece.color === friendColor)
    || (board[file + 1][neighborRank].piece.type === 0
      && board[file + 1][neighborRank].piece.color === friendColor)
  );
}

/**
 * Parse FEN string of en passant.
 * @param FEN
 * @param board
 * @return {?{file: number, rank: number}}
 */
export function parseFENEnPassant(FEN, board) {
  const fileShift = 97;
  if (FEN.length !== 2) return null;
  const rank = +FEN[1] - 1;
  if (rank !== 2 && rank !== 5) return null;
  const file = FEN.charCodeAt(0) - fileShift;
  if (file < 0 || file > 7) return null;
  if (board[file][rank].piece.type !== null) return null;
  if (checkFENEnPassant(file, rank, board)) return { file, rank };
  return null;
}

export function parseFEN(FEN) {
  const hash = splitFEN(FEN);
  if (hash === null) return false;
  const { ranks, tail } = hash;
  const board = parseFENBoard(ranks);
  const turn = parseFENTurn(tail[0]);
  const castling = parseFENCastling(tail[1]);
  const enPassant = parseFENEnPassant(tail[2], board);
  const countFiftyMove = +tail[3];
  const fullCount = +tail[4];
  const halfCount = ((fullCount * 2) + turn) - 3;
  return {
    board,
    turn,
    castling,
    enPassant,
    countFiftyMove,
    fullCount,
    halfCount,
    FEN,
  };
}

/**
 * Return FEN string of castling.
 * @param castling
 * @returns {string}
 */
export function getFENCastling(castling) {
  let result = '';

  if (castling[1] % 2 === 1) result += 'K';
  if (castling[1] > 1) result += 'Q';
  if (castling[2] % 2 === 1) result += 'k';
  if (castling[2] > 1) result += 'q';
  if (result) return result;

  return '-';
}

/**
 * Return FEN string of en passant.
 * @param enPassant
 * @return {string}
 */
export function getFENEnPassant(enPassant) {
  if (!enPassant) {
    return '-';
  }

  return squareToUCI(enPassant.file, enPassant.rank);
}

/**
 * Return FEN string of turn.
 * @param turn
 * @return {string}
 */
export function getFENTurn(turn) {
  if (turn === 1) {
    return 'w';
  }

  return 'b';
}

/**
 * Return FEN string of piece.
 * @param {number} file
 * @param {number} rank
 * @param {Array} board
 * @returns {string|null}
 */
export function getFENPiece(file, rank, board) {
  const pieces = ['p', 'r', 'n', 'b', 'q', 'k'];
  if (!isSquare(file, rank)) return null;
  const piece = board[file][rank].piece.type;
  if (piece === null) return null;
  const FEN = pieces[piece];
  return board[file][rank].piece.color === 1 ? FEN.toUpperCase() : FEN;
}

/**
 * Return FEN string of board.
 * @param {Array} board
 * @returns {string}
 */
export function getFENBoard(board) {
  let result = '';

  for (let rank = 7; rank >= 0; rank -= 1) {
    let vacancy = 0;
    for (let file = 0; file < 8; file += 1) {
      if (getFENPiece(file, rank, board) !== null) {
        if (vacancy !== 0) {
          result += vacancy;
          vacancy = 0;
        }

        result += getFENPiece(file, rank, board);
      } else {
        vacancy += 1;
      }
    }

    if (vacancy !== 0) {
      result += vacancy;
    }

    if (rank > 0) {
      result += '/';
    }
  }

  return result;
}

/**
 * Return FEN string of move fullCount.
 * @param countFiftyMove
 * @param fullCount
 * @return {string}
 */
export function getFENCounts(countFiftyMove, fullCount) {
  return `${countFiftyMove} ${fullCount}`;
}

/**
 * Return full FEN.
 * @param board
 * @param turn
 * @param castling
 * @param enPassant
 * @param countFiftyMove
 * @param fullCount
 * @return {string}
 */
export function generateFEN(board, turn, castling, enPassant, countFiftyMove, fullCount) {
  const bd = getFENBoard(board);
  const tn = getFENTurn(turn);
  const cs = getFENCastling(castling);
  const ep = getFENEnPassant(enPassant);
  const cn = getFENCounts(countFiftyMove, fullCount);
  return `${bd} ${tn} ${cs} ${ep} ${cn}`;
}
