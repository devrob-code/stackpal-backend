import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_SOURCE, MailRequestSource, WEB_SOURCE } from 'src/auth/auth.constants';
import { HelperService } from '../helpers/helper.service';
import { FiatTransactionsType } from 'src/customer/transactions/transactions.constants';

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
    requestSource: MailRequestSource,
  ): Promise<boolean> {
    const encryptedCode = await this.helperService.encryptString(code);
    const encryptedEmail = await this.helperService.encryptString(email);
    let sendEmailVerification;

    const url = `https://stackpal.io/verify-email?el=${encryptedEmail}&ce=${encryptedCode}`;

    if (requestSource === WEB_SOURCE) {
      sendEmailVerification = this.mailerService.sendMail({
        to: email.toLowerCase(),
        from: `Stackpal <${this.configService.get('mail.defaultMailFrom')}>`,
        subject: 'Stackpal - Please verify your email',
        template: './confirmation-link',
        replyTo: `Stackpal No-Reply <${this.configService.get('mail.defaultReplyTo')}>`,
        context: {
          url,
        },
      });
    }

    if (requestSource === APP_SOURCE) {
      sendEmailVerification = this.mailerService.sendMail({
        to: email.toLowerCase(),
        from: `Stackpal <${this.configService.get('mail.defaultMailFrom')}>`,
        subject: 'Stackpal - Please verify your email',
        template: './confirmation-code',
        replyTo: `Stackpal No-Reply <${this.configService.get('mail.defaultReplyTo')}>`,
        context: {
          code,
        },
      });
    }

    return !!sendEmailVerification;
  }

  public async forgotPassword(email: string, code: string, requestSource: MailRequestSource): Promise<boolean> {
    let sendForgotPasswordMail;
    const encryptedEmail = await this.helperService.encryptString(email);
    const url = `https://stackpal.io/forgot-password?token=${encryptedEmail}`;

    if (requestSource === WEB_SOURCE) {
      sendForgotPasswordMail = this.mailerService.sendMail({
        to: email.toLowerCase(),
        from: `Stackpal <${this.configService.get('mail.accountEmail')}>`,
        subject: 'Stackpal - Recover Password',
        template: './forgot-password',
        replyTo: `Stackpal No-Reply <${this.configService.get('mail.defaultReplyTo')}>`,
        context: {
          url,
        },
      });
    }

    if (requestSource === APP_SOURCE) {
      sendForgotPasswordMail = this.mailerService.sendMail({
        to: email.toLowerCase(),
        from: `Stackpal <${this.configService.get('mail.accountEmail')}>`,
        subject: 'Stackpal - Recover Password',
        template: './forgot-password-code',
        replyTo: `Stackpal No-Reply <${this.configService.get('mail.defaultReplyTo')}>`,
        context: {
          code,
        },
      });
    }

    return !!sendForgotPasswordMail;
  }

  public async buyCoin(
    email: string,
    coin: string,
    naira: string,
    coinValue: string,
    username: String,
  ): Promise<boolean> {
    let sendBuyCoinEmail = this.mailerService.sendMail({
      to: email.toLowerCase(),
      from: `Stackpal <${this.configService.get('mail.accountEmail')}>`,
      subject: 'Stackpal - New Transaction',
      template: './buy-coin',
      replyTo: `Stackpal No-Reply <${this.configService.get('mail.defaultReplyTo')}>`,
      context: {
        coin,
        naira,
        coinValue,
        username,
      },
    });

    return !!sendBuyCoinEmail;
  }

  public async sellCoin(
    email: string,
    coin: string,
    amount: string,

    username: String,
  ): Promise<boolean> {
    let sendBuyCoinEmail = this.mailerService.sendMail({
      to: email.toLowerCase(),
      from: `Stackpal <${this.configService.get('mail.accountEmail')}>`,
      subject: 'Stackpal - New Transaction',
      template: './sell-coin',
      replyTo: `Stackpal No-Reply <${this.configService.get('mail.defaultReplyTo')}>`,
      context: {
        coin,
        amount,
        username,
      },
    });

    return !!sendBuyCoinEmail;
  }

  public async billTransaction(
    email: string,
    variationCode: string,
    billersCode: string,
    amount: number,
    username: string,
    network: string,
    txId: string,
    electricityCode: string = null,
  ): Promise<boolean> {
    let sendTransactionEmail = this.mailerService.sendMail({
      to: email.toLowerCase(),
      from: `Stackpal <${this.configService.get('mail.accountEmail')}>`,
      subject: `Stackpal - New ${network.charAt(0).toUpperCase() + network.slice(1).toLowerCase()} Bill Transaction`,
      template: './bill-transaction',
      replyTo: `Stackpal No-Reply <${this.configService.get('mail.defaultReplyTo')}>`,
      context: {
        txId,
        network,
        plan: variationCode,
        billersCode,
        amount: amount.toLocaleString(),
        username,
        electricityCode,
      },
    });

    return !!sendTransactionEmail;
  }

  public async fiatTransaction(
    email: string,
    amount: number,
    username: string,
    type: FiatTransactionsType,
    txId: string,
  ): Promise<boolean> {
    let sendTransactionEmail = this.mailerService.sendMail({
      to: email.toLowerCase(),
      from: `Stackpal <${this.configService.get('mail.accountEmail')}>`,
      subject: `Stackpal - New Fiat ${type} Transaction`,
      template: './fiat-transaction',
      replyTo: `Stackpal No-Reply <${this.configService.get('mail.defaultReplyTo')}>`,
      context: {
        txId,
        amount: (amount / 100).toLocaleString(),
        type,
        username,
      },
    });

    return !!sendTransactionEmail;
  }
}
