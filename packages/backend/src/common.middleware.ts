import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('Content-Type', 'application/json');
    next();
  }
}
