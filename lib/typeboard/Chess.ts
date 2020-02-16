import { Point, Position, Square } from './types';
import { getMoves } from './utils';
import FEN from './FEN';

class Chess {
  private fen: string;

  private position: Position;

  constructor(fen: string) {
    this.fen = fen;
    this.position = FEN.parse(fen);
  }

  public setPosition(value: Position) {
    this.position = value;
  }

  public getPosition(): Position {
    return this.position;
  }

  public getPoint(file: number, rank: number): Point {
    return this.position.board[file][rank];
  }

  public static arrange(fen: string): Chess {
    return new Chess(fen);
  }

  public select(file: number, rank: number): Chess {
    if (!Chess.isSquare(file, rank)) return this;
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
      ...this.position, board: newBoard, selected: { file, rank }, isMarked,
    });
    return this;
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
