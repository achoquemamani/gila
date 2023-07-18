import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserDTO } from './user.model';
import { Channel } from './channel.model';
import { Category } from '../category/category.model';
import { NotificationDTO } from '../notifications/notification.model';
import { LogsService } from '../_logs/logs.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private logsService: LogsService,
  ) {}

  async create(user: User): Promise<void> {
    await this.userModel.create(
      {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        channels: user.channels,
        subscribed: user.subscribed,
      },
      {
        include: [Channel, Category],
      },
    );
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      include: [
        {
          model: Channel,
        },
        {
          model: Category,
        },
      ],
    });
  }

  async findAllDTOs(): Promise<UserDTO[]> {
    const userDTOs = (await this.findAll()).map((user) => {
      return user.mapToUserDto(this.logsService);
    });
    return userDTOs;
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async sendMessage(notification: NotificationDTO): Promise<void> {
    const users: UserDTO[] = await this.findAllDTOs();

    //TODO: improve using observer (design pattern)
    const filteredUsers = users.filter((user) => {
      return user.subscribed.some((categorySubscribed) => {
        return categorySubscribed === notification.category;
      });
    });
    filteredUsers.forEach((user) => {
      user.sendMessage(notification);
    });
  }
}
