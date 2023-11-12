import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { Post } from './entities/post.entity';
import { PrismaService } from '../../../../libs/common/prisma/prisma.service';
import { FileService } from '../../../../libs/common/file/file.service';
import { MessageService } from '../../../chat/src/message/message.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly messageService: MessageService,
    @Inject('CHAT_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createPostDto: CreatePostDto, req: Request, file: any) {
    const userId = req['user'].id;
    const { title, description } = createPostDto;
    let post: Post;
    if (file != undefined) {
      const fileName = await this.fileService.createFile(file);
      post = await this.prismaService.post.create({
        data: { title, description, userId, photo: fileName },
      });
    }
    post = await this.prismaService.post.create({
      data: { title, description, userId },
    });

    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    const userfriends = await this.prismaService.userFriend.findMany({
      where: { userId },
    });

    const content = `${user.username} has just posted a new post`;
    userfriends.forEach(async (friend) => {
      const message = {
        userId,
        content,
        receiverId: friend.friendId,
      };
      await this.client.emit('friend-post', message);
      // await this.messageService.createMessage(content, userId, friend.friendId);
    });

    return post;
  }

  findAll() {
    return this.prismaService.post.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    const post = await this.prismaService.post.findFirst({ where: { id } });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const updatedpost = await this.prismaService.post.update({
      data: { views: post.views + 1 },
      where: { id },
    });
    return updatedpost;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    req: Request,
    file: any,
  ) {
    const post = await this.prismaService.post.findFirst({ where: { id } });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    const userId = req['user'].id;
    if (post.userId !== userId) {
      throw new BadRequestException(
        "You do not have permission to update other's Posts",
      );
    }
    if (file != undefined)
      updatePostDto.photo = await this.fileService.createFile(file);
    return this.prismaService.post.update({
      data: updatePostDto,
      where: { id },
    });
  }

  async remove(id: string) {
    const post = await this.prismaService.post.findFirst({ where: { id } });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return this.prismaService.post.delete({ where: { id } });
  }
}
