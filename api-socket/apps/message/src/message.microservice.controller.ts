import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { Request } from 'express';
import { UserGuard } from '../../../libs/common/guards/user.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@UseGuards(UserGuard)
@Controller('message')
export class MessageMicroserviceController {
  constructor(private readonly messageService: MessageService) {}

  @EventPattern('post_created')
  createdPost(@Body() createMessageDto: CreateMessageDto, @Req() req: Request) {
    return this.messageService.create(createMessageDto, req);
  }

  @EventPattern('friend_added')
  addedFriend(@Body() createMessageDto: CreateMessageDto, @Req() req: Request) {
    return this.messageService.create(createMessageDto, req);
  }
}
