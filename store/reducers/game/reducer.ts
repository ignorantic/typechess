import { AnyAction } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import { parseFEN } from '../../../lib/jboard/fen';

type FEN = string;

type Move = string;

export interface Square {
  readonly file: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  readonly rank: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

interface Line {
  readonly FEN: FEN;
}

interface GameState {
  readonly board: Array<Array<object>>;
  readonly FEN: FEN;
  readonly prevFEN: FEN;
  readonly initialFEN: FEN;
  readonly turn: number;
  readonly check: boolean;
  readonly checkmate: boolean;
  readonly halfCount: number;
  readonly currentLine: number;
  readonly lines: Array<Array<Line>>;
  readonly lastMove: Move;
  readonly selected: Square | null;
}

// noinspection SpellCheckingInspection
const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const initialState: GameState = {
  board: [[]],
  FEN: initialFEN,
  prevFEN: initialFEN,
  initialFEN,
  turn: 1,
  check: false,
  checkmate: false,
  halfCount: 0,
  currentLine: 0,
  lines: [[{ FEN: initialFEN }]],
  lastMove: '',
  selected: null,
  ...parseFEN(initialFEN),
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
