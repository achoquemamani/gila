import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Log extends Model {
  @ApiProperty()
  @Column
  message: string;
}
