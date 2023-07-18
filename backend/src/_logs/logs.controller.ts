import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './log.model';

@Controller('logs')
export class LogsController {
  constructor(private logService: LogsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getLogs(): Promise<Log[]> {
    try {
      return await this.logService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
}
