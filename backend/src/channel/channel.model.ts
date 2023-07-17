import { Table, Model, Column } from 'sequelize-typescript';
import { Notification } from '../notification/notification.model';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Channel extends Model {
  @ApiProperty()
  @Column
  description: string;
}

export abstract class ChannelDTO {
  description: string;

  abstract sendMessage(notification: Notification): void;
}

export class SMS extends Channel {
  description: string;

  sendMessage(notification: Notification): void {
    console.log(`SMS: ${notification.message}`);
  }
}

export class Email extends Channel {
  description: string;

  sendMessage(notification: Notification): void {
    console.log(`Email: ${notification.message}`);
  }
}

export class PushNotification extends Channel {
  description: string;

  sendMessage(notification: Notification): void {
    console.log(`PushNotification: ${notification.message}`);
  }
}
