import { parseFENRank, parseFENBoard, parseFENEnPassant } from './fen';

describe('FEN utils', () => {
  describe('parseFENRank', () => {
    it('return null for too long string', () => {
      expect(parseFENRank('rnbqkbnrr')).toBeNull();
    });

    it('return null for incorrect string', () => {
      expect(parseFENRank('rnbqk5nr')).toBeNull();
      expect(parseFENRank('77b7nr')).toBeNull();
      expect(parseFENRank('r9knr')).toBeNull();
      expect(parseFENRank('90')).toBeNull();
      expect(parseFENRank('r7000r')).toBeNull();
      expect(parseFENRank('rnfqkbnr')).toBeNull();
    });

    it('return array for correct string', () => {
      expect(parseFENRank('rnbqk1nr')[0].type).toEqual(1);
      expect(parseFENRank('rnbqk1nr')[0].color).toEqual(2);
      expect(parseFENRank('rn1qk1nr')[7].type).toEqual(1);
      expect(parseFENRank('rn1qk1nr')[7].color).toEqual(2);
      expect(parseFENRank('rnbq2nr')[1].type).toEqual(2);
      expect(parseFENRank('rnbq2nr')[1].color).toEqual(2);
      expect(parseFENRank('rnbqk1nr')[6].type).toEqual(2);
      expect(parseFENRank('rnbqk1nr')[6].color).toEqual(2);
      expect(parseFENRank('1nbqk1nr')[3].type).toEqual(4);
      expect(parseFENRank('r1Bq4')[2].type).toEqual(3);
      expect(parseFENRank('r1Bq4')[2].color).toEqual(1);
    });
  });

  describe('parseFENEnPassant', () => {
    it('return null for "-"', () => {
      const board = parseFENBoard([
        'R3K3', '3PP2P', '6P1', 'P1p4p', '1P1Pp3', '1p6', 'p2p1pp1', '4k3',
      ]);
      expect(parseFENEnPassant('-', board)).toBeNull();
    });

    it('return { file: 4, rank: 5 } for "e6"', () => {
      const board = parseFENBoard([
        'R3K3', '3PP2P', '6P1', 'P1p4p', '1P1Pp3', '1p6', 'p2p1pp1', '4k3',
      ]);
      const enPassant = parseFENEnPassant('e6', board);
      expect(enPassant.file).toEqual(4);
      expect(enPassant.rank).toEqual(5);
    });
  });
});
