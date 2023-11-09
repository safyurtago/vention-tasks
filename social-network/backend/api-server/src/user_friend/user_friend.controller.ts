import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserFriendService } from './user_friend.service';
import { CreateUserFriendDto } from './dto/create-user_friend.dto';
import { UserGuard } from '../common/guards/user.guard';
import { Request } from 'express';

@UseGuards(UserGuard)
@Controller('user-friend')
export class UserFriendController {
  constructor(private readonly userFriendService: UserFriendService) {}

  @Post()
  create(@Body() createUserFriendDto: CreateUserFriendDto, @Req() req: Request) {
    return this.userFriendService.create(createUserFriendDto, req);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.userFriendService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.userFriendService.findOne(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.userFriendService.remove(id, req);
  }
}
