import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import {
  WhitePawn,
  WhiteRook,
  WhiteKnight,
  WhiteBishop,
  WhiteQueen,
  WhiteKing,
  BlackPawn,
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackQueen,
  BlackKing,
} from './pieces';

export type PieceViewProps = {
  color?: number | null;
  type?: number | null;
}

const displayName = 'PieceViewComponent';

const propTypes = {
  type: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  color: PropTypes.oneOf([1, 2]),
};

const defaultProps = {
  type: null,
  color: null,
};

const PieceView: FunctionComponent<PieceViewProps> = (props: PieceViewProps) => {
  const { color, type } = props;
  if (color === 1) {
    switch (type) {
      case 5:
        return <WhiteKing />;
      case 4:
        return <WhiteQueen />;
      case 3:
        return <WhiteBishop />;
      case 2:
        return <WhiteKnight />;
      case 1:
        return <WhiteRook />;
      case 0:
        return <WhitePawn />;
      default:
        return null;
    }
  } else if (color === 2) {
    switch (type) {
      case 5:
        return <BlackKing />;
      case 4:
        return <BlackQueen />;
      case 3:
        return <BlackBishop />;
      case 2:
        return <BlackKnight />;
      case 1:
        return <BlackRook />;
      case 0:
        return <BlackPawn />;
      default:
        return null;
    }
  }

  return null;
};

PieceView.displayName = displayName;
PieceView.propTypes = propTypes;
PieceView.defaultProps = defaultProps;

export default PieceView;
