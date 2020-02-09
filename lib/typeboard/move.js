import { UCIToSquare, toUCI } from './notation';
import { parseFEN, generateFEN } from './fen';
import {
  isFoe, isFoesPawn, isEnPassant, isPawnPromotion, isCastling,
} from './utils';

/**
 * Check possibility of castling move for next moves.
 * @param {Object} castling
 * @param {number} color - Color of piece.
 * @param {number} type - Type of piece.
 * @param {number} file
 */
function checkCastling(castling, color, type, file) {
  const newCastling = { ...castling };
  if (castling[color] > 0) {
    if (type === 5) {
      newCastling[color] = 0;
    }

    if (type === 1) {
      if (file === 0 && castling[color] > 1) {
        newCastling[color] -= 2;
      }

      if (file === 7 && castling[color] % 2 === 1) {
        newCastling[color] -= 1;
      }
    }
  }

  return newCastling;
}

/** Pass turn. */
function passTurn(turn) {
  let newTurn;
  if (turn === 1) {
    newTurn = 2;
  } else {
    newTurn = 1;
  }
  return newTurn;
}

/**
 * Check are there castling moves for next turn.
 * @param {Object} position
 * @param {number} type - Type of piece.
 * @param {number} color - Color of piece.
 * @param {{file: number, rank: number}} start - Start square of move.
 */
function checkAfterMove(position, type, color, start) {
  const { castling, turn, fullCount } = position;
  const newCastling = checkCastling(castling, color, type, start.file);
  const newFullCount = color === 2 ? fullCount + 1 : fullCount;
  const newTurn = passTurn(turn);
  return {
    newTurn,
    newCastling,
    newFullCount,
  };
}

/**
 * Check fullCount of fifty-move rule.
 * @param {Object} position
 * @param {number} type - Type of piece.
 * @param {number} color - Color of piece.
 * @param {{file: number, rank: number}} stopSquare - Stop square of move.
 */
function checkFiftyMove(position, type, color, stopSquare) {
  const { board, countFiftyMove } = position;
  const { file, rank } = stopSquare;
  const capture = isFoe(board, color, file, rank);
  return capture || type === 0 ? 0 : countFiftyMove + 1;
}

/**
 * Do castling on the board.
 * @param {Array} board
 * @param {{file: number, rank: number}} kingStop
 */
function doCastling(board, kingStop) {
  const newBoard = [...board];
  const { file, rank } = kingStop;
  const color = rank ? 2 : 1;
  const startFile = file === 2 ? 0 : 7;
  const stopFile = file === 2 ? 3 : 5;
  newBoard[file][rank].piece.type = 5;
  newBoard[file][rank].piece.color = color;
  newBoard[4][rank].piece.type = null;
  newBoard[4][rank].piece.color = null;
  newBoard[stopFile][rank].piece.type = 1;
  newBoard[stopFile][rank].piece.color = color;
  newBoard[startFile][rank].piece.type = null;
  newBoard[startFile][rank].piece.color = null;
  return newBoard;
}

/**
 * Check possible capturing en-passant for next turn.
 * @param {Object} position
 * @param {{file: number, rank: number}} square
 */
function checkEnPassant(position, square) {
  const { board, turn } = position;
  const { file, rank } = square;
  const color = turn;
  if (
    isFoesPawn(board, color, file - 1, rank)
    || isFoesPawn(board, color, file + 1, rank)
  ) {
    if (color === 1) {
      if (rank === 3) return { file, rank: 2 };
    } else if (rank === 4) return { file, rank: 5 };
  }

  return null;
}

/**
 * Remove capturing piece if an en-passant capture was made
 * and check capturing en-passant for next turn.
 * @param {Object} position
 * @param {{file: number, rank: number}} start - Start square of move.
 * @param {{file: number, rank: number}} stop - Stop square of move.
 * @return {Object}
 */
function handleEnPassant(position, start, stop) {
  const { board, enPassant } = position;
  const newBoard = [...board];
  let newEnPassant = null;
  if (board[start.file][start.rank].piece.type === 0) {
    if (isEnPassant(stop, enPassant)) {
      // capture en-passant
      newBoard[stop.file][start.rank].piece = { type: null, color: null };
    } else if (Math.abs(start.rank - stop.rank) === 2) {
      // check en-passant for next turn
      newEnPassant = checkEnPassant(position, stop);
    }
  }

  return { newEnPassant, newBoard };
}

/**
 * Make move on the board.
 * @param {Object} position
 * @param {number} type - Type of piece.
 * @param {number} color - Color of piece.
 * @param {{file: number, rank: number}} start - Start square of move.
 * @param {{file: number, rank: number}} stop - Stop square of move.
 * @param {number} [promType] - Type of piece for pawn promotion.
 */
function makeMove(position, type, color, start, stop, promType = 4) {
  const newCountFiftyMove = checkFiftyMove(position, type, color, stop);
  const newPosition = handleEnPassant(position, start, stop);
  const { newEnPassant } = newPosition;
  let { newBoard } = newPosition;
  let lastMove;
  // check castling
  if (isCastling(type, start.file, stop.file)) {
    newBoard = doCastling(newBoard, stop);
    lastMove = toUCI(start, stop);
  } else {
    // check pawn promotion
    if (isPawnPromotion(type, color, stop.rank)) {
      newBoard[stop.file][stop.rank].piece = { type: promType, color };
      lastMove = toUCI(start, stop, promType);
    } else {
      newBoard[stop.file][stop.rank].piece = { type, color };
      lastMove = toUCI(start, stop);
    }
    newBoard[start.file][start.rank].piece = { type: null, color: null };
  }

  return {
    newBoard,
    newCountFiftyMove,
    newEnPassant,
    lastMove,
  };
}

/**
 * Handle move.
 * @param {Object} position
 * @param {{file: number, rank: number}} start - Start square of move.
 * @param {{file: number, rank: number}} stop - Stop square of move.
 * @param {number} [promType] - Type of piece for pawn promotion.
 * @return {Object}
 */
function handleMove(position, start, stop, promType) {
  const { board } = position;
  const { type, color } = board[start.file][start.rank].piece;

  const {
    newBoard, newCountFiftyMove, newEnPassant, lastMove,
  } = makeMove(position, type, color, start, stop, promType);

  const { newCastling, newTurn, newFullCount } = checkAfterMove(position, type, color, start);
  return {
    newBoard,
    newCountFiftyMove,
    newEnPassant,
    newCastling,
    newTurn,
    newFullCount,
    lastMove,
  };
}

/**
 * Do move via algebraic notation.
 * @param {string} FEN
 * @param {string} UCIMove
 * @return {?Object}
 */
export default function move(FEN, UCIMove) {
  if (typeof FEN !== 'string' || typeof UCIMove !== 'string') return null;
  if (UCIMove.length < 4 || UCIMove.length > 5) return null;
  const start = UCIToSquare(UCIMove.slice(0, 2));
  const stop = UCIToSquare(UCIMove.slice(2, 4));
  const promType = UCIMove[4];

  if (start === null || stop === null) return null;
  const position = parseFEN(FEN);
  const {
    newBoard,
    newTurn,
    newCastling,
    newEnPassant,
    newCountFiftyMove,
    newFullCount,
    lastMove,
  } = handleMove(position, start, stop, promType);
  const newFEN = generateFEN(
    newBoard, newTurn, newCastling, newEnPassant,
    newCountFiftyMove, newFullCount,
  );
  return {
    board: newBoard,
    turn: newTurn,
    castling: newCastling,
    enPassant: newEnPassant,
    countFiftyMove: newCountFiftyMove,
    fullCount: newFullCount,
    FEN: newFEN,
    lastMove,
  };
}
