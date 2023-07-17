import { Injectable } from '@nestjs/common';
import { Notification } from './notification.model';
import { UsersService } from '../users/users.service';
import { Category } from 'src/category/category.model';

@Injectable()
export class NotificationService {
  constructor(private userService: UsersService) {}

  async create(notification: Notification): Promise<void> {
    const notificationInput = new Notification();
    notificationInput.message = notification.message;
    notificationInput.category = new Category();
    notificationInput.category.description = notification.category.description;
    this.userService.sendMessage(notificationInput.mapToNotificationDTO());
  }
}
