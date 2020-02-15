import { AnyAction } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
import FEN from '../../../../lib/typeboard/FEN';
import { Board } from '../../../../lib/typeboard/types';

export type Move = string;

export interface Square {
  readonly file: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  readonly rank: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

interface Line {
  readonly fen: string;
}

interface GameState {
  readonly board: Board | Array<Array<void>> | null;
  readonly fen: string;
  readonly prevFen: string;
  readonly initialFen: string;
  readonly turn: number;
  readonly check: boolean;
  readonly checkmate: boolean;
  readonly halfCount: number;
  readonly currentLine: number;
  readonly lines: Array<Array<Line>>;
  readonly lastMove: Move | null;
  readonly selected: Square | null;
}

const initialFen = FEN.getInitial();

const initialState: GameState = {
  board: [[]],
  fen: initialFen,
  prevFen: initialFen,
  initialFen,
  turn: 1,
  check: false,
  checkmate: false,
  halfCount: 0,
  currentLine: 0,
  lines: [[{ fen: initialFen }]],
  lastMove: null,
  selected: null,
  ...FEN.parse(initialFen),
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
