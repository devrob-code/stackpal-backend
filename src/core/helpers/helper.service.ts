import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { promisify } from 'util';

@Injectable()
export class HelperService {
  constructor(private readonly configService: ConfigService) {}

  public async encryptString(string: string): Promise<any> {
    const algorithm = 'aes-256-cbc';
    const initVector = crypto.randomBytes(16);
    const password = this.configService.get('encrypt.encryptPassword');
    const securityKey = crypto.randomBytes(32);

    const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);

    let encryptedData = cipher.update(string, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');

    return encryptedData;
  }
}
