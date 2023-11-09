import { Module, forwardRef } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../libs/common/src/prisma/prisma.module';
import { RmqModule } from '../../../libs/common/src';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from '../../api/src/post/post.module';
import { MessageMicroserviceController } from './message.microservice.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RmqModule,
    JwtModule.register({}),
  ],
  controllers: [MessageController, MessageMicroserviceController],
  providers: [MessageService],
})
export class MessageModule {}
