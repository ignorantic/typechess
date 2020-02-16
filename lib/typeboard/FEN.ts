import { times } from 'ramda';
import {
  Board, Castling, Piece, PieceType, Position, Ranks, Square,
} from './types';
import { squareToUCI } from './notation';
import { isSquare } from './utils';

class FEN {
  private static SIZE = 8;

  private static INITIAL = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  private static EMPTY_PIECE: Piece = { type: null, color: null };

  static getInitial(): string {
    return FEN.INITIAL;
  }

  static getEmptyPiece(): Piece {
    return FEN.EMPTY_PIECE;
  }

  static parse(fen: string): Position {
    const hash = FEN.split(fen);
    const { ranks, tail } = hash;
    if (ranks.length !== 8 || tail.length !== 5) {
      return FEN.parse(FEN.INITIAL);
    }

    const board = FEN.parseBoard(ranks);

    const turn = FEN.parseTurn(tail[0]);
    const castling = FEN.parseCastling(tail[1]);
    const enPassant = board ? FEN.parseEnPassant(tail[2], board) : null;
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
      fen,
      lastMove: null,
    };
  }

  static generate(position: Position): string {
    const {
      board, turn, castling, enPassant, countFiftyMove, fullCount,
    } = position;
    const bd = FEN.getBoard(board);
    const tn = FEN.getTurn(turn);
    const cs = FEN.getCastling(castling);
    const ep = FEN.getEnPassant(enPassant);
    const cn = FEN.getCounts(countFiftyMove, fullCount);
    return `${bd} ${tn} ${cs} ${ep} ${cn}`;
  }

  private static split(fen: string): { ranks: string[]; tail: string[] } {
    const ranks = fen.split('/');
    if (ranks.length !== 8) {
      return { ranks: [], tail: [] };
    }

    const tail = ranks[7].split(' ');
    [ranks[7]] = tail;
    tail.shift();
    ranks.reverse();

    return {
      ranks,
      tail,
    };
  }

  private static parseBoard(ranks: Ranks): Board {
    let file;
    let rank;
    let rankSet;
    const result: Board = [];
    for (let i = 0; i < 8; i += 1) {
      result[i] = [];
      for (let j = 0; j < 8; j += 1) {
        result[i][j] = {
          color: null,
          piece: { color: null, type: null },
          selected: false,
          marked: false,
          id: `${i}.${j}`,
        };
      }
    }

    let countSquare = 1;
    for (rank = 0; rank < 8; rank += 1) {
      countSquare += 1;
      rankSet = FEN.parseRank(ranks[rank]);
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

  private static parseRank(fen: string): Piece[] {
    const rank: string[] = fen.split('');

    const pieces = rank.reduce((acc: Piece[], item: string) => {
      const n = Number(item);
      if (n > 0 && n <= FEN.SIZE) {
        return acc.concat(times(FEN.getEmptyPiece, n));
      }
      return acc.concat(FEN.mapPiece(item));
    }, []);

    return pieces.length === FEN.SIZE ? pieces : times(FEN.getEmptyPiece, FEN.SIZE);
  }

  private static mapPiece(piece: string): Piece {
    const result: Piece = { type: null, color: null };
    result.type = FEN.toPieceType(piece);
    result.color = piece.toLowerCase() === piece ? 2 : 1;
    return result;
  }

  public static toPieceType(piece: string): PieceType {
    const p: PieceType = 0;
    const r: PieceType = 1;
    const n: PieceType = 2;
    const b: PieceType = 3;
    const q: PieceType = 4;
    const k: PieceType = 5;

    const key: string = piece.toLowerCase();
    if (key !== 'p' && key !== 'r' && key !== 'n' && key !== 'b' && key !== 'q' && key !== 'k') {
      return null;
    }

    return {
      p, r, n, b, q, k,
    }[key];
  }

  private static parseTurn(fen: string) {
    return fen === 'w' ? 1 : 2;
  }

  private static parseCastling(fen: string): Castling {
    let cb = 0;
    let cw = 0;

    if (fen === '-' || fen.length > 4) return { 1: 0, 2: 0 };

    if (fen.includes('K')) cw += 1;
    if (fen.includes('Q')) cw += 2;
    if (fen.includes('k')) cb += 1;
    if (fen.includes('q')) cb += 2;

    return { 1: cw, 2: cb };
  }

  private static parseEnPassant(fen: string, board: Board) {
    const fileShift = 97;
    if (fen.length !== 2) return null;
    const rank = +fen[1] - 1;
    if (rank !== 2 && rank !== 5) return null;
    const file = fen.charCodeAt(0) - fileShift;
    if (file < 0 || file > 7) return null;
    if (board[file][rank].piece?.type !== null) return null;
    if (FEN.checkEnPassant(file, rank, board)) return { file, rank };
    return null;
  }

  private static checkEnPassant(file: number, rank: number, board: Board): boolean {
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

  private static getCastling(castling: Castling) {
    let result = '';

    if (castling[1] % 2 === 1) result += 'K';
    if (castling[1] > 1) result += 'Q';
    if (castling[2] % 2 === 1) result += 'k';
    if (castling[2] > 1) result += 'q';
    if (result) return result;

    return '-';
  }

  private static getEnPassant(enPassant: Square | null) {
    if (!enPassant) {
      return '-';
    }

    return squareToUCI(enPassant.file, enPassant.rank);
  }

  private static getTurn(turn: number) {
    if (turn === 1) {
      return 'w';
    }

    return 'b';
  }

  private static getPiece(file: number, rank: number, board: Board) {
    const pieces = ['p', 'r', 'n', 'b', 'q', 'k'];
    if (!isSquare(file, rank)) return null;
    const piece = board[file][rank].piece?.type;
    if (piece === null || piece === undefined) return null;
    const fen = pieces[piece];
    return board[file][rank].piece?.color === 1 ? fen.toUpperCase() : fen;
  }

  private static getBoard(board: Board) {
    let result = '';

    for (let rank = 7; rank >= 0; rank -= 1) {
      let vacancy = 0;
      for (let file = 0; file < 8; file += 1) {
        if (FEN.getPiece(file, rank, board) !== null) {
          if (vacancy !== 0) {
            result += vacancy;
            vacancy = 0;
          }

          result += FEN.getPiece(file, rank, board);
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

  private static getCounts(countFiftyMove: number, fullCount: number) {
    return `${countFiftyMove} ${fullCount}`;
  }
}

export default FEN;
