import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

let ncrypt = require('ncrypt-js');
@Injectable()
export class HelperService {
  constructor(private readonly configService: ConfigService) {}
  private securityKey = this.configService.get('encrypt.encryptPassword');
  private ncryptObject = new ncrypt(this.securityKey);

  public async encryptString(string: string): Promise<string> {
    return await this.ncryptObject.encrypt(string);
  }

  public async decryptString(encryptedString: string): Promise<string> {
    try {
      return await this.ncryptObject.decrypt(encryptedString);
    } catch (e) {
      throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);
    }
  }

  public generateCode(length): string {
    let add = 1;
    let max = 12 - add;

    if (length > max) {
      return this.generateCode(max) + this.generateCode(length - max);
    }

    max = Math.pow(10, length + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ('' + number).substring(add);
  }
}
