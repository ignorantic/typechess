import React, { CSSProperties, FunctionComponent, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Piece from '../Piece';
import { BoardPiece } from '../../../containers/Board/Board';

const useStyles = makeStyles((theme: Theme) => ({
  square: {
    position: 'absolute',
    width: '12.5%',
    height: '12.5%',
  },
  white: {
    background: theme.palette.grey[300],
  },
  black: {
    background: theme.palette.grey[700],
  },
  selectedWhite: {
    background: fade(theme.palette.primary.main, 0.7),
  },
  selectedBlack: {
    background: fade(theme.palette.primary.main, 0.9),
  },
  markedWhite: {
    background: fade(theme.palette.secondary.main, 0.7),
  },
  markedBlack: {
    background: fade(theme.palette.secondary.main, 0.9),
  },
}));

export interface SquareProps {
  key?: string;
  style: CSSProperties;
  color: number;
  piece: BoardPiece;
  selected?: boolean;
  marked?: boolean;
  move: () => void;
  select: () => void;
}

const displayName = 'SquareComponent';

const propTypes = {
  style: PropTypes.shape({
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.oneOf([1, 2]).isRequired,
  piece: PropTypes.shape({
    type: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
    color: PropTypes.oneOf([1, 2]),
  }).isRequired,
  selected: PropTypes.bool,
  marked: PropTypes.bool,
  select: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
};

const defaultProps = {
  selected: false,
  marked: false,
};

const Square: FunctionComponent<SquareProps> = (props: SquareProps) => {
  const {
    style,
    color,
    piece,
    selected,
    marked,
    select,
    move,
  } = props;
  const classes = useStyles();
  const className = classNames({
    [classes.square]: true,
    [classes.white]: color === 1,
    [classes.black]: color === 2,
    [classes.selectedWhite]: color === 1 && selected,
    [classes.selectedBlack]: color === 2 && selected,
    [classes.markedWhite]: color === 1 && marked,
    [classes.markedBlack]: color === 2 && marked,
  });

  const [, drop] = useDrop({
    accept: 'PIECE',
    drop: () => {
      if (marked) {
        move();
      }
    },
  });

  const handleClick = useCallback(() => {
    if (marked) {
      move();
    } else {
      select();
    }
  }, [marked]);

  return (
    <div
      role="toolbar"
      ref={drop}
      className={className}
      style={style}
      onKeyPress={handleClick}
      onMouseDown={handleClick}
    >
      <Piece
        color={piece.color}
        type={piece.type}
      />
    </div>
  );
};

Square.displayName = displayName;
Square.propTypes = propTypes;
Square.defaultProps = defaultProps;

export default Square;
