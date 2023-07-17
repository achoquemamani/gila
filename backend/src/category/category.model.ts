import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column } from 'sequelize-typescript';

export enum EnumCategory {
  SPORTS = 'SPORTS',
  FINANCE = 'FINANCE',
  MOVIES = 'MOVIES',
  OTHERS = 'OTHERS',
}

@Table
export class Category extends Model {
  @ApiProperty()
  @Column
  description: string;

  mapToEnumCategory(): EnumCategory {
    switch (this.description) {
      case 'Finance':
        return EnumCategory.FINANCE;
      case 'Sports':
        return EnumCategory.SPORTS;
      case 'Movie':
        return EnumCategory.MOVIES;
      default:
        return EnumCategory.OTHERS;
    }
  }
}
