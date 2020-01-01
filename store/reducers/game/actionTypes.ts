import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
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
});

export default ActionTypes;
