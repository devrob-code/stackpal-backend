import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  public async sendUserEmailVerificationToken(
    email: string,
    code: string,
  ): Promise<boolean> {
    const sendEmailVerificationCode = this.mailerService.sendMail({
      to: email.toLowerCase(),
      from: `Stackpal <${this.configService.get('mail.defaultMailFrom')}>`,
      subject: 'Stackpal - Please verify your email',
      template: '/confirmation',
      replyTo: `Stackpal No-Reply <${this.configService.get(
        'mail.defaultReplyTo',
      )}>`,
      context: {
        name: 'Robert',
        code,
      },
    });

    return !!sendEmailVerificationCode;
  }
}
