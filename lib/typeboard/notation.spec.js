import {
  squareToUCI, UCIToSquare, toUCI, UCIToSAN,
} from './notation';

describe('Notation', () => {
  describe('squareToUCI', () => {
    it('return null if square utils illegal', () => {
      expect(squareToUCI(0)).toBeNull();
      expect(squareToUCI(0, -1)).toBeNull();
      expect(squareToUCI(8, 8)).toBeNull();
    });

    it('return string if OK', () => {
      expect(squareToUCI(0, 0)).toEqual('a1');
      expect(squareToUCI(4, 3)).toEqual('e4');
      expect(squareToUCI(7, 7)).toEqual('h8');
    });
  });

  describe('UCIToSquare', () => {
    it('return null if square utils illegal', () => {
      expect(UCIToSquare(0)).toBeNull();
      expect(UCIToSquare('b')).toBeNull();
      expect(UCIToSquare('7e')).toBeNull();
      expect(UCIToSquare('j1')).toBeNull();
      expect(UCIToSquare('e9')).toBeNull();
    });

    it('return number if OK', () => {
      expect(UCIToSquare('a2').file).toEqual(0);
      expect(UCIToSquare('a2').rank).toEqual(1);
      expect(UCIToSquare('c7').file).toEqual(2);
      expect(UCIToSquare('c7').rank).toEqual(6);
      expect(UCIToSquare('f4').file).toEqual(5);
      expect(UCIToSquare('f4').rank).toEqual(3);
    });
  });

  describe('toUCI', () => {
    it('return null if arguments aren\'t correct', () => {
      expect(toUCI({ file: 7, rank: 7 }, { file: 0, rank: 8 })).toBeNull();
      expect(toUCI({ file: -1, rank: 7 }, { file: 0, rank: 0 })).toBeNull();
      expect(toUCI({ file: 1, rank: 7 })).toBeNull();
      expect(toUCI()).toBeNull();
    });

    it('return string if OK', () => {
      expect(toUCI({ file: 1, rank: 1 }, { file: 1, rank: 2 })).toEqual('b2b3');
      expect(toUCI({ file: 7, rank: 7 }, { file: 0, rank: 0 })).toEqual('h8a1');
      expect(toUCI({ file: 0, rank: 6 }, { file: 0, rank: 7 }, 4))
        .toEqual('a7a8q');
    });
  });

  describe('UCIToSAN', () => {
    it('should return "Nf3"', () => {
      const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      expect(UCIToSAN(FEN, 'g1f3')).toEqual('Nf3');
    });

    it('should return "Neg6"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'e7g6')).toEqual('Neg6');
    });

    it('should return "Qxa3"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'b2a3')).toEqual('Qxa3');
    });

    it('should return "Nfg6"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'f8g6')).toEqual('Nfg6');
    });

    it('should return "Ng6"', () => {
      const FEN = 'Q4n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'e7g6')).toEqual('Ng6');
    });

    it('should return "Bd6"', () => {
      const FEN = 'Q4b1k/2b3pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 b - - 0 1';
      expect(UCIToSAN(FEN, 'c7d6')).toEqual('Bd6');
    });

    it('should return "Rde1"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 w - - 0 1';
      expect(UCIToSAN(FEN, 'd1e1')).toEqual('Rde1');
    });

    it('should return "Rfe1"', () => {
      const FEN = '5n1k/2b1n1pp/p7/5p2/1Pp1p3/P3P1P1/1q3P1P/3R1RK1 w - - 0 1';
      expect(UCIToSAN(FEN, 'f1e1')).toEqual('Rfe1');
    });

    it('should return "R6d2"', () => {
      const FEN = '5n1k/2b1n1pp/p2R4/5p2/1Pp1p3/P3P1P1/1q3P1P/3R2K1 w - - 0 1';
      expect(UCIToSAN(FEN, 'd6d2')).toEqual('R6d2');
    });

    it('should return "Ra7"', () => {
      const FEN = '5nk1/7p/5Pp1/8/8/4qpP1/R6P/R6K w - - 0 1';
      expect(UCIToSAN(FEN, 'a2a7')).toEqual('Ra7');
    });

    it('should return "R7a2"', () => {
      const FEN = '5nk1/R6p/5Pp1/8/8/4qpP1/7P/R6K w - - 0 1';
      expect(UCIToSAN(FEN, 'a7a2')).toEqual('R7a2');
    });

    it('should return "Nc3d5"', () => {
      const FEN = '5n1k/2N1N1pp/p2R4/5p2/1Pp1p3/P1N1N1P1/1q3P1P/3R2K1 w - - 0 1';
      expect(UCIToSAN(FEN, 'c3d5')).toEqual('Nc3d5');
    });

    it('should return "bxa5"', () => {
      const FEN = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 w - - 0 1';
      expect(UCIToSAN(FEN, 'b4a5')).toEqual('bxa5');
    });

    it('should return "g5"', () => {
      const FEN = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 w - - 0 1';
      expect(UCIToSAN(FEN, 'g4g5')).toEqual('g5');
    });

    it('should return "Qxf2+"', () => {
      const FEN = '5n1k/6pp/p2R4/p1p2p2/1P2p1P1/P4PP1/1q3P1P/3R2K1 b - - 0 1';
      expect(UCIToSAN(FEN, 'b2f2')).toEqual('Qxf2+');
    });
  });
});
