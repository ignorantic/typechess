export type Color = 1 | 2 | null;

export type PieceType = 0 | 1 | 2 | 3 | 4 | 5 | null;

export type Rank = number;

export type File = number;

export type Square = {
  file: File;
  rank: Rank;
}

export type Castling = {
  1: number;
  2: number;
};

export type Turn = 1 | 2;

export type Ranks = string[];

export type Piece = {
  type: PieceType;
  color: Color;
}

export type Board = Point[][]

export type Point = {
  piece: Piece;
  color: Color;
  selected: boolean;
  marked: boolean;
  id: string;
}

export type Position = {
  board: Board;
  castling: Castling;
  turn: Turn;
  fullCount: number;
  halfCount: number;
  countFiftyMove: number;
  enPassant: Square | null;
  fen: string;
  lastMove: string | null;
  selected?: Square | null;
  isMarked?: boolean;
}
