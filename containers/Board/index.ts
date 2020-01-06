import { createElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board, { BoardProps } from './Board';
import { selectPosition } from '../../store/reducers/game/selectors';
import {
  changeFocus, moveToSquare, releasePiece, selectSquare, switchTurn,
} from '../../store/reducers/game/actions';
import withDnd from '../../common/hoc/withDnd';

export default withDnd(() => {
  const position = useSelector(selectPosition);
  const dispatch = useDispatch();

  const onMove = (file: number, rank: number) => dispatch(moveToSquare(file, rank));
  const onSelect = (file: number, rank: number, mouse: boolean) => dispatch(
    selectSquare(file, rank, mouse),
  );
  const onRelease = (file: number, rank: number) => dispatch(releasePiece(file, rank));
  const onFocus = (file: number, rank: number) => dispatch(changeFocus(file, rank));
  const onSwitchTurn = () => dispatch(switchTurn());

  const props: BoardProps = {
    position,
    onMove,
    onSelect,
    onRelease,
    onFocus,
    onSwitchTurn,
  };
  return createElement(Board, props);
});
