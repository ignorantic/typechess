import { Action, Reducer } from 'redux';
import ACTIONS from './actions';
import { parseFEN } from '../../../lib/jboard/fen';

// noinspection SpellCheckingInspection
const initialFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const initialState = {
  ...parseFEN(initialFEN),
};

const game: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTIONS.MOVE:
    case ACTIONS.CHANGE_FEN: {
      return {
        ...state,
        ...action,
      };
    }
    default: {
      return state;
    }
  }
};

export default game;
