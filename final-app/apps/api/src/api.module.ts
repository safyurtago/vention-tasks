import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../libs/common/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { UserFriendModule } from './user_friend/user_friend.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../../../libs/common/mail/mail.module';
import { FileModule } from '../../../libs/common/file/file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../.env',
    }),
    PrismaModule,
    UserModule,
    PostModule,
    UserFriendModule,
    JwtModule.register({}),
    MailModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
