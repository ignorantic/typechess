import { mapPiece, squareToUCI } from './notation';
import { isSquare } from './utils';

export type FEN = string;

type Rank = string;

type Ranks = Array<Rank>;

type Piece = {
  type: number|null;
  color: number|null;
}

type Square = {
  piece: Piece|null;
  color: number|null;
  selected: boolean;
  marked: boolean;
  id: string;
}

export type Board = Array<Array<Square>>

function splitFEN(fen: FEN) {
  const ranks = fen.split('/');
  if (ranks.length !== 8) return null;
  const tail = ranks[7].split(' ');
  [ranks[7]] = tail;
  tail.shift();
  if (tail.length !== 5) return null;
  ranks.reverse();

  return {
    ranks,
    tail,
  };
}

export function parseFENRank(fen: FEN): Array<Piece>|null {
  let n;
  let count = 0;
  const { length } = fen;
  const result = [];

  if (length > 8) return null;

  for (let i = 0; i < length; i += 1) {
    if (+fen[i] > 0 && +fen[i] < 9) {
      // fill squares with empty
      n = +fen[i];
      if (count + n < 9) {
        for (let j = 0; j < n; j += 1) {
          result[count] = { type: null, color: null };
          count += 1;
        }
      } else return null;
    } else {
      const piece = mapPiece(fen[i]);
      if (piece) result[count] = piece;
      else return null;
      count += 1;
    }

    if (count > 8) return null;
  }

  if (count !== 8) return null;

  return result;
}

export function parseFENBoard(ranks: Ranks): Board|null {
  let file;
  let rank;
  let rankSet;
  const result: Board = [];
  for (let i = 0; i < 8; i += 1) {
    result[i] = [];
    for (let j = 0; j < 8; j += 1) {
      result[i][j] = {
        color: null,
        piece: null,
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
        ...result[file][rank],
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

export function parseFENTurn(fen: FEN) {
  return fen === 'w' ? 1 : 2;
}

export function parseFENCastling(fen: FEN) {
  let cb = 0;
  let cw = 0;
  const { length } = fen;

  if (fen === '-' || length > 4) return { 1: 0, 2: 0 };

  if (fen.includes('K')) cw += 1;
  if (fen.includes('Q')) cw += 2;
  if (fen.includes('k')) cb += 1;
  if (fen.includes('q')) cb += 2;

  return { 1: cw, 2: cb };
}

export function checkFENEnPassant(file: number, rank: number, board: Board): boolean {
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
    board[file][neighborRank].piece?.type !== 0
    || board[file][neighborRank].piece?.color !== foeColor
  ) {
    return false;
  }

  return (
    (board[file - 1][neighborRank].piece?.type === 0
      && board[file - 1][neighborRank].piece?.color === friendColor)
    || (board[file + 1][neighborRank].piece?.type === 0
      && board[file + 1][neighborRank].piece?.color === friendColor)
  );
}

export function parseFENEnPassant(fen: FEN, board: Board) {
  const fileShift = 97;
  if (fen.length !== 2) return null;
  const rank = +fen[1] - 1;
  if (rank !== 2 && rank !== 5) return null;
  const file = fen.charCodeAt(0) - fileShift;
  if (file < 0 || file > 7) return null;
  if (board[file][rank].piece?.type !== null) return null;
  if (checkFENEnPassant(file, rank, board)) return { file, rank };
  return null;
}

export function parseFEN(fen: FEN) {
  const hash = splitFEN(fen);
  if (hash === null) return false;
  const { ranks, tail } = hash;
  const board: Board|null = parseFENBoard(ranks);
  const turn = parseFENTurn(tail[0]);
  const castling = parseFENCastling(tail[1]);
  const enPassant = board ? parseFENEnPassant(tail[2], board) : false;
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
    FEN: fen,
  };
}

export function getFENCastling(castling: Array<number>) {
  let result = '';

  if (castling[1] % 2 === 1) result += 'K';
  if (castling[1] > 1) result += 'Q';
  if (castling[2] % 2 === 1) result += 'k';
  if (castling[2] > 1) result += 'q';
  if (result) return result;

  return '-';
}

export function getFENEnPassant(enPassant: { file: number; rank: number}) {
  if (!enPassant) {
    return '-';
  }

  return squareToUCI(enPassant.file, enPassant.rank);
}

export function getFENTurn(turn: number) {
  if (turn === 1) {
    return 'w';
  }

  return 'b';
}

export function getFENPiece(file: number, rank: number, board: Board) {
  const pieces = ['p', 'r', 'n', 'b', 'q', 'k'];
  if (!isSquare(file, rank)) return null;
  const piece = board[file][rank].piece?.type;
  if (piece === null || piece === undefined) return null;
  const FEN = pieces[piece];
  return board[file][rank].piece?.color === 1 ? FEN.toUpperCase() : FEN;
}

export function getFENBoard(board: Board) {
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

export function getFENCounts(countFiftyMove: number, fullCount: number) {
  return `${countFiftyMove} ${fullCount}`;
}

export function generateFEN(
  board: Board,
  turn: number,
  castling: Array<number>,
  enPassant: { file: number; rank: number},
  countFiftyMove: number,
  fullCount: number,
): FEN {
  const bd = getFENBoard(board);
  const tn = getFENTurn(turn);
  const cs = getFENCastling(castling);
  const ep = getFENEnPassant(enPassant);
  const cn = getFENCounts(countFiftyMove, fullCount);
  return `${bd} ${tn} ${cs} ${ep} ${cn}`;
}
