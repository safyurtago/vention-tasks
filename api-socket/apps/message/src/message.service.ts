import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../../libs/common/src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor (
    private readonly prismaService: PrismaService,
  ) {}

  async create(createMessageDto: CreateMessageDto, req: Request) {
    const senderId = req['user'].id;
    const receiver = await this.prismaService.user.findFirst({where: {id: createMessageDto.receiverId}})
    if (!receiver) { throw new BadRequestException('Receiver not found') };
    return this.prismaService.message.create({data: {...createMessageDto, senderId}});
  }

  async findAll(req: Request) {
    const senderId = req['user'].id;
    const sendedMessages = await this.prismaService.message.findMany({where: {senderId}})
    const receivedMessages = await this.prismaService.message.findMany({where: {receiverId: senderId}})
    return {
      sendedMessages,
      receivedMessages
    };
  }

  async findOne(id: string, req: Request) {
    let message = await this.prismaService.message.findFirst({where: {id}})
    if (!message) throw new BadRequestException('Message not found')
    const senderId = req['user'].id;
    if ((message.senderId || message.receiverId) !== senderId) throw new BadRequestException('You do not have any message with this id')
    if (senderId === message.receiverId) message = await this.prismaService.message.update({data: {is_seen: true}, where: {id}})
    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto, req: Request) {
    const message = await this.prismaService.message.findFirst({where: {id}})
    if (!message) throw new BadRequestException('Message not found')
    const senderId = req['user'].id;
    if (message.senderId !== senderId) throw new BadRequestException('You do not have permission to update others Messages')
    return this.prismaService.message.update({data: updateMessageDto, where: {id}});
  }

  async remove(id: string, req: Request) {
    const message = await this.prismaService.message.findFirst({where: {id}})
    if (!message) throw new BadRequestException('Message not found')
    const senderId = req['user'].id;
    if (message.senderId !== senderId) throw new BadRequestException('You do not have permission to update others Messages')
    return this.prismaService.message.delete({where: {id}});
  }

  async createMessage (content: string, senderId: string, receiverId: string) {
    await this.prismaService.message.create({data: {content, senderId, receiverId}})
  }
}
