import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import logger from './logger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getTest(): any {
    return "Test"
  }
  @Get('/:getBoard')
  getStoredBoard(): any {
    logger.info('getBoard called');
    return this.appService.getStoredBoard();
  }
  @Post('/:saveBoard')
  saveBoard(@Body() data): any {
    logger.info('saveBoard called');
    this.appService.saveBoard(data);
  }
}
