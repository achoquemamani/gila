import { ApiProperty } from '@nestjs/swagger';
import { Table, Model, Column } from 'sequelize-typescript';
import { NotificationDTO } from '../notifications/notification.model';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { User, UserDTO } from './user.model';
import { LogsService } from '../_logs/logs.service';
import { Log } from '../_logs/log.model';
import { InjectModel } from '@nestjs/sequelize';
import { ModuleRef } from '@nestjs/core';

@Table
export class Channel extends Model {
  @ApiProperty()
  @Column
  description: string;
}

export abstract class ChannelDTO {
  private readonly LOGGER = new Logger(ChannelDTO.name);
  constructor(private logsService: LogsService) {}

  abstract sendMessageForChannel(
    user: UserDTO,
    notification: NotificationDTO,
  ): void;

  sendMessage(user: UserDTO, notification: NotificationDTO): void {
    const message = `Notification: ${notification.message} - ${user.name}.`;
    this.LOGGER.log(message);
    const log = new Log();
    log.message = message;
    this.logsService.create(log);
    this.sendMessageForChannel(user, notification);
  }
}

export class SMS extends ChannelDTO {
  sendMessageForChannel(user: UserDTO, notification: NotificationDTO): void {
    /*
    SMS has its own functionality
    */
  }
}

export class Email extends ChannelDTO {
  sendMessageForChannel(user: UserDTO, notification: NotificationDTO): void {
    /*
    Email has its own functionality
    */
  }
}

export class PushNotification extends ChannelDTO {
  sendMessageForChannel(user: UserDTO, notification: NotificationDTO): void {
    /*
    PushNotification has its own functionality
    */
  }
}
