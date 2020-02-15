import FEN from './FEN';

describe('FEN', () => {
  describe('parse', () => {
    it('should return FEN for initial position', () => {
      const fen = FEN.getInitial();
      expect(fen).toEqual(expect.stringContaining('/8/8/8/8/'));
      expect(fen).toEqual(expect.stringContaining('KQkq'));
    });
  });

  describe('parse', () => {
    it('return Position for correct FEN string', () => {
      const fen = 'r1bq1rk1/1pp1bppp/p1np1n2/4p3/B3P3/5N1P/PPPP1PP1/RNBQR1K1 w - - 1 8';
      const position = FEN.parse(fen);
      expect(position.turn).toEqual(1);
      expect(position.turn).toEqual(1);
      expect(position.board[4][3].piece.type).toEqual(0);
      expect(position.board[4][0].piece.type).toEqual(1);
    });
  });
});
