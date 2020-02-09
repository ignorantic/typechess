import React, { FC, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { makeStyles } from '@material-ui/styles';
import { FuncProp } from '../types';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
}));

export interface DropTargetProps {
  readonly marked: boolean;
  readonly move: FuncProp;
  readonly select: FuncProp;
}

const displayName = 'DropTargetComponent';

const propTypes = {
  marked: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
};

const DropTarget: FC<DropTargetProps> = (props: DropTargetProps) => {
  const {
    marked,
    select,
    move,
  } = props;

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

  const classes = useStyles();

  return (
    <div
      role="toolbar"
      ref={drop}
      className={classes.root}
      onKeyPress={handleClick}
      onMouseDown={handleClick}
    />
  );
};

DropTarget.displayName = displayName;
DropTarget.propTypes = propTypes;

export default DropTarget;
