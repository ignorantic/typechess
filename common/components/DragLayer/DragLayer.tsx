import { useDragLayer } from 'react-dnd';
import { makeStyles } from '@material-ui/styles';
import { propOr } from 'ramda';
import PieceView from '../PieceView';
import { Piece } from '../../interfaces/Piece';

const useStyles = makeStyles({
  layer: {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  piece: {
    height: 750 / 8,
    width: 750 / 8,
  },
});

interface Offset {
  readonly x: number;
  readonly y: number;
}

interface CollectionProps {
  readonly offset: Offset | null;
  readonly initialOffset: Offset | null;
  readonly piece: Piece | null;
}

function DragLayer() {
  const classes = useStyles();
  const collectedProps: CollectionProps = useDragLayer(
    (monitor): CollectionProps => ({
      offset: monitor.getClientOffset(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      piece: propOr(null, 'piece', monitor.getItem()),
    }),
  );

  const { offset, initialOffset, piece } = collectedProps;
  if (!offset || !piece || !initialOffset) {
    return <div className={classes.layer} />;
  }

  return (
    <div className={classes.layer}>
      <div
        className={classes.piece}
        style={{ transform: `translate(${offset.x - 750 / 16}px, ${offset.y - 750 / 16}px)` }}
      >
        <PieceView piece={piece} />
      </div>
    </div>
  );
}

export default DragLayer;
