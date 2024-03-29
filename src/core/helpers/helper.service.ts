import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

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

  public generateTransactionId(prefix: string, length: number) {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return prefix + code;
  }

  public async uploadFile(dataBuffer: Buffer, fileName: string): Promise<string> {
    const s3 = new S3();
    const cloudfrontUrl = this.configService.get('aws.cloudfrontUrl');
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('aws.awsBucketName'),
        Body: dataBuffer,
        Key: `gift-card/user-uploads/${uuid()}-${fileName}`,
      })
      .promise();
    return cloudfrontUrl + uploadResult.Key;
  }
}
