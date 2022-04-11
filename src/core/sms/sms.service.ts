import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  constructor(public readonly configService: ConfigService) {}

  public async sendUserPhoneVerificationToken(
    phone: string,
    code: string,
  ): Promise<boolean> {
    const client = new Twilio(
      this.configService.get('twilio.accountSid'),
      this.configService.get('twilio.authToken'),
    );

    client.messages
      .create({
        from: this.configService.get('twilio.twilioNumber'),
        to: phone,
        body: `Your Stackpal verification code is ${code}`,
      })
      .then((message) =>
        Logger.log(`SMS Message Sent Successfully to ${message.sid}`),
      );

    return true;
  }
}
