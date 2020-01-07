import React, { CSSProperties, FC } from 'react';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import DragSource from '../DragSource';
import DropTarget from '../DropTarget';
import { Piece } from '../../interfaces/Piece';
import { FuncProp } from '../types';

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
  readonly key?: string;
  readonly style: CSSProperties;
  readonly color: number;
  readonly piece: Piece;
  readonly selected: boolean;
  readonly marked: boolean;
  readonly move: FuncProp;
  readonly select: FuncProp;
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
  selected: PropTypes.bool.isRequired,
  marked: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
};

const Square: FC<SquareProps> = (props: SquareProps) => {
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

  return (
    <div
      role="toolbar"
      className={className}
      style={style}
    >
      <DragSource piece={piece}>
        <DropTarget select={select} move={move} marked={marked} />
      </DragSource>
    </div>
  );
};

Square.displayName = displayName;
Square.propTypes = propTypes;

export default Square;
