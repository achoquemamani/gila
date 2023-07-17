import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Category } from '../category/category.model';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Notification extends Model {
  @ApiProperty()
  @HasOne(() => Category, 'categoryId')
  category: Category;

  @ApiProperty()
  @Column
  message: string;
}
