import select from './select';

describe('Select', () => {
  const TEST_POSITION = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1';
  const EN_PASSANT_POSITION = '4k3/p2p1pp1/1p6/1P1PpP2/P1p4p/8/3PP1PP/R3K3 w - e6 0 2';
  const WHITE_CASTLING_POSITION = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R w KQkq - 0 1';
  const BLACK_CASTLING_POSITION = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R b KQkq - 0 1';

  it('return null if arguments aren\'t correct', () => {
    expect(select('e4', TEST_POSITION)).toBeNull();
    expect(select('b7b8p')).toBeNull();
    expect(select(null)).toBeNull();
  });

  it('return object if OK', () => {
    expect(typeof select(TEST_POSITION, 4, 1)).toEqual('object');
    expect(typeof select(TEST_POSITION, 3, 2)).toEqual('object');
    expect(typeof select(TEST_POSITION, 6, 2)).toEqual('object');
  });

  it('check marked square', () => {
    expect(select(TEST_POSITION, 0, 1).board[0][2].marked).toBeTruthy();
    expect(select(TEST_POSITION, 0, 1).board[0][3].marked).toBeTruthy();
    expect(select(TEST_POSITION, 0, 1).board[0][4].marked).toBeFalsy();
    expect(select(TEST_POSITION, 5, 2).board[6][4].marked).toBeTruthy();
    expect(select(TEST_POSITION, 5, 2).board[7][3].marked).toBeTruthy();
    expect(select(TEST_POSITION, 5, 2).board[7][1].marked).toBeFalsy();
    expect(select(TEST_POSITION, 5, 2).board[6][0].marked).toBeTruthy();
    expect(select(TEST_POSITION, 5, 2).board[4][0].marked).toBeFalsy();
    expect(select(TEST_POSITION, 5, 2).board[3][1].marked).toBeTruthy();
    expect(select(TEST_POSITION, 5, 2).board[3][3].marked).toBeTruthy();
    expect(select(TEST_POSITION, 5, 2).board[4][4].marked).toBeTruthy();

    expect(select(TEST_POSITION, 0, 4).board[1][5].marked).toBeFalsy();
  });

  it('check marked square with en passant', () => {
    expect(select(EN_PASSANT_POSITION, 3, 4).board[3][5].marked).toBeTruthy();
    expect(select(EN_PASSANT_POSITION, 3, 4).board[4][5].marked).toBeTruthy();
    expect(select(EN_PASSANT_POSITION, 3, 4).board[2][5].marked).toBeFalsy();

    expect(select(EN_PASSANT_POSITION, 5, 4).board[5][5].marked).toBeTruthy();
    expect(select(EN_PASSANT_POSITION, 5, 4).board[4][5].marked).toBeTruthy();
    expect(select(EN_PASSANT_POSITION, 5, 4).board[6][5].marked).toBeFalsy();
  });

  it('check marked square with castling for white turn', () => {
    expect(select(WHITE_CASTLING_POSITION, 4, 0).board[5][0].marked).toBeTruthy();
    expect(select(WHITE_CASTLING_POSITION, 4, 0).board[6][0].marked).toBeTruthy();
    expect(select(WHITE_CASTLING_POSITION, 4, 0).board[3][0].marked).toBeTruthy();
    expect(select(WHITE_CASTLING_POSITION, 4, 0).board[2][0].marked).toBeFalsy();
    expect(select(WHITE_CASTLING_POSITION, 4, 0).board[3][1].marked).toBeTruthy();
    expect(select(WHITE_CASTLING_POSITION, 4, 0).board[4][1].marked).toBeTruthy();
    expect(select(WHITE_CASTLING_POSITION, 4, 0).board[5][1].marked).toBeFalsy();

    expect(select(WHITE_CASTLING_POSITION, 4, 7).board[5][7].marked).toBeFalsy();
    expect(select(WHITE_CASTLING_POSITION, 4, 7).board[6][7].marked).toBeFalsy();
    expect(select(WHITE_CASTLING_POSITION, 4, 7).board[4][7].marked).toBeFalsy();
  });

  it('check marked square with castling for black turn', () => {
    expect(select(BLACK_CASTLING_POSITION, 4, 7).board[5][7].marked).toBeFalsy();
    expect(select(BLACK_CASTLING_POSITION, 4, 7).board[6][7].marked).toBeFalsy();
    expect(select(BLACK_CASTLING_POSITION, 4, 7).board[3][7].marked).toBeTruthy();
    expect(select(BLACK_CASTLING_POSITION, 4, 7).board[2][7].marked).toBeTruthy();
    expect(select(BLACK_CASTLING_POSITION, 4, 7).board[1][7].marked).toBeFalsy();
  });
});
