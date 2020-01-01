import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { makeStyles } from '@material-ui/styles';
import PieceView from './PieceView';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

export type PieceProps = {
  color?: number | null;
  type?: number | null;
}

const displayName = 'PieceComponent';

const propTypes = {
  type: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  color: PropTypes.oneOf([1, 2]),
};

const defaultProps = {
  type: null,
  color: null,
};

const Piece: FunctionComponent<PieceProps> = (props: PieceProps) => {
  const {
    color,
    type,
  } = props;

  const classes = useStyles();

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'PIECE' },
    collect: (monitor) => ({
      isDragging: Boolean(monitor.isDragging()),
    }),
  });

  if (type === null || color === null || isDragging) {
    return <div className={classes.root} />;
  }

  return (
    <div ref={drag} className={classes.root}>
      <PieceView color={color} type={type} />
    </div>
  );
};

Piece.displayName = displayName;
Piece.propTypes = propTypes;
Piece.defaultProps = defaultProps;

export default Piece;
