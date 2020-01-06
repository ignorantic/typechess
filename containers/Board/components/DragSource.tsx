import React, { FunctionComponent, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/styles';
import Piece from '../../../common/components/Piece';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
}));

export type DragSourceProps = {
  color?: number | null;
  type?: number | null;
}

const displayName = 'DragSourceComponent';

const propTypes = {
  type: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  color: PropTypes.oneOf([1, 2]),
};

const defaultProps = {
  type: null,
  color: null,
};

const DragSource: FunctionComponent<DragSourceProps> = (props: DragSourceProps) => {
  const {
    color,
    type,
  } = props;

  const classes = useStyles();

  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: 'PIECE',
      piece: {
        type,
        color,
      },
    },
    collect: (monitor) => ({
      isDragging: Boolean(monitor.isDragging()),
    }),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  if (type === null || color === null || isDragging) {
    return <div className={classes.root} />;
  }

  return (
    <div ref={drag} className={classes.root}>
      <Piece color={color} type={type} />
    </div>
  );
};

DragSource.displayName = displayName;
DragSource.propTypes = propTypes;
DragSource.defaultProps = defaultProps;

export default DragSource;
