// import libs
import React, { createElement, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { addIndex, map } from 'ramda';
import Square from '../../common/components/Square';

const useStyles = makeStyles(() => ({
  section: {
    position: 'relative',
    height: 600,
    width: 600,
  },
  square: {
    position: 'absolute',
    width: '12.5%',
    height: '12.5%',
  },
}));

interface Piece {
  color?: number;
  type?: number;
}

interface BoardSquare {
  color: number;
  piece: Piece;
}

interface BoardProps {
  position: BoardSquare[][];
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
};

const Board: FunctionComponent<BoardProps> = (props: BoardProps) => {
  const classes = useStyles();
  const { position } = props;

  const mapFile = mapIndexed((square: BoardSquare, i: number, j: number): JSX.Element => {
    const color = square.color === 1 ? 'white' : 'black';
    const style = {
      left: `${12.5 * i}%`,
      top: `${100 - (12.5 * (j + 1))}%`,
    };
    const key = `square.${i}.${j}`;
    return createElement(Square, { key, color, style });
  });

  const mapPosition = mapIndexed(
    (file: BoardSquare[], i: number): JSX.Element[] => mapFile(file, i),
  );

  return (
    <div className={classes.section}>
      {mapPosition(position)}
    </div>
  );
};

Board.displayName = displayName;
Board.propTypes = propTypes;

export default Board;
