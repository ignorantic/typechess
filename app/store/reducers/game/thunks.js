import { actions } from './reducer';
import { squareToUCI, UCIToFAN, UCIToSAN } from '../../../../lib/typeboard/notation';
import { isCheckmate, isInCheck } from '../../../../lib/typeboard/utils';
import select from '../../../../lib/typeboard/select';
import move from '../../../../lib/typeboard/move';

export function selectSquare(file, rank, mouse) {
  return (dispatch, getState) => {
    let uiPayload = null;
    const { game: { FEN } } = getState();
    const newPosition = select(FEN, file, rank);
    const { isMarked } = newPosition;
    if (mouse && isMarked) uiPayload = [file, rank];
    const payload = newPosition;
    dispatch({
      type: actions.select.type,
      uiPayload,
      payload,
    });
  };
}

export function moveToSquare(file, rank) {
  function writeMove(lines, currentLine, halfCount, lastMove, FEN) {
    const prevFEN = lines[currentLine][halfCount].FEN;
    return lines.map((line, index) => {
      if (index === currentLine) {
        return [
          ...line,
          {
            move: lastMove,
            SAN: UCIToSAN(prevFEN, lastMove),
            FAN: UCIToFAN(prevFEN, lastMove),
            FEN,
          },
        ];
      }

      return line;
    });
  }

  return (dispatch, getState) => {
    const stop = squareToUCI(file, rank);
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
      type: actions.move.type,
      payload,
    });
  };
}

export function changeFocus(file, rank) {
  const payload = [file, rank];
  return {
    type: actions.changeFocus.type,
    payload,
  };
}
