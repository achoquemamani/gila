import { Injectable } from '@nestjs/common';
import { Notification } from './notification.model';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationService {
  constructor(private userService: UsersService) {}

  async create(notification: Notification): Promise<void> {
    this.userService.sendMessage(notification);
  }
}
