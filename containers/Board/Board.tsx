// import libs
import React, { createElement, FC } from 'react';
import PropTypes from 'prop-types';
import { addIndex, map } from 'ramda';
import { makeStyles } from '@material-ui/styles';

// import interfaces
import { SquareProps } from '../../common/components/Square/Square';

// import components
import Square from '../../common/components/Square';
import { Piece } from '../../common/interfaces/Piece';
import { FuncProp } from '../../common/components/types';

const useStyles = makeStyles(() => ({
  section: {
    position: 'relative',
    height: 750,
    width: 750,
  },
}));

export interface BoardSquare {
  readonly color: number;
  readonly piece: Piece;
  readonly selected?: boolean;
  readonly marked?: boolean;
}

export interface BoardProps {
  position: BoardSquare[][];
  onMove: (file: number, rank: number) => void;
  onSelect: (file: number, rank: number, mouse: boolean) => void;
  onRelease: (file: number, rank: number) => void;
  onFocus: (file: number, rank: number) => void;
  onSwitchTurn: FuncProp;
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
};

const Board: FC<BoardProps> = (props: BoardProps) => {
  const { position, onSelect, onMove } = props;

  const mapFile = mapIndexed((square: BoardSquare, rank: number, file: number): JSX.Element => {
    const { piece, color } = square;
    const style = {
      top: `${100 - (12.5 * (rank + 1))}%`,
      left: `${12.5 * file}%`,
    };
    const key = `square.${rank}.${file}`;
    const squareProps: SquareProps = {
      key,
      color,
      piece,
      style,
      selected: Boolean(position[file][rank].selected),
      marked: Boolean(position[file][rank].marked),
      select: () => onSelect(file, rank, true),
      move: () => onMove(file, rank),
    };
    return createElement(Square, squareProps);
  });

  const mapPosition = mapIndexed(
    (file: BoardSquare[], i: number): JSX.Element[] => mapFile(file, i),
  );

  const classes = useStyles();

  return (
    <div className={classes.section}>
      {mapPosition(position)}
    </div>
  );
};

Board.displayName = displayName;
Board.propTypes = propTypes;

export default Board;
