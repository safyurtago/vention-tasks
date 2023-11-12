import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserFriendDto } from './dto/create-user_friend.dto';
import { Request } from 'express';
import { PrismaService } from '../../../../libs/common/prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserFriendService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('CHAT_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createUserFriendDto: CreateUserFriendDto, req: Request) {
    const { friendId } = createUserFriendDto;
    const userId = req['user'].id;
    const checkFriend = await this.prismaService.userFriend.findFirst({
      where: { friendId, userId },
    });
    if (checkFriend) {
      throw new BadRequestException(
        'You have already added this user to the friend list',
      );
    }
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    const friend = await this.prismaService.user.findFirst({
      where: { id: friendId },
    });
    if (!friend) {
      throw new BadRequestException('Friend not found');
    }
    const content = `${user.username} has just added you to his/her friend list`;
    const data = { senderId: userId, receiverId: friendId, content };
    // await this.prismaService.message.create({
    // });
    await this.client.emit('friend-added', data);
    return this.prismaService.userFriend.create({ data: { friendId, userId } });
  }

  findAll(req: Request) {
    const userId = req['user'].id;
    return this.prismaService.userFriend.findMany({ where: { userId } });
  }

  async findOne(id: string, req: Request) {
    const userId = req['user'].id;
    const friend = await this.prismaService.userFriend.findFirst({
      where: { id },
    });
    if (!friend) {
      throw new BadRequestException('Friend not found');
    }
    if (friend.userId !== userId) {
      throw new BadRequestException('You do not have permission');
    }
    return friend;
  }

  async remove(id: string, req: Request) {
    const userId = req['user'].id;
    const friend = await this.prismaService.userFriend.findFirst({
      where: { id },
    });
    if (!friend) {
      throw new BadRequestException('Friend not found');
    }
    if (friend.userId !== userId) {
      throw new BadRequestException('You do not have permission');
    }
    return this.prismaService.userFriend.delete({ where: { id } });
  }
}
