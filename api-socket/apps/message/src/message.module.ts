import { Module, forwardRef } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../../libs/common/src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { MessageMicroserviceController } from './message.microservice.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    JwtModule.register({}),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageMicroserviceController],
})
export class MessageModule {}
