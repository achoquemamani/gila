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

  async create(log: Log): Promise<void> {
    await this.logModel.create({
      message: log.message,
    });
  }
}
