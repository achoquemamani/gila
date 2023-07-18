import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.model';
import { LogsModule } from './_logs/logs.module';
import { Channel } from './users/channel.model';
import { Category } from './category/category.model';
import { Log } from './_logs/log.model';
import { Notification } from './notifications/notification.model';
import { NotificationModule } from './notifications/notification.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [User, Channel, Category, Log, Notification],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    LogsModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
