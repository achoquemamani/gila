import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/category/category.model';
import { Notification } from './notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private notificationModel: typeof Notification,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });
  }

  create(notification: Notification): void {
    console.log(`New notification: ${notification.message}`);
  }
}
