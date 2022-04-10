import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelperService } from '../helpers/helper.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
    private helperService: HelperService,
  ) {}

  public async sendUserEmailVerificationToken(
    email: string,
    code: string,
  ): Promise<boolean> {
    const encryptedCode = await this.helperService.encryptString(code);
    const encryptedEmail = await this.helperService.encryptString(email);

    const url = `https://stackpal.io/verify-email?el=${encryptedEmail}&ce=${encryptedCode}`;
    const sendEmailVerificationCode = this.mailerService.sendMail({
      to: email.toLowerCase(),
      from: `Stackpal <${this.configService.get('mail.defaultMailFrom')}>`,
      subject: 'Stackpal - Please verify your email',
      template: '/confirmation',
      replyTo: `Stackpal No-Reply <${this.configService.get(
        'mail.defaultReplyTo',
      )}>`,
      context: {
        url,
      },
    });

    return !!sendEmailVerificationCode;
  }
}
