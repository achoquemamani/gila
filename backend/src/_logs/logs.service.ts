import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from './log.model';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log)
    private logModel: typeof Log,
  ) {}

  async findAll(): Promise<Log[]> {
    return this.logModel.findAll();
  }

  findOne(id: string): Promise<Log> {
    return this.logModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const log = await this.findOne(id);
    await log.destroy();
  }

  async create(log: Log): Promise<void> {
    await this.logModel.create({
      message: log.message,
    });
  }
}
