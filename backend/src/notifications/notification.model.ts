import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Category, EnumCategory } from '../category/category.model';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Notification extends Model {
  @ApiProperty()
  @HasOne(() => Category, 'categoryId')
  category: Category;

  @ApiProperty()
  @Column
  message: string;

  mapToNotificationDTO(): NotificationDTO {
    const notificationDTO = new NotificationDTO();
    notificationDTO.message = this.message;
    notificationDTO.category = this.category.mapToEnumCategory();
    return notificationDTO;
  }
}

export class NotificationDTO {
  category: EnumCategory;
  message: string;
}
