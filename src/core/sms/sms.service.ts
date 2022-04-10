import { Injectable } from '@nestjs/common';
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
        to: '+2348083026554',
        body: 'You just sent an SMS from TypeScript using Twilio!',
      })
      .then((message) => console.log(message.sid));

    return true;
  }
}
