import { Module } from '@nestjs/common';
import { UserFriendService } from './user_friend.service';
import { UserFriendController } from './user_friend.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserGuard } from '../common/guards/user.guard';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    MessageModule,
  ],
  controllers: [UserFriendController],
  providers: [UserFriendService, UserGuard],
})
export class UserFriendModule {}
