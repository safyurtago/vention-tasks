import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { Request } from 'express';
import { UserGuard } from '../../../libs/common/guards/user.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@UseGuards(UserGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @Post()
  // create(@Body() createMessageDto: CreateMessageDto, @Req() req: Request) {
  //   return this.messageService.create(createMessageDto, req);
  // }

  // @Get()
  // findAll(@Req() req: Request) {
  //   return this.messageService.findAll(req);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string, @Req() req: Request) {
  //   return this.messageService.findOne(id, req);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto, @Req() req: Request) {
  //   return this.messageService.update(id, updateMessageDto, req);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string, @Req() req: Request) {
  //   return this.messageService.remove(id, req);
  // }
}
