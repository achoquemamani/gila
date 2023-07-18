import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Controller('notification')
export class NotificationController {
  private readonly LOGGER = new Logger(NotificationController.name);
  constructor(private notificationService: NotificationService) {}

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

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createNotification(@Body() notification: Notification): Promise<void> {
    try {
      await this.notificationService.create(notification);
    } catch (error) {
      this.manageException(error);
    }
  }
}
