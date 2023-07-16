import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

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
      models: [],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
