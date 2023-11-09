import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../libs/common/src/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { UserFriendModule } from './user_friend/user_friend.module';
import { RmqModule } from '../../../libs/common/src';
import { MESSAGE_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api/.env',
    }),
    PrismaModule,
    UserModule,
    PostModule,
    UserFriendModule,
    RmqModule.register({
      name: MESSAGE_SERVICE,
    })
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
