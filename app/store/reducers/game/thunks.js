import Chess from '../../../../lib/typeboard/Chess';
import { squareToUCI, UCIToFAN, UCIToSAN } from '../../../../lib/typeboard/notation';
import { isCheckmate, isInCheck } from '../../../../lib/typeboard/utils';
import { actions } from './reducer';

export function selectSquare(file, rank, mouse) {
  return (dispatch, getState) => {
    let uiPayload = null;
    const { game: { fen } } = getState();
    const newPosition = Chess.arrange(fen).select(file, rank).getPosition();
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
  function writeMove(lines, currentLine, halfCount, lastMove, fen) {
    const prevFen = lines[currentLine][halfCount].fen;
    return lines.map((line, index) => {
      if (index === currentLine) {
        return [
          ...line,
          {
            move: lastMove,
            san: UCIToSAN(prevFen, lastMove),
            fan: UCIToFAN(prevFen, lastMove),
            fen,
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
        halfCount, fen, lines, currentLine, selected,
      },
    } = getState();
    const start = squareToUCI(selected.file, selected.rank);
    const UCIMove = `${start}${stop}`;
    const newPosition = Chess.arrange(fen).move(UCIMove).getPosition();
    const { turn, lastMove, fen: newFen } = newPosition;
    const newLines = writeMove(lines, currentLine, halfCount, lastMove, newFen);
    const check = isInCheck(newFen, turn);
    const checkmate = isCheckmate(newFen);
    const payload = {
      ...newPosition,
      prevFen: fen,
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
