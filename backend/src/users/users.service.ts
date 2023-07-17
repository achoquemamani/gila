import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Channel } from '../channel/channel.model';
import { Category } from '../category/category.model';
import { Notification } from '../notifications/notification.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
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

  async sendMessage(notification: Notification): Promise<void> {
    const users: User[] = await this.findAll();

    //TODO: improve using observer (design pattern)
    const filteredUsers = users.filter((user) => {
      return user.subscribed.some((categorySubscribed) => {
        return (
          categorySubscribed.description === notification.category.description
        );
      });
    });
    filteredUsers.forEach((user) => {
      user.sendMessage(notification);
    });
  }
}
