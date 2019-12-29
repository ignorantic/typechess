import React, { CSSProperties, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Piece from '../Piece';
import { PieceProps } from '../../../containers/Board/Board';

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
}));

interface SquareProps {
  style: CSSProperties;
  color: number;
  piece: PieceProps;
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
};

const Square: FunctionComponent<SquareProps> = (props: SquareProps) => {
  const { style, color, piece } = props;
  const classes = useStyles();
  const className = classNames({
    [classes.square]: true,
    [classes.white]: color === 1,
    [classes.black]: color === 2,
  });

  return (
    <div className={className} style={style}>
      <Piece color={piece.color} type={piece.type} />
    </div>
  );
};

Square.displayName = displayName;
Square.propTypes = propTypes;

export default Square;
