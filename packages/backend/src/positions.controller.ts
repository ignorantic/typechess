import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PositionsService } from './positions.service';

@Controller()
export class PositionsController {
  constructor(private readonly service: PositionsService) {}

  @Get('positions')
  getList(@Res() res: Response): void {
    const result = this.service.getList();
    res.setHeader('X-Total-Count', result.length.toString());
    res.send(result);
  }
}
