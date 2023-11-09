import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { FileModule } from './file/file.module';
import { PostModule } from './post/post.module';
import { UserFriendModule } from './user_friend/user_friend.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    UserModule, 
    PrismaModule,
    MailModule,
    FileModule,
    PostModule,
    UserFriendModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
