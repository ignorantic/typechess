import { useDragLayer } from 'react-dnd';
import { makeStyles } from '@material-ui/styles';
import { prop } from 'ramda';
import Piece from '../../../common/components/Piece';

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

function DragLayer() {
  const classes = useStyles();
  const collectedProps = useDragLayer((monitor) => ({
    offset: monitor.getClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    piece: prop('piece', monitor.getItem()),
  }));
  const { offset, initialOffset, piece } = collectedProps;
  if (!offset || !piece || !initialOffset) {
    return null;
  }
  return (
    <div className={classes.layer}>
      <div
        className={classes.piece}
        style={{
          transform: `translate(${offset.x - 750 / 16}px, ${offset.y - 750 / 16}px)`,
        }}
      >
        <Piece type={piece.type} color={piece.color} />
      </div>
    </div>
  );
}

export default DragLayer;
