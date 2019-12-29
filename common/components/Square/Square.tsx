import React, { CSSProperties, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

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
  color: string;
}

const displayName = 'SquareComponent';

const propTypes = {
  style: PropTypes.shape({
    left: PropTypes.string.isRequired,
    top: PropTypes.string.isRequired,
  }).isRequired,
  color: PropTypes.oneOf(['white', 'black']).isRequired,
};

const Square: FunctionComponent<SquareProps> = (props: SquareProps) => {
  const { style, color } = props;
  const classes = useStyles();
  const className = classNames({
    [classes.square]: true,
    [classes.white]: color === 'white',
    [classes.black]: color === 'black',
  });

  return <div className={className} style={style}>{' '}</div>;
};

Square.displayName = displayName;
Square.propTypes = propTypes;

export default Square;
