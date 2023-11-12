import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../libs/common/prisma/prisma.module';
import { MessageModule } from './message/message.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    MessageModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../../.env' }),
  ],
  controllers: [],
  providers: [],
})
export class ChatModule {}
