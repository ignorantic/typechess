import Notation from './Notation';

describe('Notation', () => {
  describe('squareToUCI', () => {
    it('return null if square utils illegal', () => {
      expect(Notation.squareToUCI(-1, 0)).toBeNull();
      expect(Notation.squareToUCI(0, -1)).toBeNull();
      expect(Notation.squareToUCI(8, 8)).toBeNull();
    });

    it('return string if OK', () => {
      expect(Notation.squareToUCI(0, 0)).toEqual('a1');
      expect(Notation.squareToUCI(4, 3)).toEqual('e4');
      expect(Notation.squareToUCI(7, 7)).toEqual('h8');
    });
  });

  describe('UCIToSquare', () => {
    it('throw TypeError if square is invalid', () => {
      expect(() => Notation.UCIToSquare('')).toThrowError();
      expect(() => Notation.UCIToSquare('b')).toThrowError();
      expect(() => Notation.UCIToSquare('7e')).toThrowError();
      expect(() => Notation.UCIToSquare('j1')).toThrowError();
      expect(() => Notation.UCIToSquare('e9')).toThrowError();
    });

    it('return number if OK', () => {
      expect(Notation.UCIToSquare('a2').file).toEqual(0);
      expect(Notation.UCIToSquare('a2').rank).toEqual(1);
      expect(Notation.UCIToSquare('c7').file).toEqual(2);
      expect(Notation.UCIToSquare('c7').rank).toEqual(6);
      expect(Notation.UCIToSquare('f4').file).toEqual(5);
      expect(Notation.UCIToSquare('f4').rank).toEqual(3);
    });
  });

  describe('toUCI', () => {
    it('return null if arguments aren\'t correct', () => {
      expect(Notation.toUCI({ file: 7, rank: 7 }, { file: 0, rank: 8 })).toBeNull();
      expect(Notation.toUCI({ file: -1, rank: 7 }, { file: 0, rank: 0 })).toBeNull();
      expect(Notation.toUCI({ file: 1, rank: 7 }, { file: -1, rank: 7 })).toBeNull();
    });

    it('return string if OK', () => {
      expect(Notation.toUCI({ file: 1, rank: 1 }, { file: 1, rank: 2 })).toEqual('b2b3');
      expect(Notation.toUCI({ file: 7, rank: 7 }, { file: 0, rank: 0 })).toEqual('h8a1');
      expect(Notation.toUCI({ file: 0, rank: 6 }, { file: 0, rank: 7 }, 4))
        .toEqual('a7a8q');
    });
  });

  describe('UCIToSAN', () => {
    it('should return "Nf3"', () => {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(Notation.UCIToSAN(fen, 'g1f3')).toEqual('Nf3');
    });

    it('should return "Neg6"', () => {
      const fen = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(Notation.UCIToSAN(fen, 'e7g6')).toEqual('Neg6');
    });

    it('should return "Qxa3"', () => {
      const fen = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(Notation.UCIToSAN(fen, 'b2a3')).toEqual('Qxa3');
    });

    it('should return "Nfg6"', () => {
      const fen = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(Notation.UCIToSAN(fen, 'f8g6')).toEqual('Nfg6');
    });

    it('should return "Ng6"', () => {
      const fen = 'Q4n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(Notation.UCIToSAN(fen, 'e7g6')).toEqual('Ng6');
    });

    it('should return "Bd6"', () => {
      const fen = 'Q4b1k/2b3pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(Notation.UCIToSAN(fen, 'c7d6')).toEqual('Bd6');
    });

    it('should return "Rde1"', () => {
      const fen = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 w - - 0 1';
      expect(Notation.UCIToSAN(fen, 'd1e1')).toEqual('Rde1');
    });

    it('should return "Rfe1"', () => {
      const fen = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 w - - 0 1';
      expect(Notation.UCIToSAN(fen, 'f1e1')).toEqual('Rfe1');
    });

    it('should return "R6d2"', () => {
      const fen = '5n1k/2b1n1pp/p2R4/5p2/1Pp1p3/P3P1P1/1q3P1P/3R2K1 w - - 0 1';
      expect(Notation.UCIToSAN(fen, 'd6d2')).toEqual('R6d2');
    });

    it('should return "Ra7"', () => {
      const fen = '5nk1/7p/5Pp1/8/8/4qpP1/R6P/R6K w - - 0 1';
      expect(Notation.UCIToSAN(fen, 'a2a7')).toEqual('Ra7');
    });

    it('should return "R7a2"', () => {
      const fen = '5nk1/R6p/5Pp1/8/8/4qpP1/7P/R6K w - - 0 1';
      expect(Notation.UCIToSAN(fen, 'a7a2')).toEqual('R7a2');
    });

    it('should return "Nc3d5"', () => {
      const fen = '5n1k/2N1N1pp/p2R4/5p2/1Pp1p3/P1N1N1P1/1q3P1P/3R2K1 w - - 0 1';
      expect(Notation.UCIToSAN(fen, 'c3d5')).toEqual('Nc3d5');
    });

    it('should return "bxa5"', () => {
      const fen = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 w - - 0 1';
      expect(Notation.UCIToSAN(fen, 'b4a5')).toEqual('bxa5');
    });

    it('should return "g5"', () => {
      const fen = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 w - - 0 1';
      expect(Notation.UCIToSAN(fen, 'g4g5')).toEqual('g5');
    });

    it('should return "Qxf2+"', () => {
      const fen = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 b - - 0 1';
      expect(Notation.UCIToSAN(fen, 'b2f2')).toEqual('Qxf2+');
    });
  });
});
