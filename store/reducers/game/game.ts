import { AnyAction, Reducer } from 'redux';
import ActionTypes from './actionTypes';
import { parseFEN } from '../../../lib/jboard/fen';

type FEN = string;

type Move = string;

export interface Square {
  file: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  rank: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

interface Line {
  FEN: FEN;
}

interface GameState {
  board: Array<Array<object>>;
  FEN: FEN;
  prevFEN: FEN;
  initialFEN: FEN;
  turn: number;
  check: boolean;
  checkmate: boolean;
  halfCount: number;
  currentLine: number;
  lines: Array<Array<Line>>;
  lastMove: Move;
  selected: Square | null;
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

const game: Reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.SELECT: {
      return {
        ...state,
        ...action.gamePayload,
      };
    }
    case ActionTypes.MOVE:
    case ActionTypes.UPDATE_POSITION:
    case ActionTypes.GOTO:
    case ActionTypes.CHANGE_FEN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default game;
