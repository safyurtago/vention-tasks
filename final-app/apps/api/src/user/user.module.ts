import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../../../../libs/common/prisma/prisma.module';
import { MailModule } from '../../../../libs/common/mail/mail.module';
import { FileModule } from '../../../../libs/common/file/file.module';

@Module({
  imports: [PrismaModule, JwtModule.register({}), FileModule, MailModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
