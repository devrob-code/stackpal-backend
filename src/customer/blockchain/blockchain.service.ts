import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockchainService {
  constructor(private httpService: HttpService) {}
  public async getCoinPrices(): Promise<any> {}
}
