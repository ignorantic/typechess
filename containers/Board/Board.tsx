// import libs
import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { addIndex, map } from 'ramda';

const useStyles = makeStyles(() => ({
  section: {
    position: 'relative',
    height: 160,
    width: 160,
  },
  square: {
    position: 'absolute',
    width: '20px',
    height: '20px',
  },
}));

interface Square {
  color: number;
  piece: object;
}

interface BoardProps {
  position: Square[][];
}

const mapIndexed: Function = addIndex(map);

const displayName = 'BoardComponent';

const propTypes = {
  //
};

const defaultProps = {
  //
};

const Board: FunctionComponent<BoardProps> = (props: BoardProps) => {
  const classes = useStyles();
  const { position } = props;

  const mapFile = mapIndexed((square: Square, i: number, j: number): JSX.Element => {
    const clr = square.color === 1 ? 'w' : 'b';

    const style = {
      left: `${12.5 * i}%`,
      top: `${100 - (12.5 * (j + 1))}%`,
    };
    const key = `square.${i}.${j}`;
    return <div className={classes.square} style={style} key={key}>{clr}</div>;
  });

  const mapPosition = mapIndexed((file: Square[], i: number) => mapFile(file, i));

  return (
    <div className={classes.section}>
      {mapPosition(position)}
    </div>
  );
};

Board.displayName = displayName;
Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
