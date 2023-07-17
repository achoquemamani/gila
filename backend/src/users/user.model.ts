import { ApiProperty } from '@nestjs/swagger';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Category } from '../category/category.model';
import { Channel } from '../channel/channel.model';

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
}
