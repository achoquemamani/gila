import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Channel } from '../channel/channel.model';
import { Category } from 'src/category/category.model';

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

  //TODO: delete endpoint
  printLog(user: any) {
    console.log(`Show info: ${JSON.stringify(user)}`);
  }
}
