import move from './move';

describe('Move', () => {
  const TEST_POSITION = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1';
  const EN_PASSANT_POSITION = '4k3/p2pppp1/1p6/1P1P1P2/P1p4p/8/3PP1PP/R3K3 w - - 0 1';
  const CASTLING_POSITION = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R w KQkq - 0 1';
  const ANOTHER_TEST_POSITION = '8/p2p4/1p4k1/1P6/P7/8/3PP2p/2K5 b - - 0 0';

  it('return null if arguments aren\'t correct', () => {
    expect(move('e4', TEST_POSITION)).toBeNull();
    expect(move('b7b8p', '')).toBeNull();
    expect(move('', 'null')).toBeNull();
  });

  it('return FEN if OK', () => {
    expect(move(TEST_POSITION, 'e2e4').fen).toEqual('r3k2r/pp3pp1/b2P4/b1pP1n1B/3qPP1p/2n2NP1/PP5P/RNBQK2R b KQkq - 0 1');
    expect(move(TEST_POSITION, 'f3d4').fen).toEqual('r3k2r/pp3pp1/b2P4/b1pP1n1B/3N1P1p/2n3P1/PP2P2P/RNBQK2R b KQkq - 0 1');
    expect(move(TEST_POSITION, 'g3h4').fen).toEqual('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1P/2n2N2/PP2P2P/RNBQK2R b KQkq - 0 1');
  });

  it('return FEN if OK with en passant', () => {
    expect(move(EN_PASSANT_POSITION, 'g2g4').fen).toEqual('4k3/p2pppp1/1p6/1P1P1P2/P1p3Pp/8/3PP2P/R3K3 b - g3 0 1');
    expect(move(EN_PASSANT_POSITION, 'd2d4').fen).toEqual('4k3/p2pppp1/1p6/1P1P1P2/P1pP3p/8/4P1PP/R3K3 b - d3 0 1');
    const fen1 = move(EN_PASSANT_POSITION, 'g2g3').fen;
    const fen2 = move(fen1, 'e7e5').fen;
    expect(move(fen2, 'd5e6').fen).toEqual('4k3/p2p1pp1/1p2P3/1P3P2/P1p4p/6P1/3PP2P/R3K3 b - - 0 2');
  });

  it('return FEN if OK with castling', () => {
    expect(move(CASTLING_POSITION, 'e1g1').fen).toEqual('r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2n1RK1 b kq - 1 1');
  });

  it('return FEN if pawn promote', () => {
    expect(move(ANOTHER_TEST_POSITION, 'h2h1').fen).toEqual('8/p2p4/1p4k1/1P6/P7/8/3PP3/2K4q w - - 0 1');
  });
});
