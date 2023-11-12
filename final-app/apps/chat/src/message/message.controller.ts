import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Request } from 'express';
import { UserGuard } from '../../../../libs/common/guards/user.guard';
import { MessagePattern } from '@nestjs/microservices';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createMessageDto: CreateMessageDto, @Req() req: Request) {
    return this.messageService.create(createMessageDto, req);
  }

  @UseGuards(UserGuard)
  @Get()
  findAll(@Req() req: Request) {
    return this.messageService.findAll(req);
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.messageService.findOne(id, req);
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @Req() req: Request,
  ) {
    return this.messageService.update(id, updateMessageDto, req);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.messageService.remove(id, req);
  }

  @MessagePattern('friend-post')
  async handlePostNotification(@Body() message: any) {
    await this.messageService.createMessage(
      message['content'],
      message['userId'],
      message['receiverId'],
    );
  }
  @MessagePattern('friend-added')
  async handleFriendNotification(@Body() message: any) {
    await this.messageService.createMessage(
      message['content'],
      message['senderId'],
      message['receiverId'],
    );
  }
}
