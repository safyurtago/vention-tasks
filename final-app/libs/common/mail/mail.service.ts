import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../../../apps/api/src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User): Promise<void> {
    const url = `${process.env.MAIL_API_HOST}/api/user/activate/${user.activation_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to SOCIAL MEDIA WEBSITE, Please Confirm!',
      template: './confirmation',
      context: {
        name: user.username,
        url,
      },
    });
  }
}
