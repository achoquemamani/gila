import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('user')
export class UsersController {
  private readonly LOGGER = new Logger(UsersController.name);
  constructor(private userService: UsersService) {}

  private manageException(error: any) {
    const message = error.message;
    this.LOGGER.error(message);
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: message,
      },
      HttpStatus.BAD_REQUEST,
      {
        cause: error,
      },
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUsers(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      this.manageException(error);
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() user: User): Promise<void> {
    try {
      await this.userService.create(user);
    } catch (error) {
      this.manageException(error);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.remove(id);
    } catch (error) {
      this.manageException(error);
    }
  }
}
