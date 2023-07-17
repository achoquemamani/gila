import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column } from 'sequelize-typescript';
import { Notification } from '../notifications/notification.model';
import { User } from '../users/user.model';

@Table
export class Channel extends Model {
  @ApiProperty()
  @Column
  description: string;

  sendMessage(userName: string, notification: Notification): void {
    /*
    TODO: in this part:
    1. Persist Log
    2. Use abstract class
    */
    const message = `Notification (${notification.category.description}): ${notification.message} for ${userName}. Channel: ${this.description}`;
    console.log(message);
  }
}

export abstract class ChannelDTO {
  description: string;

  abstract sendMessage(notification: Notification): void;
}

export class SMS extends ChannelDTO {
  description: string;

  sendMessage(notification: Notification): void {
    console.log(`SMS: ${notification.message}`);
  }
}

export class Email extends ChannelDTO {
  description: string;

  sendMessage(notification: Notification): void {
    console.log(`Email: ${notification.message}`);
  }
}

export class PushNotification extends ChannelDTO {
  description: string;

  sendMessage(notification: Notification): void {
    console.log(`PushNotification: ${notification.message}`);
  }
}
