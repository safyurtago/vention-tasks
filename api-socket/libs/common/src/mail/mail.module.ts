import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'


@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('smtp.gmail.com'),
          secure: false,
          auth: {
            user: config.get<string>('safyur0621@gmail.com'),
            pass: config.get<string>('ntxzeqyanutredoc'),
          },
        },
        defaults: {
          from: `"Socieal Network Website " <${config.get('smtp.gmail.com')}>`
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          template: 'confirmation',
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
    }),
    
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
