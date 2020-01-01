import ACTIONS from './actionTypes';
import { UCIToSquare, UCIToSAN, UCIToFAN, squareToUCI } from '../../../lib/jboard/notation';
import { parseFEN } from '../../../lib/jboard/fen';
import { isCheckmate, isInCheck } from '../../../lib/jboard/utils';
import select from '../../../lib/jboard/select';
import move from '../../../lib/jboard/move';

export function setUpPosition() {
  return (dispatch, getState) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
    const { game: { initialFEN } } = getState();
    const newPosition = parseFEN(initialFEN);
    const payload = {
      ...newPosition,
      prevFEN: initialFEN,
      FEN: initialFEN,
      lastMove: '',
      halfCount: 0,
      lines: [[{ FEN: initialFEN }]],
      check: false,
      checkmate: false,
    };
    dispatch({
      type: ACTIONS.STOP_BOTH,
    });
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
      payload,
    });
  };
}

export function resetPosition() {
  return (dispatch) => {
    dispatch({ type: ACTIONS.GET_ENGINE_MOVE_SUCCESS });
    const emptyFEN = '8/8/8/8/8/8/8/8 w - - 0 1';
    const newPosition = parseFEN(emptyFEN);
    const payload = {
      ...newPosition,
      prevFEN: emptyFEN,
      lastMove: '',
      halfCount: 0,
      lines: [[{ FEN: emptyFEN }]],
      check: false,
      checkmate: false,
    };
    dispatch({
      type: ACTIONS.STOP_BOTH,
    });
    dispatch({
      type: ACTIONS.UPDATE_POSITION,
      payload,
    });
  };
}

export function goto(line, moveNum) {
  return (dispatch, getState) => {
    const { game: { lines } } = getState();
    const { FEN, move: lastMove } = lines[line][moveNum];
    const { FEN: prevFEN } = lines[line][moveNum - 1];
    const newPosition = parseFEN(FEN);
    const { turn } = newPosition;
    const check = isInCheck(FEN, turn);
    const checkmate = isCheckmate(FEN);
    const payload = {
      ...newPosition,
      FEN,
      currentLine: line,
      halfCount: moveNum,
      lastMove,
      prevFEN,
      check,
      checkmate,
    };
    dispatch({
      type: ACTIONS.STOP_BOTH,
    });
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoPrev() {
  return (dispatch, getState) => {
    const { game: { halfCount, currentLine, lines } } = getState();
    if (lines[currentLine][halfCount - 1] === undefined) return;
    const { FEN, move: lastMove } = lines[currentLine][halfCount - 1];
    const { FEN: prevFEN } = lines[currentLine][halfCount - 2];
    const newPosition = parseFEN(FEN);
    const { turn } = newPosition;
    const check = isInCheck(FEN, turn);
    const checkmate = isCheckmate(FEN);
    const payload = {
      ...newPosition,
      FEN,
      halfCount: halfCount - 1,
      lastMove,
      prevFEN,
      check,
      checkmate,
    };
    dispatch({
      type: ACTIONS.STOP_BOTH,
    });
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoNext() {
  return (dispatch, getState) => {
    const { game: { halfCount, currentLine, lines } } = getState();
    if (lines[currentLine][halfCount + 1] === undefined) return;
    const { FEN, move: lastMove } = lines[currentLine][halfCount + 1];
    const { FEN: prevFEN } = lines[currentLine][halfCount];
    const newPosition = parseFEN(FEN);
    const { turn } = newPosition;
    const check = isInCheck(FEN, turn);
    const checkmate = isCheckmate(FEN);
    const payload = {
      ...newPosition,
      FEN,
      halfCount: halfCount + 1,
      lastMove,
      prevFEN,
      check,
      checkmate,
    };
    dispatch({
      type: ACTIONS.STOP_BOTH,
    });
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoStart() {
  return (dispatch, getState) => {
    const { game: { currentLine, lines, initialFEN } } = getState();
    const { FEN } = lines[currentLine][0];
    const newPosition = parseFEN(FEN);
    const { turn } = newPosition;
    const check = isInCheck(FEN, turn);
    const checkmate = isCheckmate(FEN);
    const payload = {
      ...newPosition,
      FEN,
      halfCount: 0,
      lastMove: '',
      prevFEN: initialFEN,
      check,
      checkmate,
    };
    dispatch({
      type: ACTIONS.STOP_BOTH,
    });
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function gotoEnd() {
  return (dispatch, getState) => {
    const { game: { currentLine, lines } } = getState();
    const { length } = lines[currentLine];
    const { FEN, move: lastMove } = lines[currentLine][length - 1];
    const { FEN: prevFEN } = lines[currentLine][length - 2];
    const newPosition = parseFEN(FEN);
    const { turn } = newPosition;
    const check = isInCheck(FEN, turn);
    const checkmate = isCheckmate(FEN);
    const payload = {
      ...newPosition,
      FEN,
      halfCount: length - 1,
      lastMove,
      prevFEN,
      check,
      checkmate,
    };
    dispatch({
      type: ACTIONS.STOP_BOTH,
    });
    dispatch({
      type: ACTIONS.GOTO,
      payload,
    });
  };
}

export function changeFEN(newFEN) {
  return (dispatch) => {
    const newPosition = parseFEN(newFEN);
    const { turn } = newPosition;
    const check = isInCheck(newFEN, turn);
    const checkmate = isCheckmate(newFEN);
    const payload = {
      ...newPosition,
      prevFEN: newFEN,
      FEN: newFEN,
      lastMove: '',
      halfCount: 0,
      lines: [[{ FEN: newFEN }]],
      check,
      checkmate,
    };
    dispatch({
      type: ACTIONS.STOP_BOTH,
    });
    dispatch({
      type: ACTIONS.CHANGE_FEN,
      payload,
    });
  };
}

export function changeFocus(file, rank) {
  const payload = [file, rank];
  return {
    type: ACTIONS.CHANGE_FOCUS,
    payload,
  };
}

export function selectSquare(file, rank, mouse) {
  return (dispatch, getState) => {
    let uiPayload = null;
    const { game: { FEN } } = getState();
    const newPosition = select(FEN, file, rank);
    const { isMarked } = newPosition;
    if (mouse && isMarked) uiPayload = [file, rank];
    const gamePayload = newPosition;
    dispatch({
      type: ACTIONS.SELECT,
      uiPayload,
      gamePayload,
    });
  };
}

export function flipBoard() {
  return { type: ACTIONS.FLIP_BOARD };
}

export function moveToSquare(file, rank) {
  function writeMove(lines, currentLine, halfCount, lastMove, FEN) {
    const prevFEN = lines[currentLine][halfCount].FEN;
    const newLines = [].concat(lines);
    newLines[currentLine][halfCount + 1] = {
      move: lastMove,
      SAN: UCIToSAN(prevFEN, lastMove),
      FAN: UCIToFAN(prevFEN, lastMove),
      FEN,
    };
    return newLines;
  }

  return (dispatch, getState) => {
    const stop = squareToUCI(file, rank);
    if (stop !== null) {
      const {
        game: {
          halfCount, FEN, lines, currentLine, selected,
        },
      } = getState();
      const start = squareToUCI(selected.file, selected.rank);
      const UCIMove = `${start}${stop}`;
      const newPosition = move(FEN, UCIMove);
      const { turn, lastMove, FEN: newFEN } = newPosition;
      const newLines = writeMove(lines, currentLine, halfCount, lastMove, newFEN);
      const check = isInCheck(newFEN, turn);
      const checkmate = isCheckmate(newFEN);
      const payload = {
        ...newPosition,
        prevFEN: FEN,
        lines: newLines,
        halfCount: halfCount + 1,
        check,
        checkmate,
      };
      dispatch({
        type: ACTIONS.MOVE,
        payload,
      });
    }
  };
}

export function releasePiece(file, rank) {
  return (dispatch, getState) => {
    if (getState().game.board[file][rank].marked) {
      dispatch(moveToSquare(file, rank));
      dispatch(changeFocus(file, rank));
    }
    dispatch({
      type: ACTIONS.RELEASE,
    });
  };
}

export function switchTurn() {
  return (dispatch, getState) => {
    const {
      game: {
        prevFEN,
        lastMove,
        turn,
        checkmate,
      },
      engine: { status, play },
    } = getState();
    if (play[turn] === true && status !== 'waiting' && !checkmate) {
      dispatch(getEngineMove(prevFEN, lastMove));
    }
  };
}

export function toggleWhite() {
  return (dispatch) => {
    dispatch({ type: ACTIONS.TOGGLE_WHITE });
    dispatch(switchTurn());
  };
}

export function toggleBlack() {
  return (dispatch) => {
    dispatch({ type: ACTIONS.TOGGLE_BLACK });
    dispatch(switchTurn());
  };
}
