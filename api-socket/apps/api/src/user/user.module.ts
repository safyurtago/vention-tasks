import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../../../libs/common/src/prisma/prisma.module';
import { FileModule } from '../../../../libs/common/src/file/file.module';
import { MailModule } from '../../../../libs/common/src/mail/mail.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    FileModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
