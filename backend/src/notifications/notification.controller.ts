import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async createNotification(@Body() notification: Notification): Promise<void> {
    try {
      await this.notificationService.create(notification);
    } catch (error) {
      console.log(error);
    }
  }
}
