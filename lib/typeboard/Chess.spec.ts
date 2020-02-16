import Chess from './Chess';


describe('Chess', () => {
  describe('Select', () => {
    const TEST_FEN = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1';
    const EN_PASSANT_FEN = '4k3/p2p1pp1/1p6/1P1PpP2/P1p4p/8/3PP1PP/R3K3 w - e6 0 2';
    const WHITE_CASTLING_FEN = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R w KQkq - 0 1';
    const BLACK_CASTLING_FEN = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R b KQkq - 0 1';

    it('return object if OK', () => {
      expect(typeof Chess.arrange(TEST_FEN).select(4, 1)).toEqual('object');
      expect(typeof Chess.arrange(TEST_FEN).select(3, 2)).toEqual('object');
      expect(typeof Chess.arrange(TEST_FEN).select(6, 2)).toEqual('object');
    });

    it('check marked square', () => {
      expect(Chess.arrange(TEST_FEN).select(0, 1).isMarked(0, 2)).toBeTruthy();
      expect(Chess.arrange(TEST_FEN).select(0, 1).isMarked(0, 3)).toBeTruthy();
      expect(Chess.arrange(TEST_FEN).select(0, 1).isMarked(0, 4)).toBeFalsy();
      expect(Chess.arrange(TEST_FEN).select(5, 2).isMarked(6, 4)).toBeTruthy();
      expect(Chess.arrange(TEST_FEN).select(5, 2).isMarked(7, 3)).toBeTruthy();
      expect(Chess.arrange(TEST_FEN).select(5, 2).isMarked(7, 1)).toBeFalsy();
      expect(Chess.arrange(TEST_FEN).select(5, 2).isMarked(6, 0)).toBeTruthy();
      expect(Chess.arrange(TEST_FEN).select(5, 2).isMarked(4, 0)).toBeFalsy();
      expect(Chess.arrange(TEST_FEN).select(5, 2).isMarked(3, 1)).toBeTruthy();
      expect(Chess.arrange(TEST_FEN).select(5, 2).isMarked(3, 3)).toBeTruthy();
      expect(Chess.arrange(TEST_FEN).select(5, 2).isMarked(4, 4)).toBeTruthy();
      expect(Chess.arrange(TEST_FEN).select(0, 4).isMarked(1, 5)).toBeFalsy();
    });

    it('check marked square with en passant', () => {
      expect(Chess.arrange(EN_PASSANT_FEN).select(3, 4).isMarked(3, 5)).toBeTruthy();
      expect(Chess.arrange(EN_PASSANT_FEN).select(3, 4).isMarked(4, 5)).toBeTruthy();
      expect(Chess.arrange(EN_PASSANT_FEN).select(3, 4).isMarked(2, 5)).toBeFalsy();
      expect(Chess.arrange(EN_PASSANT_FEN).select(5, 4).isMarked(5, 5)).toBeTruthy();
      expect(Chess.arrange(EN_PASSANT_FEN).select(5, 4).isMarked(4, 5)).toBeTruthy();
      expect(Chess.arrange(EN_PASSANT_FEN).select(5, 4).isMarked(6, 5)).toBeFalsy();
    });

    it('check marked square with castling for white turn', () => {
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 0).isMarked(5, 0)).toBeTruthy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 0).isMarked(6, 0)).toBeTruthy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 0).isMarked(3, 0)).toBeTruthy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 0).isMarked(2, 0)).toBeFalsy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 0).isMarked(3, 1)).toBeTruthy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 0).isMarked(4, 1)).toBeTruthy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 0).isMarked(5, 1)).toBeFalsy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 7).isMarked(5, 7)).toBeFalsy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 7).isMarked(6, 7)).toBeFalsy();
      expect(Chess.arrange(WHITE_CASTLING_FEN).select(4, 7).isMarked(4, 7)).toBeFalsy();
    });

    it('check marked square with castling for black turn', () => {
      expect(Chess.arrange(BLACK_CASTLING_FEN).select(4, 7).isMarked(5, 7)).toBeFalsy();
      expect(Chess.arrange(BLACK_CASTLING_FEN).select(4, 7).isMarked(6, 7)).toBeFalsy();
      expect(Chess.arrange(BLACK_CASTLING_FEN).select(4, 7).isMarked(3, 7)).toBeTruthy();
      expect(Chess.arrange(BLACK_CASTLING_FEN).select(4, 7).isMarked(2, 7)).toBeTruthy();
      expect(Chess.arrange(BLACK_CASTLING_FEN).select(4, 7).isMarked(1, 7)).toBeFalsy();
    });
  });

  describe('Move', () => {
    const TEST_FEN = 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1';
    const EN_PASSANT_FEN = '4k3/p2pppp1/1p6/1P1P1P2/P1p4p/8/3PP1PP/R3K3 w - - 0 1';
    const CASTLING_FEN = 'r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2nK2R w KQkq - 0 1';
    const ANOTHER_TEST_FEN = '8/p2p4/1p4k1/1P6/P7/8/3PP2p/2K5 b - - 0 0';

    it('should be OK', () => {
      expect(Chess.arrange(TEST_FEN).move('e2e4').getFen()).toEqual('r3k2r/pp3pp1/b2P4/b1pP1n1B/3qPP1p/2n2NP1/PP5P/RNBQK2R b KQkq - 0 1');
      expect(Chess.arrange(TEST_FEN).move('f3d4').getFen()).toEqual('r3k2r/pp3pp1/b2P4/b1pP1n1B/3N1P1p/2n3P1/PP2P2P/RNBQK2R b KQkq - 0 1');
      expect(Chess.arrange(TEST_FEN).move('g3h4').getFen()).toEqual('r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1P/2n2N2/PP2P2P/RNBQK2R b KQkq - 0 1');
    });

    it('should change turn', () => {
      const chess = Chess.arrange(TEST_FEN);
      expect(chess.getTurn()).toEqual(1);
      expect(chess.move('e2e4').getTurn()).toEqual(2);
      expect(chess.move('d4d1').getTurn()).toEqual(1);
      expect(chess.move('e1f2').getTurn()).toEqual(2);
    });

    it('return FEN if OK with en passant', () => {
      expect(Chess.arrange(EN_PASSANT_FEN).move('g2g4').getFen()).toEqual('4k3/p2pppp1/1p6/1P1P1P2/P1p3Pp/8/3PP2P/R3K3 b - g3 0 1');
      expect(Chess.arrange(EN_PASSANT_FEN).move('d2d4').getFen()).toEqual('4k3/p2pppp1/1p6/1P1P1P2/P1pP3p/8/4P1PP/R3K3 b - d3 0 1');
      const fen1 = Chess.arrange(EN_PASSANT_FEN).move('g2g3').getFen();
      const fen2 = Chess.arrange(fen1).move('e7e5').getFen();
      expect(Chess.arrange(fen2).move('d5e6').getFen()).toEqual('4k3/p2p1pp1/1p2P3/1P3P2/P1p4p/6P1/3PP2P/R3K3 b - - 0 2');
    });

    it('return FEN if OK with castling', () => {
      expect(Chess.arrange(CASTLING_FEN).move('e1g1').getFen()).toEqual('r3k2r/pp3ppp/3B4/8/8/8/PPP2PPP/R2n1RK1 b kq - 1 1');
    });

    it('return FEN if pawn promote', () => {
      expect(Chess.arrange(ANOTHER_TEST_FEN).move('h2h1').getFen()).toEqual('8/p2p4/1p4k1/1P6/P7/8/3PP3/2K4q w - - 0 1');
    });
  });
});
