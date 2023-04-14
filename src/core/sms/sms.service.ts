import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  constructor(public readonly configService: ConfigService) {}

  public async sendUserPhoneVerificationToken(phone: string, code: string): Promise<boolean> {
    try {
      let response;
      const client = new Twilio(
        this.configService.get('twilio.accountSid'),
        this.configService.get('twilio.authToken'),
      );

      response = await client.messages.create({
        from: this.configService.get('twilio.twilioNumber'),
        to: phone,
        body: `Your Stackpal verification code is ${code}`,
      });

      //TODO: Turn back this condition once twilio is active  if (response) return true;
      return true;
    } catch (e) {
      Logger.error(e);
      return false;
    }

    // .then((message) => {
    //   Logger.log(`SMS Message Sent Successfully to ${message.sid}`);
    //   response = true;
    // })
    // .catch((e) => {
    //   Logger.error(e);
    //   response = false;
    // });
  }
}
