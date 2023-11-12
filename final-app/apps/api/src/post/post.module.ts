import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../../../libs/common/prisma/prisma.module';
import { MessageModule } from '../../../chat/src/message/message.module';
import { FileModule } from '../../../../libs/common/file/file.module';
import { UserGuard } from '../../../../libs/common/guards/user.guard';
import { MessageService } from '../../../chat/src/message/message.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    FileModule,
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
  controllers: [PostController],
  providers: [PostService, UserGuard, MessageService],
})
export class PostModule {}
