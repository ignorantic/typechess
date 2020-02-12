import { UCIToSquare, toUCI, toPieceType } from './notation';
import { parseFEN, generateFEN } from './fen';
import {
  isFoe,
  isFoesPawn,
  isEnPassant,
  isPawnPromotion,
  isCastling,
} from './utils';
import {
  Board, Castling, Color, FEN, PieceType, Position, Square,
} from './types';


function getNewCastling(
  castling: Castling,
  color: Color,
  type: PieceType | null,
  square: Square,
): Castling {
  if (color === null) {
    return castling;
  }

  const newCastling = { ...castling };
  if (castling[color] > 0) {
    if (type === 5) {
      newCastling[color] = 0;
    }

    if (type === 1) {
      if (square.file === 0 && castling[color] > 1) {
        newCastling[color] -= 2;
      }

      if (square.file === 7 && castling[color] % 2 === 1) {
        newCastling[color] -= 1;
      }
    }
  }

  return newCastling;
}

function passTurn(turn: number) {
  return turn === 1 ? 2 : 1;
}

function checkAfterMove(
  position: Position, type: PieceType, color: Color, start: Square,
): Position {
  const { castling, turn, fullCount } = position;
  const newCastling = getNewCastling(castling, color, type, start);
  const newFullCount = color === 2 ? fullCount + 1 : fullCount;
  const newTurn = passTurn(turn);
  return {
    ...position,
    turn: newTurn,
    castling: newCastling,
    fullCount: newFullCount,
  };
}

function checkFiftyMove(
  position: Position,
  type: PieceType | null,
  color: Color | null,
  stopSquare: Square,
) {
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
function doCastling(board: Board, kingStop: Square) {
  const newBoard = [...board];
  const { file, rank } = kingStop;
  const color = rank ? 2 : 1;
  const startFile = file === 2 ? 0 : 7;
  const stopFile = file === 2 ? 3 : 5;
  newBoard[file][rank].piece = { type: 5, color };
  newBoard[4][rank].piece = { type: null, color: null };
  newBoard[stopFile][rank].piece = { type: 1, color };
  newBoard[startFile][rank].piece = { type: null, color: null };
  return newBoard;
}

function checkEnPassant(position: Position, square: Square): Square | null {
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

function handleEnPassant(position: Position, start: Square, stop: Square): Position {
  const { board, enPassant } = position;
  const newBoard = [...board];
  let newEnPassant = null;
  if (board[start.file][start.rank].piece?.type === 0) {
    if (isEnPassant(stop, enPassant)) {
      // capture en-passant
      newBoard[stop.file][start.rank].piece = { type: null, color: null };
    } else if (Math.abs(start.rank - stop.rank) === 2) {
      // check en-passant for next turn
      newEnPassant = checkEnPassant(position, stop);
    }
  }

  return { ...position, enPassant: newEnPassant, board: newBoard };
}

function makeMove(
  position: Position,
  type: PieceType | null,
  color: Color | null,
  start: Square,
  stop: Square,
  promType: PieceType = 4,
): Position {
  const newCountFiftyMove = checkFiftyMove(position, type, color, stop);
  const newPosition = handleEnPassant(position, start, stop);
  const { enPassant: newEnPassant } = newPosition;
  let { board: newBoard } = newPosition;
  let lastMove: string | null;
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
    ...position,
    board: newBoard,
    countFiftyMove: newCountFiftyMove,
    enPassant: newEnPassant,
    lastMove,
  };
}

function handleMove(
  position: Position, start: Square, stop: Square, promType: PieceType,
): Position {
  const { board } = position;

  const { type, color } = board[start.file][start.rank].piece;

  const newPosition = makeMove(position, type, color, start, stop, promType);

  const { castling, turn, fullCount } = checkAfterMove(position, type, color, start);
  return {
    ...newPosition,
    castling,
    turn,
    fullCount,
  };
}

export default function move(fen: FEN, UCIMove: string) {
  if (UCIMove.length < 4 || UCIMove.length > 5) return null;
  const start = UCIToSquare(UCIMove.slice(0, 2));
  const stop = UCIToSquare(UCIMove.slice(2, 4));
  const promType = UCIMove[4] ? toPieceType(UCIMove[4]) : null;

  if (start === null || stop === null) return null;
  const position = parseFEN(fen);
  if (position === null) {
    return null;
  }

  const {
    board: newBoard,
    turn: newTurn,
    castling: newCastling,
    enPassant: newEnPassant,
    countFiftyMove: newCountFiftyMove,
    fullCount: newFullCount,
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
    fen: newFEN,
    lastMove,
  };
}
