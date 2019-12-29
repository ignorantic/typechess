import { createElement, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import Board from './Board';
import { selectPosition } from '../../store/reducers/game/selectors';

const BoardContainer: FunctionComponent = () => {
  const position = useSelector(selectPosition);
  return createElement(Board, { position });
};

export default BoardContainer;
