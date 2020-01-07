import React, { FC } from 'react';
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
} from './components';
import { Piece } from '../../interfaces/Piece';

interface PieceProps {
  readonly piece: Piece;
}

const displayName = 'PieceComponent';

const propTypes = {
  piece: PropTypes.shape({
    type: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
    color: PropTypes.oneOf([1, 2]),
  }).isRequired,
};

const PieceView: FC<PieceProps> = (props: PieceProps) => {
  const { piece } = props;
  if (piece.color === 1) {
    switch (piece.type) {
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
  } else if (piece.color === 2) {
    switch (piece.type) {
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

export default PieceView;
