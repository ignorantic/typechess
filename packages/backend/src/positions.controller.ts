import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly service: PositionsService) {}

  @Get()
  getList(@Res() res: Response): void {
    const result = this.service.getList();
    res.setHeader('X-Total-Count', result.length.toString());
    res.send(result);
  }

  @Get(':id')
  getOne(@Param('id') id: string): object {
    return this.service.getOne(Number(id));
  }
}
