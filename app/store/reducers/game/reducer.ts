import { AnyAction } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import { parseFEN } from '../../../../lib/typeboard/fen';
import { Board, FEN } from '../../../../lib/typeboard/types';

export type Move = string;

export interface Square {
  readonly file: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  readonly rank: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

interface Line {
  readonly fen: FEN;
}

interface GameState {
  readonly board: Board | Array<Array<void>> | null;
  readonly fen: FEN;
  readonly prevFEN: FEN;
  readonly initialFEN: FEN;
  readonly turn: number;
  readonly check: boolean;
  readonly checkmate: boolean;
  readonly halfCount: number;
  readonly currentLine: number;
  readonly lines: Array<Array<Line>>;
  readonly lastMove: Move | null;
  readonly selected: Square | null;
}

// noinspection SpellCheckingInspection
const initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const initialState: GameState = {
  board: [[]],
  fen: initialFen,
  prevFEN: initialFen,
  initialFEN: initialFen,
  turn: 1,
  check: false,
  checkmate: false,
  halfCount: 0,
  currentLine: 0,
  lines: [[{ fen: initialFen }]],
  lastMove: null,
  selected: null,
  ...parseFEN(initialFen),
};

export const { reducer, actions } = createSlice({
  name: 'GAME',
  initialState,
  reducers: {
    select: (state: GameState, action: AnyAction) => ({
      ...state,
      ...action.payload,
    }),
    move: (state: GameState, action: AnyAction) => ({
      ...state,
      ...action.payload,
    }),
    changeFocus: (state: GameState, action: AnyAction) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export default reducer;
