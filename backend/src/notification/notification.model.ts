import { Column, Model, Table } from 'sequelize-typescript';
import { Category } from '../category/category.model';

@Table
export class Notification extends Model {
  @Column
  category: Category;

  @Column
  message: string;
}
