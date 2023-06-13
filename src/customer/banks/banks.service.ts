import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BankRepositoryService } from 'src/repositories/banks/bank-repository.service';
import { BanksResponse, GetAllBanksResponse, VerifyNubanResponse } from './dto/response/banks.response';
import { plainToInstance } from 'class-transformer';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { VerifyBankAccountDto } from './dto/request/verify-bank-account.dto';
import { SaveBankAccountDto } from './dto/request/save-bank-account.dto';

@Injectable()
export class BankService {
  constructor(
    private readonly bankRepositoryService: BankRepositoryService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  private baseURL = this.configService.get('okra.okraBaseUrl');
  private secretKey = this.configService.get('okra.okraSecretKey');

  public async getAllBanks(): Promise<GetAllBanksResponse> {
    try {
      const url = `${this.baseURL}/banks/list`;
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          headers: { accept: 'application/json; charset=utf-8', Authorization: `Bearer ${this.secretKey}` },
        }),
      );
      data.data.banks.sort((a, b) => a.name.localeCompare(b.name));
      const response = { banks: data.data.banks, status: true };

      response.banks = plainToInstance(BanksResponse, response.banks);

      return plainToInstance(GetAllBanksResponse, response);
    } catch (e) {
      throw new HttpException(e.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async verifyAccount(body: VerifyBankAccountDto): Promise<VerifyNubanResponse> {
    try {
      const url = `${this.baseURL}/products/kyc/nuban-name-verify`;
      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          { nuban: body.accountNumber, bank: body.bankId },
          { headers: { accept: 'application/json; charset=utf-8', Authorization: `Bearer ${this.secretKey}` } },
        ),
      );

      const response = plainToInstance(VerifyNubanResponse, data);

      return response;
    } catch (e) {
      return e.response.data;
      //throw new HttpException(e.response.data, HttpStatus.BAD_REQUEST);
    }
  }

  public async getUserBankAccounts(userId: number): Promise<any> {
    const userBankAccounts = await this.bankRepositoryService.getUserBankAccounts(userId);
    const response = { status: true, data: userBankAccounts };

    return response;
  }

  public async addBankAccount(data: SaveBankAccountDto, userId: number): Promise<any> {
    return this.bankRepositoryService.addNewBankAccount(data, userId);
  }

  public async deleteBankAccount(bankAccountId: number, userId: number): Promise<any> {
    await this.bankRepositoryService.deleteBankAccountByUserIdAndId(bankAccountId, userId);

    return { status: true, message: 'Deleted Successfully' };
  }

  public async verifyBvn(bvnNo: string): Promise<any> {
    try {
      const url = `${this.baseURL}/products/kyc/bvn-verify`;
      const { data } = await firstValueFrom(
        this.httpService.post(
          url,
          { bvn: bvnNo },
          { headers: { accept: 'application/json; charset=utf-8', Authorization: `Bearer ${this.secretKey}` } },
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
