import FEN from './FEN';
import { Piece } from './types';

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
      expect(position.board[6][7].piece.type).toEqual(5);
      expect(position.board[4][3].piece.type).toEqual(0);
      expect(position.board[4][0].piece.type).toEqual(1);
    });

    it('return null for incorrect rank string', () => {
      const fen = 'r1bq2rk1/1pp1bppp/p1np1n2/4p3/B3P3/5N1P/PPPP1PP1/RNBQR1K1 w - - 1 8';
      const position = FEN.parse(fen);
      const emptyPiece = FEN.getEmptyPiece();
      expect(position.board[0][7].piece).toEqual(emptyPiece);
      expect(position.board[1][7].piece).toEqual(emptyPiece);
      expect(position.board[2][7].piece).toEqual(emptyPiece);
      expect(position.board[3][7].piece).toEqual(emptyPiece);
      expect(position.board[4][7].piece).toEqual(emptyPiece);
      expect(position.board[5][7].piece).toEqual(emptyPiece);
      expect(position.board[6][7].piece).toEqual(emptyPiece);
      expect(position.board[7][7].piece).toEqual(emptyPiece);
    });

    it('return initial position for incorrect FEN string', () => {
      const fen1 = 'r1bq2rk1/1pp1bppp//p1np1n2/4p3/B3P3/5N1P/PPPP1PP1/RNBQR1K1 w - - 1 8';
      const fen2 = 'r1bq2rk1/1pp1bppp/p1np1n2/4p3/5N1P/PPPP1PP1/RNBQR1K1 w - - 1 8';
      const whitePawn: Piece = { type: 0, color: 1 };
      const blackPawn: Piece = { type: 0, color: 2 };
      const whiteQueen: Piece = { type: 4, color: 1 };
      const blackQueen: Piece = { type: 4, color: 2 };
      const whiteKing: Piece = { type: 5, color: 1 };
      const blackKing: Piece = { type: 5, color: 2 };
      const position1 = FEN.parse(fen1);
      const position2 = FEN.parse(fen2);
      expect(position1.board[3][1].piece).toEqual(whitePawn);
      expect(position1.board[4][1].piece).toEqual(whitePawn);
      expect(position1.board[3][6].piece).toEqual(blackPawn);
      expect(position1.board[4][6].piece).toEqual(blackPawn);
      expect(position2.board[3][0].piece).toEqual(whiteQueen);
      expect(position2.board[4][0].piece).toEqual(whiteKing);
      expect(position2.board[3][7].piece).toEqual(blackQueen);
      expect(position2.board[4][7].piece).toEqual(blackKing);
    });
  });
});
