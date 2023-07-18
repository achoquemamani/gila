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

@Module({
  imports: [
    //TODO: replace data to .env
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: 'projects.mssql.somee.com',
      port: 1433,
      username: 'achoque_SQLLogin_1',
      password: 'inpfaqrgsf',
      database: 'projects',
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
