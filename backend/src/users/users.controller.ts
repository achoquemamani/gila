import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  createUser(@Body() user: User): void {
    this.userService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.userService.remove(id);
  }
}