import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {
    const url = 'stackpal.io';

    await this.mailerService.sendMail({
      to: 'robertebafua@gmail.com',
      from: 'Stackpal <hello@stackpal.io>',
      subject: 'Stackpal - Please verify Email',
      template: '/confirmation',
      replyTo: 'Stackpal <no-reply@stackpal.io>',
      context: {
        name: 'Robert',
        url,
      },
    });
  }
}
