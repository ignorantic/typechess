import { Injectable } from '@nestjs/common';

const db = [
  {
    id: 1,
    fen: 'r3k2r/pp3pp1/b2P4/b1pP1n1B/3q1P1p/2n2NP1/PP2P2P/RNBQK2R w KQkq - 0 1',
  },
  {
    id: 2,
    fen: '4k3/p2p1pp1/1p6/1P1PpP2/P1p4p/8/3PP1PP/R3K3 w - e6 0 2',
  },
  {
    id: 3,
    fen: '4k3/p2p1pp1/1p6/3PpP2/P1p4p/8/3PP1PP/R3K3 w - - 0 2',
  },
  {
    id: 4,
    fen: '4k3/p2p1pp1/1p6/1P1PpP2/P1p4p/3P4/3PP1PP/R3K3 w - - 0 2',
  },
  {
    id: 5,
    fen: '4k3/p2p2p1/1p6/1P1PpP2/P1p4p/8/3PP1PP/R3K3 w - e6 0 2',
  },
];

@Injectable()
export class PositionsService {
  getList(): object[] {
    return db;
  }

  getOne(id: number): object {
    return db.find((position) => position.id === id);
  }
}
