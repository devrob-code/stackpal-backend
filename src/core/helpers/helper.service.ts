import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

let ncrypt = require('ncrypt-js');
@Injectable()
export class HelperService {
  constructor(private readonly configService: ConfigService) {}
  private securityKey = this.configService.get('encrypt.encryptPassword');
  private ncryptObject = new ncrypt(this.securityKey);

  public async encryptString(string: string): Promise<any> {
    return await this.ncryptObject.encrypt(string);
  }

  public async decryptString(encryptedString: string): Promise<any> {
    try {
      return await this.ncryptObject.decrypt(encryptedString);
    } catch (e) {
      throw new HttpException('Invalid Request', 400);
    }
  }
}
