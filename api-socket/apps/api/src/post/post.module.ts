import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../../../libs/common/src/prisma/prisma.module';
import { FileModule } from '../../../../libs/common/src/file/file.module';
import { UserGuard } from '../../../../libs/common/guards/user.guard';
import { MessageModule } from '../../../message/src/message.module';
import { MessageService } from '../../../message/src/message.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    FileModule,
    MessageModule,
  ],
  controllers: [PostController],
  providers: [PostService, UserGuard, MessageService],
})
export class PostModule {}
