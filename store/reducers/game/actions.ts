import keyMirror from 'keymirror';

const ACTIONS = keyMirror({
  CHANGE_FOCUS: null,
  FLIP_BOARD: null,
  RELEASE: null,
  SELECT: null,

  MOVE: null,
  UPDATE_POSITION: null,
  GOTO: null,
  CHANGE_FEN: null,

  TOGGLE_WHITE: null,
  TOGGLE_BLACK: null,
  STOP_BOTH: null,

  GET_ENGINE_MOVE_REQUEST: null,
  GET_ENGINE_MOVE_SUCCESS: null,
  GET_ENGINE_MOVE_FAILURE: null,
});

export default ACTIONS;
