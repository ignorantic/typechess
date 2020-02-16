import Chess from './Chess';

describe('Select', () => {
  const TEST_POSITION = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1';
  const EN_PASSANT_POSITION = '4k3/p2p1pp1/1p6/1P1PpP2/P1p4p/8/3PP1PP/R3K3 w - e6 0 2';
  const WHITE_CASTLING_POSITION = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R w KQkq - 0 1';
  const BLACK_CASTLING_POSITION = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R b KQkq - 0 1';

  it('return object if OK', () => {
    expect(typeof Chess.arrange(TEST_POSITION).select(4, 1)).toEqual('object');
    expect(typeof Chess.arrange(TEST_POSITION).select(3, 2)).toEqual('object');
    expect(typeof Chess.arrange(TEST_POSITION).select(6, 2)).toEqual('object');
  });

  it('check marked square', () => {
    expect(Chess.arrange(TEST_POSITION).select(0, 1).isMarked(0, 2)).toBeTruthy();
    expect(Chess.arrange(TEST_POSITION).select(0, 1).isMarked(0, 3)).toBeTruthy();
    expect(Chess.arrange(TEST_POSITION).select(0, 1).isMarked(0, 4)).toBeFalsy();
    expect(Chess.arrange(TEST_POSITION).select(5, 2).isMarked(6, 4)).toBeTruthy();
    expect(Chess.arrange(TEST_POSITION).select(5, 2).isMarked(7, 3)).toBeTruthy();
    expect(Chess.arrange(TEST_POSITION).select(5, 2).isMarked(7, 1)).toBeFalsy();
    expect(Chess.arrange(TEST_POSITION).select(5, 2).isMarked(6, 0)).toBeTruthy();
    expect(Chess.arrange(TEST_POSITION).select(5, 2).isMarked(4, 0)).toBeFalsy();
    expect(Chess.arrange(TEST_POSITION).select(5, 2).isMarked(3, 1)).toBeTruthy();
    expect(Chess.arrange(TEST_POSITION).select(5, 2).isMarked(3, 3)).toBeTruthy();
    expect(Chess.arrange(TEST_POSITION).select(5, 2).isMarked(4, 4)).toBeTruthy();
    expect(Chess.arrange(TEST_POSITION).select(0, 4).isMarked(1, 5)).toBeFalsy();
  });

  it('check marked square with en passant', () => {
    expect(Chess.arrange(EN_PASSANT_POSITION).select(3, 4).isMarked(3, 5)).toBeTruthy();
    expect(Chess.arrange(EN_PASSANT_POSITION).select(3, 4).isMarked(4, 5)).toBeTruthy();
    expect(Chess.arrange(EN_PASSANT_POSITION).select(3, 4).isMarked(2, 5)).toBeFalsy();
    expect(Chess.arrange(EN_PASSANT_POSITION).select(5, 4).isMarked(5, 5)).toBeTruthy();
    expect(Chess.arrange(EN_PASSANT_POSITION).select(5, 4).isMarked(4, 5)).toBeTruthy();
    expect(Chess.arrange(EN_PASSANT_POSITION).select(5, 4).isMarked(6, 5)).toBeFalsy();
  });

  it('check marked square with castling for white turn', () => {
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 0).isMarked(5, 0)).toBeTruthy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 0).isMarked(6, 0)).toBeTruthy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 0).isMarked(3, 0)).toBeTruthy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 0).isMarked(2, 0)).toBeFalsy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 0).isMarked(3, 1)).toBeTruthy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 0).isMarked(4, 1)).toBeTruthy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 0).isMarked(5, 1)).toBeFalsy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 7).isMarked(5, 7)).toBeFalsy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 7).isMarked(6, 7)).toBeFalsy();
    expect(Chess.arrange(WHITE_CASTLING_POSITION).select(4, 7).isMarked(4, 7)).toBeFalsy();
  });

  it('check marked square with castling for black turn', () => {
    expect(Chess.arrange(BLACK_CASTLING_POSITION).select(4, 7).isMarked(5, 7)).toBeFalsy();
    expect(Chess.arrange(BLACK_CASTLING_POSITION).select(4, 7).isMarked(6, 7)).toBeFalsy();
    expect(Chess.arrange(BLACK_CASTLING_POSITION).select(4, 7).isMarked(3, 7)).toBeTruthy();
    expect(Chess.arrange(BLACK_CASTLING_POSITION).select(4, 7).isMarked(2, 7)).toBeTruthy();
    expect(Chess.arrange(BLACK_CASTLING_POSITION).select(4, 7).isMarked(1, 7)).toBeFalsy();
  });
});
