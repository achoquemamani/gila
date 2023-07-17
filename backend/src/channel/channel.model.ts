import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column } from 'sequelize-typescript';
import { NotificationDTO } from '../notifications/notification.model';

@Table
export class Channel extends Model {
  @ApiProperty()
  @Column
  description: string;
}

export abstract class ChannelDTO {
  abstract sendMessage(userName: string, notification: NotificationDTO): void;
}

export class SMS extends ChannelDTO {
  sendMessage(userName: string, notification: NotificationDTO): void {
    const message = `Notification: ${notification.message} for ${userName}. Channel: SMS`;
    console.log(message);
    /*
    SMS has its own functionality
    */
  }
}

export class Email extends ChannelDTO {
  sendMessage(userName: string, notification: NotificationDTO): void {
    const message = `Notification: ${notification.message} for ${userName}. Channel: email`;
    console.log(message);
    /*
    Email has its own functionality
    */
  }
}

export class PushNotification extends ChannelDTO {
  description: string;

  sendMessage(userName: string, notification: NotificationDTO): void {
    const message = `Notification: ${notification.message} for ${userName}. Channel: pushNotification`;
    console.log(message);
    /*
    PushNotification has its own functionality
    */
  }
}
