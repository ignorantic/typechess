import {
  Board, Castling, Color, PieceType, Point, Position, Square, Turn,
} from './types';
import {
  getMoves, isCastling, isEnPassant, isFoe, isFoesPawn, isPawnPromotion,
} from './utils';
import FEN from './FEN';
import Notation from './Notation';

class Chess {
  private position: Position;

  constructor(fen: string) {
    this.position = FEN.parse(fen);
  }

  public setPosition(value: object) {
    this.position = { ...this.position, ...value };
  }

  public getPosition(): Position {
    return this.position;
  }

  public getPoint(file: number, rank: number): Point {
    return this.position.board[file][rank];
  }

  public getTurn(): Turn {
    return this.position.turn;
  }

  public static arrange(fen: string): Chess {
    return new Chess(fen);
  }

  public select(file: number, rank: number): Chess {
    if (!Chess.isSquare(file, rank)) {
      throw new TypeError('Invalid square');
    }
    const { board, turn } = this.position;
    let newBoard;
    let isMarked;
    let markedPosition = null;
    if (board[file][rank].piece.color === turn) {
      markedPosition = this.markMoves(file, rank);
    }

    if (markedPosition === null) {
      newBoard = board;
    } else {
      const { markedBoard, isMarked: marked } = markedPosition;
      newBoard = markedBoard;
      isMarked = marked;
    }
    newBoard[file][rank].selected = true;
    this.setPosition({
      board: newBoard,
      selected: { file, rank },
      isMarked,
    });
    return this;
  }

  public move(UCIMove: string) {
    const [start, stop, type, color, promType] = this.prepareToMove(UCIMove);
    this.makeMove(start, stop, promType);
    this.passTurn();
    this.checkAfterMove(type, color, start);

    return this;
  }

  private prepareToMove(UCIMove: string): [Square, Square, PieceType, Color, PieceType] {
    if (UCIMove.length < 4 || UCIMove.length > 5) {
      throw new TypeError('Invalid move.');
    }
    const start = Notation.UCIToSquare(UCIMove.slice(0, 2));
    const stop = Notation.UCIToSquare(UCIMove.slice(2, 4));
    const promType = UCIMove[4] ? FEN.toPieceType(UCIMove[4]) : 4;

    if (start === null || stop === null) {
      throw new TypeError('Invalid move.');
    }

    const { board } = this.position;

    const { type, color } = board[start.file][start.rank].piece;
    return [start, stop, type, color, promType];
  }

  private makeMove(
    start: Square,
    stop: Square,
    promType: PieceType = 4,
  ): void {
    const { board } = this.position;
    const { type, color } = board[start.file][start.rank].piece;
    const newCountFiftyMove = this.checkFiftyMove(type, color, stop);
    // eslint-disable-next-line prefer-const
    let [enPassant, newBoard] = this.handleEnPassant(start, stop);
    let lastMove: string | null;
    // check castling
    if (isCastling(type, start.file, stop.file)) {
      newBoard = Chess.doCastling(newBoard, stop);
      lastMove = Notation.toUCI(start, stop);
    } else {
      // check pawn promotion
      if (isPawnPromotion(type, color, stop.rank)) {
        newBoard[stop.file][stop.rank].piece = { type: promType, color };
        lastMove = Notation.toUCI(start, stop, promType);
      } else {
        newBoard[stop.file][stop.rank].piece = { type, color };
        lastMove = Notation.toUCI(start, stop);
      }
      newBoard[start.file][start.rank].piece = { type: null, color: null };
    }

    this.setPosition({
      board: newBoard,
      countFiftyMove: newCountFiftyMove,
      enPassant,
      lastMove,
    });
  }

  private checkAfterMove(type: PieceType, color: Color, start: Square): void {
    const { castling, fullCount } = this.position;
    const newCastling = Chess.getNewCastling(castling, color, type, start);
    const newFullCount = color === 2 ? fullCount + 1 : fullCount;
    const newFen = this.getFen();
    this.setPosition({
      castling: newCastling,
      fullCount: newFullCount,
      fen: newFen,
    });
  }

  private passTurn(): void {
    const nextTurn = this.position.turn === 1 ? 2 : 1;
    this.setPosition({ turn: nextTurn });
  }

  public getFen(): string {
    return FEN.generate(this.position);
  }

  private static getNewCastling(
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

  private static doCastling(board: Board, kingStop: Square) {
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

  private handleEnPassant(start: Square, stop: Square): [Square | null, Board] {
    const { board, enPassant } = this.position;
    const newBoard = [...board];
    let newEnPassant = null;
    if (board[start.file][start.rank].piece?.type === 0) {
      if (isEnPassant(stop, enPassant)) {
        // capture en-passant
        newBoard[stop.file][start.rank].piece = { type: null, color: null };
      } else if (Math.abs(start.rank - stop.rank) === 2) {
        // check en-passant for next turn
        newEnPassant = this.checkEnPassant(stop);
      }
    }

    return [newEnPassant, newBoard];
  }

  private checkEnPassant(square: Square): Square | null {
    const { board, turn } = this.position;
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

  private checkFiftyMove(
    type: PieceType | null,
    color: Color | null,
    stopSquare: Square,
  ) {
    const { board, countFiftyMove } = this.position;
    const { file, rank } = stopSquare;
    const capture = isFoe(board, color, file, rank);
    return capture || type === 0 ? 0 : countFiftyMove + 1;
  }

  private static isSquare(a: number | Square, b?: number): boolean {
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

  public isMarked(file: number, rank: number): boolean {
    return this.getPoint(file, rank).marked;
  }

  private markMoves(file: number, rank: number) {
    const { board } = this.position;
    if (board[file][rank].piece.type === null) return null;
    const moves = getMoves(this.position, file, rank);
    if (!moves) return null;
    const isMarked = moves.length > 0;
    const markedBoard = [...board];
    moves.forEach((square) => {
      markedBoard[square.file][square.rank].marked = true;
    });
    return { markedBoard, isMarked };
  }
}

export default Chess;
