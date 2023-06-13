import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class BanksResponse {
  @Expose()
  id: number;

  @Expose()
  bankName: string;

  @Expose()
  name?: string;

  @Expose()
  icon?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

@Exclude()
export class GetAllBanksResponse {
  @Expose()
  status: boolean;

  @Expose()
  banks: BanksResponse[];
}

export class BankAccountsResponse {
  @Expose()
  id: number;

  @Expose()
  bankName: string;

  @Expose()
  accountName: string;

  @Expose()
  accountNumber: string;

  @Expose()
  type?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class NubanData {
  @Expose()
  identity: any;

  @Expose()
  bank: any;
}

@Exclude()
export class VerifyNubanResponse {
  @Expose()
  status: string;

  @Expose()
  message: string;

  @Expose()
  data: NubanData;
}
