import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../libs/common/src/prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { UserFriendModule } from './user_friend/user_friend.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ixcybbsv:aTKDIxRxcMXuNP3ZbPVRaJYwFbOkWqEz@crow.rmq.cloudamqp.com/ixcybbsv',
          ],
          queue: 'message_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
