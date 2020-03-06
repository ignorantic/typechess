import { createElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Board, { BoardProps } from './Board';
import {
  selectPosition,
  changeFocus,
  moveToSquare,
  selectSquare,
} from '../../store/reducers/game';
import withDnd from '../../common/hoc/withDnd';

export default withDnd(() => {
  const position = useSelector(selectPosition);
  const dispatch = useDispatch();

  const onMove = (file: number, rank: number) => dispatch(moveToSquare(file, rank));
  const onSelect = (file: number, rank: number, mouse: boolean) => dispatch(
    selectSquare(file, rank, mouse),
  );
  const onFocus = (file: number, rank: number) => dispatch(changeFocus(file, rank));

  const props: BoardProps = {
    position,
    onMove,
    onSelect,
    onFocus,
  };
  return createElement(Board, props);
});
