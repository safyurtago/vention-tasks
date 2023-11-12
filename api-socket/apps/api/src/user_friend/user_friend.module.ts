import { Module } from '@nestjs/common';
import { UserFriendService } from './user_friend.service';
import { UserFriendController } from './user_friend.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../../../libs/common/src/prisma/prisma.module';
import { UserGuard } from '../../../../libs/common/guards/user.guard';
import { MessageModule } from '../../../message/src/message.module';

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
