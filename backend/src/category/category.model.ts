import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column } from 'sequelize-typescript';

export enum EnumCategory {
  SPORTS = 'SPORTS',
  FINANCE = 'FINANCE',
  MOVIES = 'MOVIES',
}

@Table
export class Category extends Model {
  @ApiProperty()
  @Column
  description: string;
}
