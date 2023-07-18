import { ApiProperty } from '@nestjs/swagger';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Category, EnumCategory } from '../category/category.model';
import {
  Channel,
  ChannelDTO,
  Email,
  PushNotification,
  SMS,
} from './channel.model';
import { NotificationDTO } from '../notifications/notification.model';
import { LogsService } from '../_logs/logs.service';

@Table
export class User extends Model {
  @ApiProperty()
  @Column
  name: string;

  @ApiProperty()
  @Column
  email: string;

  @ApiProperty()
  @Column
  phoneNumber: string;

  @ApiProperty({
    isArray: true,
    type: Channel,
  })
  @HasMany(() => Channel, 'channelId')
  channels: Channel[];

  @ApiProperty({
    isArray: true,
    type: Category,
  })
  @HasMany(() => Category, 'categoryId')
  subscribed: Category[];

  mapToUserDto(logsService: LogsService): UserDTO {
    const userDto = new UserDTO();
    userDto.name = this.name;
    userDto.email = this.email;
    userDto.phoneNumber = this.phoneNumber;
    userDto.channels = this.channels.map((channel) => {
      switch (channel.description) {
        case 'SMS':
          return new SMS(logsService);
        case 'Email':
          return new Email(logsService);
        case 'PushNotification':
          return new PushNotification(logsService);
      }
    });
    userDto.subscribed = this.subscribed.map((subscribedCategory) => {
      return subscribedCategory.mapToEnumCategory();
    });
    return userDto;
  }
}

export class UserDTO {
  name: string;
  email: string;
  phoneNumber: string;
  channels: ChannelDTO[];
  subscribed: EnumCategory[];

  sendMessage(notification: NotificationDTO) {
    this.channels.forEach((channel) => {
      channel.sendMessage(this, notification);
    });
  }
}
