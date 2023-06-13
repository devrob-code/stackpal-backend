import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  constructor(public readonly configService: ConfigService, private httpService: HttpService) {}

  private baseURL = this.configService.get('termii.termiiBaseUrl');
  private secretKey = this.configService.get('termii.termiiApiKey');

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

      if (response) return true;
    } catch (e) {
      Logger.error(e);
      return true;
      // TODO: Change to false as soon as Twilio is active
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

  public async termiiSendUserVerificationCode(phone: string, code: string): Promise<boolean> {
    try {
      const url = `${this.baseURL}api/sms/send`;
      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          {
            to: phone.toString(),
            from: 'Stackpal',
            sms: `Your Stackpal verification code is ${code}`,
            type: 'plain',
            api_key: this.secretKey,
            channel: 'generic',
          },
          {
            headers: {
              'Content-Type': ['application/json', 'application/json'],
            },
          },
        ),
      );

      return data;
    } catch (e) {
      e.response.data.data = null;
      return e.response.data;
      //throw new HttpException(e.response.data, HttpStatus.BAD_REQUEST);
    }
  }
}
