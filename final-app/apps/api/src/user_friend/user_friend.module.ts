import { Module } from '@nestjs/common';
import { UserFriendService } from './user_friend.service';
import { UserFriendController } from './user_friend.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../../../libs/common/prisma/prisma.module';
import { MessageModule } from '../../../chat/src/message/message.module';
import { UserGuard } from '../../../../libs/common/guards/user.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    MessageModule,
    ClientsModule.register([
      {
        name: 'CHAT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'chat_queue', // Use the same queue name
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserFriendController],
  providers: [UserFriendService, UserGuard],
})
export class UserFriendModule {}
