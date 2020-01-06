// import libs
import React, { createElement, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/styles';
import { addIndex, map } from 'ramda';
import DropTarget, { DropTargetProps } from './components/DropTarget';
import DragLayer from './components/DragLayer';

const useStyles = makeStyles(() => ({
  section: {
    position: 'relative',
    height: 750,
    width: 750,
  },
  square: {
    position: 'absolute',
    width: '12.5%',
    height: '12.5%',
  },
}));

export type BoardPiece = {
  color?: number | null;
  type?: number | null;
}

export type BoardSquare = {
  color: number;
  piece: BoardPiece;
  selected?: boolean;
  marked?: boolean;
}

export interface BoardProps {
  position: BoardSquare[][];
  onMove: (file: number, rank: number) => void;
  onSelect: (file: number, rank: number, mouse: boolean) => void;
  onRelease: (file: number, rank: number) => void;
  onFocus: (file: number, rank: number) => void;
  onSwitchTurn: () => void;
}

const mapIndexed: Function = addIndex(map);

const displayName = 'BoardComponent';

const propTypes = {
  position: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.number.isRequired,
    piece: PropTypes.shape({
      color: PropTypes.number,
      type: PropTypes.number,
    }).isRequired,
  }).isRequired).isRequired).isRequired,
  onSelect: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  // onRelease: PropTypes.func.isRequired,
  // onFocus: PropTypes.func.isRequired,
  // onSwitchTurn: PropTypes.func.isRequired,
};

const Board: FunctionComponent<BoardProps> = (props: BoardProps) => {
  const classes = useStyles();
  const { position, onSelect, onMove } = props;

  const mapFile = mapIndexed((square: BoardSquare, rank: number, file: number): JSX.Element => {
    const { piece, color } = square;
    const style = {
      top: `${100 - (12.5 * (rank + 1))}%`,
      left: `${12.5 * file}%`,
    };
    const key = `square.${rank}.${file}`;
    const squareProps: DropTargetProps = {
      key,
      color,
      piece,
      style,
      selected: Boolean(position[file][rank].selected),
      marked: Boolean(position[file][rank].marked),
      select: () => onSelect(file, rank, true),
      move: () => onMove(file, rank),
    };
    return createElement(DropTarget, squareProps);
  });

  const mapPosition = mapIndexed(
    (file: BoardSquare[], i: number): JSX.Element[] => mapFile(file, i),
  );

  return (
    <DndProvider backend={Backend}>
      <div className={classes.section}>
        {mapPosition(position)}
        <DragLayer />
      </div>
    </DndProvider>
  );
};

Board.displayName = displayName;
Board.propTypes = propTypes;

export default Board;
