import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('files/:filename')
  async getFile(
    @Param('filename') filename: string,
    @Res() res: Response
  ) {
    res.sendFile(filename, { root: 'files' });
  }
}
