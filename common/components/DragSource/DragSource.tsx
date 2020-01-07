import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/styles';
import PieceView from '../PieceView/PieceView';
import { Piece } from '../../interfaces/Piece';
import { Children } from '../types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));


export type DragSourceProps = {
  children: Children;
  piece: Piece;
}

const displayName = 'DragSourceComponent';

const propTypes = {
  children: PropTypes.node.isRequired,
  piece: PropTypes.shape({
    type: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
    color: PropTypes.oneOf([1, 2]),
  }).isRequired,
};

const DragSource: FC<DragSourceProps> = (props: DragSourceProps) => {
  const { children, piece } = props;

  const classes = useStyles();

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: 'PIECE',
      piece,
    },
    collect: (monitor) => ({
      isDragging: Boolean(monitor.isDragging()),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div ref={drag} className={classes.root}>
      {children}
      {!isDragging && <PieceView piece={piece} />}
    </div>
  );
};

DragSource.displayName = displayName;
DragSource.propTypes = propTypes;

export default DragSource;
