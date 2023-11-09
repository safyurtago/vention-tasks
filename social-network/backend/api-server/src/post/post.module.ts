import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserGuard } from '../common/guards/user.guard';
import { FileModule } from '../file/file.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    FileModule,
    MessageModule
  ],
  controllers: [PostController],
  providers: [PostService, UserGuard],
})
export class PostModule {}
