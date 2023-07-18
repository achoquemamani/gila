import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './log.model';

@Controller('logs')
export class LogsController {
  private readonly LOGGER = new Logger(LogsController.name);
  constructor(private logService: LogsService) {}

  private manageException(error: any) {
    const message = error.message;
    this.LOGGER.error(message);
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: message,
      },
      HttpStatus.BAD_REQUEST,
      {
        cause: error,
      },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getLogs(): Promise<Log[]> {
    try {
      return await this.logService.findAll();
    } catch (error) {
      this.manageException(error);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.logService.remove(id);
    } catch (error) {
      this.manageException(error);
    }
  }
}
